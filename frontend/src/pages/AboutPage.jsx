import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { FaBullseye, FaLightbulb, FaUsers, FaAward, FaChartLine, FaRocket } from 'react-icons/fa'

const AboutPage = () => {
  const values = [
    {
      icon: FaBullseye,
      title: "Our Mission",
      description: "To empower students and lifelong learners to achieve their full potential through effective progress tracking and data-driven insights."
    },
    {
      icon: FaLightbulb,
      title: "Our Vision",
      description: "To create a world where every learner has access to tools that make studying more efficient, enjoyable, and rewarding."
    },
    {
      icon: FaUsers,
      title: "Our Values",
      description: "We believe in learning, innovation, community support, and making education accessible to everyone."
    }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Education enthusiast with 10+ years in EdTech"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      description: "Full-stack developer passionate about learning tools"
    },
    {
      name: "Emma Davis",
      role: "Head of Product",
      description: "User-focused designer with UX expertise"
    },
    {
      name: "Alex Rodriguez",
      role: "Community Manager",
      description: "Building connections and supporting our learners"
    }
  ]

  const milestones = [
    {
      year: "2020",
      event: "StudyMate Founded",
      description: "Started with a vision to revolutionize study tracking"
    },
    {
      year: "2021",
      event: "1000+ Users",
      description: "Reached our first thousand active users milestone"
    },
    {
      year: "2022",
      event: "Mobile App Launch",
      description: "Launched iOS and Android mobile applications"
    },
    {
      year: "2024",
      event: "50K+ Hours Tracked",
      description: "Community reached 50,000+ study hours tracked"
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-slate-50 border-b border-slate-200 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">About StudyMate</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Empowering learners worldwide to achieve their academic goals</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-16">
        {/* Introduction */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 mb-6">Who We Are</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            StudyMate is a comprehensive platform designed to help students and lifelong learners track their study progress, set meaningful goals, and stay motivated throughout their learning journey.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">
            Founded in 2020, StudyMate has grown into a thriving community of thousands of learners who trust us with their academic aspirations. Our platform combines intelligent tracking, analytics, and community support.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Whether you're preparing for exams, mastering a new skill, or simply want to stay organized, StudyMate provides the tools and insights you need to succeed.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl text-blue-600 mb-4">
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose StudyMate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaChartLine className="text-blue-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Detailed Analytics</h3>
                <p className="text-gray-600 text-sm mt-1">Understand your study patterns with comprehensive charts and insights</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaAward className="text-green-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gamification</h3>
                <p className="text-gray-600 text-sm mt-1">Earn badges and achievements to keep studying fun and engaging</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-purple-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Community Support</h3>
                <p className="text-gray-600 text-sm mt-1">Connect with thousands of learners and share your journey</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FaRocket className="text-orange-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Easy to Use</h3>
                <p className="text-gray-600 text-sm mt-1">Intuitive interface that makes tracking your progress effortless</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FaBullseye className="text-red-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Goal Setting</h3>
                <p className="text-gray-600 text-sm mt-1">Set and achieve meaningful learning objectives with guidance</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FaLightbulb className="text-indigo-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI-Powered Insights</h3>
                <p className="text-gray-600 text-sm mt-1">Get intelligent recommendations to optimize your study habits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-1 h-16 bg-blue-200 mt-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-2xl font-bold text-blue-600">{milestone.year}</div>
                  <div className="text-xl font-semibold text-gray-900 mt-1">{milestone.event}</div>
                  <p className="text-gray-600 mt-2">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium text-sm">{member.role}</p>
                  <p className="text-gray-600 text-sm mt-2">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">Become part of thousands of learners transforming their study habits</p>
          <button className="bg-white text-slate-900 px-8 py-3 rounded font-medium hover:bg-slate-100 transition-colors duration-300">
            Get Started Today
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AboutPage
