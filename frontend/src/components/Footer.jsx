import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-full border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left - Copyright */}
                <div className="text-sm text-center md:text-left">
                    © {new Date().getFullYear()} <span className="font-semibold">Shortify</span>. All rights reserved.
                </div>

                {/* Right - Social Links */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black dark:hover:text-white transition"
                    >
                        <FaGithub size={20} />
                    </a>
                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-700 dark:hover:text-blue-400 transition"
                    >
                        <FaLinkedin size={20} />
                    </a>
                    <a
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 dark:hover:text-blue-300 transition"
                    >
                        <FaTwitter size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
