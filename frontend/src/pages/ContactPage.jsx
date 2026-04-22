import React, { useState } from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactMethods = [
    {
      icon: FaPhone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      color: "blue"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "support@studymate.com",
      color: "purple"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "123 Learning Street, Education City, EC 12345",
      color: "green"
    },
    {
      icon: FaClock,
      title: "Working Hours",
      value: "Mon - Fri, 9:00 AM - 6:00 PM EST",
      color: "orange"
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-slate-50 border-b border-slate-200 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">We're here to help and answer any questions you have</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded flex items-center justify-center flex-shrink-0">
                      <Icon className="text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{method.title}</h3>
                      <p className="text-slate-600 text-sm">{method.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded flex items-center justify-center transition-colors">
                  <FaFacebook className="text-sm" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded flex items-center justify-center transition-colors">
                  <FaTwitter className="text-sm" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded flex items-center justify-center transition-colors">
                  <FaLinkedin className="text-sm" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-white rounded flex items-center justify-center transition-colors">
                  <FaInstagram className="text-sm" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Send us a Message</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium text-sm">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    rows="5"
                    className="w-full px-4 py-2 border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white font-medium py-2.5 rounded hover:bg-slate-800 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">How do I create an account?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Click the "Sign Up" button on our website and fill in your details. It only takes a few minutes to get started!</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Is my data secure?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Yes, we use enterprise-grade encryption to protect all your personal data and study information.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">What devices are supported?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">StudyMate works on desktop, tablet, and mobile devices with any modern web browser.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Is there a free trial?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Yes! Sign up for a free account and enjoy 30 days of full access to all features.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactPage
