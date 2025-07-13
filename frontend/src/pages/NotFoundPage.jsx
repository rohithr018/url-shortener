import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFoundPage() {
    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-950 px-6 py-12 text-center text-black dark:text-white animate-fadeIn">
            {/* Warning Icon */}
            <div className="mb-4 animate-bounce text-red-500 dark:text-red-400">
                <FaExclamationTriangle size={48} />
            </div>

            {/* 404 Title */}
            <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                404
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                Page Not Found
            </h2>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                The page you’re trying to reach doesn't exist or was moved.
            </p>

            {/* Go Home Button */}
            <Link
                to="/"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Go to Homepage
            </Link>
        </main>
    );
}
