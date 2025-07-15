import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFoundPage() {
	return (
		<main className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-950 px-6 py-12 text-center text-black dark:text-white">
			{/* Warning Icon */}
			<div className="mb-6 animate-bounce text-red-500 dark:text-red-400">
				<FaExclamationTriangle size={48} />
			</div>

			{/* 404 Heading */}
			<h1 className="text-7xl sm:text-8xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
				404
			</h1>

			{/* Subtitle */}
			<h2 className="text-2xl sm:text-3xl font-semibold mb-3">
				Page Not Found
			</h2>

			{/* Description */}
			<p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-md mb-8">
				The page you’re looking for doesn’t exist or may have been moved.
			</p>

			{/* Home Button */}
			<Link
				to="/"
				className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
				Go to Homepage
			</Link>
		</main>
	);
}
