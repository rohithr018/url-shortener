import React, { useEffect, useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const features = [
	{
		title: "Custom Alias",
		description:
			"Create personalized short URLs like sh-rtly/my-brand for easy sharing and branding.",
	},
	{
		title: "Dark Mode",
		description:
			"Switch between light and dark themes for a better and more comfortable user experience.",
	},
	{
		title: "Secure Redirects",
		description:
			"All redirects are verified and encrypted to protect users from malicious links.",
	},
	{
		title: "Blazing Fast Performance",
		description:
			"Optimized infrastructure with caching ensures instant redirection and response.",
	},
	{
		title: "User-Friendly Interface",
		description:
			"Simple, intuitive design that makes creating links effortless.",
	},
	{
		title: "Link Expiration",
		description: "Auto expires link/short-codes after some time",
	},
	{
		title: "Caching for Fast Redirects",
		description:
			"Integrated smart caching systems reduce latency and improve response times globally.",
	},
];

export default function Features() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const intervalRef = useRef(null);

	const goToSlide = (index) => {
		setCurrentIndex((index + features.length) % features.length);
	};

	const nextSlide = () => goToSlide(currentIndex + 1);
	const prevSlide = () => goToSlide(currentIndex - 1);

	const startAutoSlide = () => {
		intervalRef.current = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % features.length);
		}, 4000);
	};

	const stopAutoSlide = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
	};

	useEffect(() => {
		startAutoSlide();
		return () => stopAutoSlide();
	}, []);

	return (
		<div
			onMouseEnter={stopAutoSlide}
			onMouseLeave={startAutoSlide}
			className="w-full bg-blue-100 dark:bg-gray-950 py-3 px-4 sm:px-6 text-center shadow-inner relative flex flex-col items-center overflow-hidden"
		>
			{/* Navigation Buttons */}
			<button
				onClick={prevSlide}
				aria-label="Previous Feature"
				className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-100 transition-all"
			>
				<FaChevronLeft className="text-lg sm:text-xl" />
			</button>

			{/* Slide Text */}
			<div className="mx-10 sm:mx-20 transition-all duration-500 ease-in-out">
				<p className="text-sm sm:text-base text-blue-900 dark:text-blue-200 font-medium">
					<span className="font-semibold">{features[currentIndex].title}:</span>{" "}
					{features[currentIndex].description}
				</p>
			</div>

			{/* Navigation Buttons */}
			<button
				onClick={nextSlide}
				aria-label="Next Feature"
				className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-100 transition-all"
			>
				<FaChevronRight className="text-lg sm:text-xl" />
			</button>

			{/* Dots */}
			<div className="mt-3 flex gap-2">
				{features.map((_, i) => (
					<button
						key={i}
						onClick={() => goToSlide(i)}
						className={`w-3 h-3 rounded-full transition-all border-2 ${
							i === currentIndex
								? "bg-blue-600 dark:bg-blue-300 border-blue-600 dark:border-blue-300"
								: "bg-transparent border-blue-400 dark:border-blue-600"
						}`}
						aria-label={`Go to slide ${i + 1}`}
					/>
				))}
			</div>

			{/* Divider */}
			<hr className="w-full border-t border-gray-300 dark:border-gray-700 mt-4" />
		</div>
	);
}
