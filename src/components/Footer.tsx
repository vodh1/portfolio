import React from 'react';
import { Github, Linkedin, Mail, Code, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Andre Lee R. Cuyugan
            </h3>
            <p className="text-gray-400 mt-2">
              Bachelor's in Science in Computing Studies
            </p>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://github.com/vodh1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/andre-lee-cuyugan-125068365/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:andrelee.cuyugan@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Personal Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Andre Lee R. Cuyugan. All rights reserved.
          </p>
          
          <div className="flex items-center text-sm text-gray-500">
            <span className="flex items-center">
              <Code className="w-4 h-4 mr-1" />
              Built with React & Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;