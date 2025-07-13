import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton.jsx';

const Header = () => {
    return (
        <header className="w-full px-4 sm:px-6 py-3 bg-white dark:bg-gray-950 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* App Logo / Title */}
                <Link
                    to="/"
                    className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400"
                >
                    🔗 URL Shortener
                </Link>

                {/* Theme Toggle */}
                <ThemeToggleButton />
            </div>
        </header>
    );
};

export default Header;
