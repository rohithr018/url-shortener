import React from "react";
import { FaGithub, FaLinkedin, FaRegCopyright } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="w-full border-t border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-12">
			<div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
				{/* Left: Text */}
				<div className="text-sm text-center sm:text-left flex items-center justify-center sm:justify-start gap-1">
					<FaRegCopyright className="inline-block text-blue-600 dark:text-blue-400" />
					<span>{new Date().getFullYear()}</span>
					<Link
						to="/"
						className="font-semibold text-blue-600 dark:text-blue-400 hover:underline ml-1"
					>
						Sh-rtly
					</Link>
					<span>. All rights reserved.</span>
				</div>

				{/* Right: Social Links */}
				<div className="flex items-center gap-5">
					<a
						href="https://github.com/rohithr018"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						title="GitHub"
						className="hover:text-black dark:hover:text-white transition-transform transform hover:scale-110"
					>
						<FaGithub size={20} />
					</a>
					<a
						href="https://www.linkedin.com/in/rohithr1809/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
						title="LinkedIn"
						className="hover:text-blue-700 dark:hover:text-blue-400 transition-transform transform hover:scale-110"
					>
						<FaLinkedin size={20} />
					</a>
				</div>
			</div>
		</footer>
	);
}
