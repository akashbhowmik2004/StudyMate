import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaChartLine, FaClock, FaTrophy, FaBook, FaArrowRight } from 'react-icons/fa'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <Navbar/>
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
            Track Your Learning Journey
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            A clean, intuitive platform to monitor your study progress, set meaningful goals, and achieve academic excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glass-button px-8 py-3 text-white font-medium rounded">
              Get Started
            </button>
            <button className="glass-button px-8 py-3 text-white font-medium rounded">
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Section Preview */}
        <div className="mt-20 glass-container h-72 flex items-center justify-center">
          <div className="text-center">
            <FaBook className="text-5xl text-white/40 mx-auto mb-4" />
            <p className="text-white/70 font-medium">Dashboard Preview</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/10 backdrop-blur-xl py-20 sm:py-28 border-y border-white/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              Core Features
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Everything needed for effective study tracking and progress monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="glass-card p-6 hover:border-white/40 transition-all">
              <div className="text-3xl text-white/70 mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Monitor study progress with detailed analytics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-6 hover:border-white/40 transition-all">
              <div className="text-3xl text-white/70 mb-4">
                <FaClock />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Time Management</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Efficiently manage study sessions and optimize time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-6 hover:border-white/40 transition-all">
              <div className="text-3xl text-white/70 mb-4">
                <FaTrophy />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Achievements</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Unlock badges and celebrate learning milestones.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-6 hover:border-white/40 transition-all">
              <div className="text-3xl text-white/70 mb-4">
                <FaBook />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Study Notes</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Organize and manage study materials in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg border border-slate-200 text-center">
            <p className="text-4xl font-semibold text-slate-900 mb-2">10K+</p>
            <p className="text-slate-600 font-medium">Active Users</p>
          </div>
          <div className="bg-white p-8 rounded-lg border border-slate-200 text-center">
            <p className="text-4xl font-semibold text-slate-900 mb-2">50K+</p>
            <p className="text-slate-600 font-medium">Study Hours Tracked</p>
          </div>
          <div className="bg-white p-8 rounded-lg border border-slate-200 text-center">
            <p className="text-4xl font-semibold text-slate-900 mb-2">95%</p>
            <p className="text-slate-600 font-medium">Success Rate</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of students tracking their progress and achieving their goals.
          </p>
          <button className="px-8 py-3 bg-white text-slate-900 font-medium rounded hover:bg-slate-100 transition-colors duration-300">
            Start Your Free Trial
          </button>
        </div>
      </section>

      <Footer/>
    </div>
  )
}

export default HomePage
