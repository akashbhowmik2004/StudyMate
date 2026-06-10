import {FaBook, FaCheckCircle} from 'react-icons/fa';
import Navbar from "../components/Navbar.jsx";
import {Features} from "../lib/Features.js";
import FeaturesCard from "../components/FeaturesCard.jsx";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navbar */}
            <Navbar/>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Your Study Partner<br/>is Here
                            </h1>
                            <p className="text-xl text-indigo-100 mb-8">
                                Connect with students, clear your doubts, share notes, and build a community focused on
                                learning together.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition shadow-lg">
                                    Get Started
                                </button>
                                <button
                                    className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-indigo-600 transition">
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Right Illustration */}
                        <div className="flex justify-center">
                            <div className="w-80 h-80 bg-indigo-300 rounded-full opacity-10 blur-3xl absolute"></div>
                            <div
                                className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white border-opacity-20">
                                <FaBook className="text-9xl text-indigo-100"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">
                            Powerful Features for Better Learning
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            Everything you need to succeed in your studies
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {Features.map((feature) => {
                            return (<FeaturesCard feature={feature}/>)
                        })}

                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">
                            How StudyMate Works
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            Get started in just a few simple steps
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div
                                className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Sign Up</h3>
                            <p className="text-slate-600">Create your account and join the StudyMate community.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div
                                className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Connect</h3>
                            <p className="text-slate-600">Find and join communities related to your courses.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div
                                className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Share & Learn</h3>
                            <p className="text-slate-600">Share notes, ask doubts, and help other students.</p>
                        </div>

                        {/* Step 4 */}
                        <div className="text-center">
                            <div
                                className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                4
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Grow</h3>
                            <p className="text-slate-600">Build your skills and academic reputation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section id="why-us" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">
                            Why Choose StudyMate?
                        </h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                            Join thousands of students already learning together
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-4 gap-8 mb-16">
                        <div className="bg-slate-50 p-8 rounded-xl text-center shadow-sm border border-slate-100">
                            <h3 className="text-4xl font-bold text-indigo-500 mb-2">10K+</h3>
                            <p className="text-slate-600 font-semibold">Active Students</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-xl text-center shadow-sm border border-slate-100">
                            <h3 className="text-4xl font-bold text-indigo-500 mb-2">500+</h3>
                            <p className="text-slate-600 font-semibold">Communities</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-xl text-center shadow-sm border border-slate-100">
                            <h3 className="text-4xl font-bold text-indigo-500 mb-2">50K+</h3>
                            <p className="text-slate-600 font-semibold">Questions Answered</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-xl text-center shadow-sm border border-slate-100">
                            <h3 className="text-4xl font-bold text-indigo-500 mb-2">100K+</h3>
                            <p className="text-slate-600 font-semibold">Study Notes</p>
                        </div>
                    </div>

                    {/* Why Us Points */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div
                                    className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <FaCheckCircle className="text-lg"/>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Collaborative Learning</h3>
                                <p className="text-slate-600">Learn from peers and experts in real-time discussions.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div
                                    className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <FaCheckCircle className="text-lg"/>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Quality Content</h3>
                                <p className="text-slate-600">Access curated notes and verified solutions from the
                                    community.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div
                                    className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <FaCheckCircle className="text-lg"/>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">24/7 Support</h3>
                                <p className="text-slate-600">Get help anytime from our active community members.</p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <div
                                    className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <FaCheckCircle className="text-lg"/>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">Growth Tracking</h3>
                                <p className="text-slate-600">Monitor your progress and celebrate your achievements.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Start Learning Together?</h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Join thousands of students and transform your learning experience today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition shadow-lg">
                            Sign Up Now
                        </button>
                        <button
                            className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-indigo-600 transition">
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-800 text-slate-300 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <FaBook className="text-xl text-indigo-400"/>
                                <span className="text-xl font-bold text-white">StudyMate</span>
                            </div>
                            <p className="text-sm text-slate-400">
                                Your ultimate study partner for collaborative learning.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-indigo-400 transition">Features</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition">FAQs</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-indigo-400 transition">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition">Blog</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition">Careers</a></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-sm text-slate-400">
                                © 2024 StudyMate. All rights reserved.
                            </p>
                            <div className="flex gap-6 mt-4 md:mt-0">
                                <a href="#" className="text-slate-400 hover:text-indigo-400 transition">Twitter</a>
                                <a href="#" className="text-slate-400 hover:text-indigo-400 transition">Facebook</a>
                                <a href="#" className="text-slate-400 hover:text-indigo-400 transition">LinkedIn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
