import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggleButton = () => {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
        >
            {theme === 'dark' ? (
                <FaSun className="text-yellow-400 transition-transform duration-300 hover:rotate-180" size={18} />
            ) : (
                <FaMoon className="text-blue-500 transition-transform duration-300 hover:rotate-180" size={18} />
            )}
        </button>
    );
};

export default ThemeToggleButton;
