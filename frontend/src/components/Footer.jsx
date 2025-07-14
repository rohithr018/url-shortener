import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-full border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Left: Copyright */}
                <div className="text-sm text-center md:text-left">
                    © {new Date().getFullYear()} <span className="font-semibold">Shortify</span>. All rights reserved.
                </div>

                {/* Right: Social Icons */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/rohithr018"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        title="GitHub"
                        className="hover:text-black dark:hover:text-white transition-colors transform hover:scale-110"
                    >
                        <FaGithub size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/rohithr1809/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                        className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
                    >
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
