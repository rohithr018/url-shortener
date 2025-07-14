import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton.jsx';
import { FiBarChart2 } from 'react-icons/fi';

const Header = () => {
    const navigate = useNavigate();

    const goToAnalytics = () => {
        navigate('/dash/analytics');
    };
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

                {/* Right Actions */}
                <div className="flex items-center space-x-3">
                    {/* Analytics Button */}
                    <button
                        onClick={goToAnalytics}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                    >
                        <FiBarChart2 className="h-5 w-5" />
                        <span className="hidden sm:inline">Analytics</span>
                    </button>

                    {/* Theme Toggle */}
                    <ThemeToggleButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
