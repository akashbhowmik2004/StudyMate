import Schedule from "../models/schedule.js";
import Note from "../models/notes.js";
import Subject from "../models/subject.js";
import Community from "../models/community.js";

export const getDashboardData = async (req, res) => {
  const userId = req.user.id;
  try {
    const today = new Date().toISOString().split("T")[0];

    // 1. Today's Schedule
    const todaySchedule = await Schedule.find({ userId, date: today }).sort({ startTime: 1 });

    // 2. Recent Notes
    const recentNotesData = await Note.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(3)
      .populate("subjectId", "name");
      
    const tints = ["coral", "mint", "lav", "amber"];
    const recentNotes = recentNotesData.map((note, index) => {
        // Calculate updated ago
        const diffInMs = new Date() - new Date(note.updatedAt);
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);
        let updatedStr = "Just now";
        if (diffInDays > 1) updatedStr = `${diffInDays} days ago`;
        else if (diffInDays === 1) updatedStr = "Yesterday";
        else if (diffInHours > 0) updatedStr = `${diffInHours}h ago`;

        return {
            title: note.title,
            subject: note.subjectId ? note.subjectId.name : "Uncategorized",
            updated: updatedStr,
            tint: tints[index % tints.length]
        };
    });

    // 3. Subjects
    const subjectsData = await Subject.find({ userId });
    const subjects = subjectsData.map((sub, index) => ({
      subject: sub.name,
      progress: Math.floor(Math.random() * 40) + 40, // Mock progress between 40-80
      tint: tints[index % tints.length]
    }));

    // 4. Joined Communities
    const joinedCommunitiesData = await Community.find({ members: userId });
    const joinedCommunities = joinedCommunitiesData.map((comm, index) => ({
      name: comm.name,
      members: comm.members.length,
      activity: "Active",
      initials: comm.name.substring(0, 2).toUpperCase(),
      tint: tints[index % tints.length]
    }));

    // 5. Focus Stats & Tasks Done
    const allSchedules = await Schedule.find({ userId });
    const tasksDone = allSchedules.filter(s => s.completed).length;
    const totalTasks = allSchedules.length;

    let todayMins = 0;
    let weekMins = 0;

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const dayOfWeek = now.getDay();
    const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + difference);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const completedDates = new Set();

    allSchedules.forEach(s => {
        if(s.startTime && s.endTime && s.date) {
            if (s.completed) {
                completedDates.add(s.date);
            }
            const startParts = s.startTime.split(':');
            const endParts = s.endTime.split(':');
            if(startParts.length === 2 && endParts.length === 2) {
                const start = parseInt(startParts[0])*60 + parseInt(startParts[1]);
                const end = parseInt(endParts[0])*60 + parseInt(endParts[1]);
                if(end > start) {
                    const duration = end - start;
                    const sessionDate = new Date(`${s.date}T00:00:00`);
                    
                    if (s.completed) {
                        if (sessionDate >= monday && sessionDate <= sunday) {
                            weekMins += duration;
                        }
                        if (s.date === todayStr) {
                            todayMins += duration;
                        }
                    }
                }
            }
        }
    });

    const focusStats = [
      { label: "Today", value: `${Math.floor(todayMins/60)}h ${todayMins%60}m`, iconName: "FaClock" },
      { label: "This week", value: `${Math.floor(weekMins/60)}h ${weekMins%60}m`, iconName: "FaCalendarAlt" },
      { label: "Tasks done", value: `${tasksDone} / ${totalTasks || 0}`, iconName: "FaCheckCircle" },
    ];

    let currentStreak = 0;
    let checkDate = new Date();
    
    // If today is completed, start streak at 1, else check yesterday
    const hasToday = completedDates.has(todayStr);
    
    let d = new Date();
    if (!hasToday) {
      d.setDate(d.getDate() - 1);
    }
    
    while (completedDates.has(d.toISOString().split("T")[0])) {
      currentStreak++;
      d.setDate(d.getDate() - 1);
    }

    const streak = {
      days: currentStreak,
      label: "day streak",
      note: currentStreak > 0 ? "Keep it up!" : "Start studying today!",
    };

    res.status(200).json({
      success: true,
      data: {
        todaySchedule,
        recentNotes,
        subjects,
        joinedCommunities,
        focusStats,
        streak
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
