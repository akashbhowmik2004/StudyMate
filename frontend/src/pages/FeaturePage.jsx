import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { FaChartBar, FaClock, FaTrophy, FaUsers, FaBell, FaSync, FaMobileAlt, FaShieldAlt } from 'react-icons/fa'

const FeaturePage = () => {
  const features = [
    {
      icon: FaClock,
      title: "Study Time Tracking",
      description: "Track your study sessions in real-time and monitor time spent on each subject."
    },
    {
      icon: FaChartBar,
      title: "Progress Analytics",
      description: "Get detailed insights and analytics about your learning progress with charts."
    },
    {
      icon: FaTrophy,
      title: "Achievement System",
      description: "Earn badges and achievements to stay motivated and celebrate milestones."
    },
    {
      icon: FaUsers,
      title: "Community Learning",
      description: "Connect with other learners, share experiences, and grow together."
    },
    {
      icon: FaBell,
      title: "Smart Reminders",
      description: "Get personalized reminders for study sessions and important deadlines."
    },
    {
      icon: FaSync,
      title: "Sync Everywhere",
      description: "Access your study data across all devices with seamless synchronization."
    },
    {
      icon: FaMobileAlt,
      title: "Mobile App",
      description: "Study on the go with our fully-featured mobile application."
    },
    {
      icon: FaShieldAlt,
      title: "Data Security",
      description: "Your data is protected with enterprise-grade encryption and security."
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-slate-50 border-b border-slate-200 py-20 px-4\">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Core Features</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive tools designed to help you track progress and achieve your learning goals</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-16">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors duration-300">
                <div className="text-3xl text-slate-700 mb-4">
                  <Icon />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Feature Highlights Section */}
        <div className="bg-slate-50 rounded-lg p-8 md:p-12 mb-16 border border-slate-200">
          <h2 className="text-3xl font-semibold text-slate-900 mb-12 text-center">Why Choose StudyMate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-semibold text-slate-900 mb-2">1000+</div>
              <p className="text-slate-700 font-medium mb-2\">Active Users</p>
              <p className="text-slate-600 text-sm\">Join thousands of students tracking their progress</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-semibold text-slate-900 mb-2\">50K+</div>
              <p className="text-slate-700 font-medium mb-2\">Study Hours Tracked</p>
              <p className="text-slate-600 text-sm\">Combined study time across our community</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-semibold text-slate-900 mb-2\">98%</div>
              <p className="text-slate-700 font-medium mb-2\">User Satisfaction</p>
              <p className="text-slate-600 text-sm\">Highly rated by students and educators</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-semibold mb-4\">Ready to Enhance Your Study Habits?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto\">Start tracking your progress today and unlock your full potential</p>
          <button className="bg-white text-slate-900 px-8 py-3 rounded font-medium hover:bg-slate-100 transition-colors duration-300\">
            Get Started
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default FeaturePage
