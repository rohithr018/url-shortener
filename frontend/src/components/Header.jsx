import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton.jsx";
import { FiBarChart2 } from "react-icons/fi";

const Header = () => {
	const navigate = useNavigate();

	const goToAnalytics = () => {
		navigate("/dash/analytics");
	};

	return (
		<header className="w-full sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 shadow-md transition-all duration-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
				{/* Logo & Title */}
				<Link
					to="/"
					className="flex items-center gap-3 text-2xl font-bold text-blue-600 dark:text-blue-400"
				>
					<img src="/vite.svg" alt="Logo" className="w-10 h-10" />
					<span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-[length:300%_300%] bg-clip-text text-transparent animate-[gradientMove_6s_ease_infinite]">
						sh-rtly
					</span>
				</Link>

				{/* Right Side Actions */}
				<div className="flex items-center gap-3">
					<button
						onClick={goToAnalytics}
						className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition"
					>
						<FiBarChart2 className="w-5 h-5" />
						<span className="hidden sm:inline">Analytics</span>
					</button>
					<ThemeToggleButton />
				</div>
			</div>
		</header>
	);
};

export default Header;
