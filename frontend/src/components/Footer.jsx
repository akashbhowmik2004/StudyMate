import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { IoMail, IoCall, IoLocation } from 'react-icons/io5';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-4">StudyTracker</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your ultimate platform for tracking progress and achieving your learning goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <IoMail className="text-blue-400 text-lg" />
                <span className="text-gray-400">support@studytracker.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <IoCall className="text-green-400 text-lg" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <IoLocation className="text-red-400 text-lg" />
                <span className="text-gray-400">123 Main St, City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2026 StudyTracker. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl">
              <FaLinkedin />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-xl">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
