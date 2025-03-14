import React from 'react';
import { Box } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Copyright Section */}
          <div className="space-y-6">
            <Box className="w-12 h-12" />
            <p className="text-sm text-gray-300">
              © 2025 Destination Ljungdalen AB.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigering</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Hem</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Om Oss</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Aktiviteter</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Tjänster</a></li>
            </ul>
          </div>

          {/* Discover Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Upptäck</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Boende</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Mat & Dryck</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Friskvård</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Skid Skola</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Kontakta oss</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Platser</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Jobba hos oss</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;