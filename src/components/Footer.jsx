import React from 'react';
import { Link } from 'react-router-dom';
// We are using react-icons for social media icons
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6"; // The new X logo [cite: 122]

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: Logo and Name */}
        <div>
          <Link to="/" className="text-2xl font-bold">PlateShare</Link>
          <p className="mt-2 text-gray-400">Reducing food waste, one plate at a time.</p>
        </div>

        {/* Column 2: Quick Links (Optional, but good practice) */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/available-foods" className="hover:text-blue-400">Available Foods</Link></li>
            <li><Link to="/add-food" className="hover:text-blue-400">Add Food</Link></li>
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
          </ul>
        </div>

        {/* Column 3: Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-sky-400">
              <FaXTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-400">
              <FaGithub />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} PlateShare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;