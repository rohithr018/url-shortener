import React, { useState } from "react";
import { shortenUrl } from "../services/url.service";
import { toast } from "react-toastify";
import Features from "../components/Features";

export default function Home() {
	const [useCustom, setUseCustom] = useState(false);
	const [customAlias, setCustomAlias] = useState("");
	const [originalUrl, setOriginalUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [shortUrl, setShortUrl] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!originalUrl.trim()) return toast.error("Please enter a valid URL");
		if (useCustom && customAlias.trim().length < 6)
			return toast.error("Custom alias must be at least 6 characters long");

		setLoading(true);
		try {
			const payload = {
				originalUrl: originalUrl.trim(),
				customAlias: useCustom ? customAlias.trim() : undefined,
			};
			const res = await shortenUrl(payload);
			setShortUrl(res.shortUrl);
			setSubmitted(true);
			toast.success("Short URL generated!");
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to shorten URL");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section
			id="home"
			className="min-h-screen bg-gray-200 dark:bg-gray-950 text-black dark:text-white flex flex-col justify-start"
		>
			{/* Top Banner */}
			<Features />

			{/* Main Content */}
			<div className="flex-grow flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800">
					{/* Hero Section */}
					<div className="flex flex-col justify-center items-start p-6 sm:p-8 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
						<h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-800 dark:text-blue-300 leading-tight">
							Shorten URLs <br /> Effortlessly
						</h1>
						<p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300">
							Create branded links, and personalize your URLs with ease.
						</p>
					</div>

					{/* Form Section */}
					<div className="p-6 sm:p-8 flex flex-col justify-center">
						<form onSubmit={handleSubmit} className="space-y-5">
							{/* Long URL input */}
							<input
								type="url"
								value={originalUrl}
								onChange={(e) => {
									setOriginalUrl(e.target.value);
									if (submitted) {
										setSubmitted(false);
										setShortUrl("");
									}
								}}
								placeholder="Paste your long URL here..."
								className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>

							{/* Toggle */}
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									{useCustom ? "Custom Alias Enabled" : "Random Alias"}
								</span>
								<button
									type="button"
									onClick={() => {
										setUseCustom((prev) => !prev);
										setCustomAlias("");
										setSubmitted(false);
										setShortUrl("");
									}}
									className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
										useCustom ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
									}`}
								>
									<span
										className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
											useCustom ? "translate-x-7" : "translate-x-1"
										}`}
									/>
								</button>
							</div>

							{/* Custom Alias input */}
							<input
								type="text"
								value={customAlias}
								onChange={(e) => {
									setCustomAlias(e.target.value);
									if (submitted) {
										setSubmitted(false);
										setShortUrl("");
									}
								}}
								placeholder={
									useCustom
										? "Enter custom alias (min 6 characters)"
										: "Custom alias disabled"
								}
								disabled={!useCustom}
								readOnly={!useCustom}
								className={`w-full px-4 py-3 rounded-lg border ${
									useCustom
										? "border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
										: "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
								} placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none ${
									useCustom ? "focus:ring-2 focus:ring-blue-500" : ""
								}`}
							/>

							{/* Submit */}
							<button
								type="submit"
								disabled={loading || submitted}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-semibold transition-shadow shadow-md hover:shadow-lg disabled:opacity-60"
							>
								{loading
									? "Generating..."
									: submitted
										? "Generated"
										: "Generate Short URL"}
							</button>
						</form>

						{/* Result */}
						<div className="text-center min-h-[40px] mt-3">
							{shortUrl ? (
								<>
									<p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
										Your short URL:
									</p>
									<a
										href={shortUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-lg font-semibold text-blue-600 dark:text-blue-400 break-words hover:underline"
									>
										{shortUrl}
									</a>
								</>
							) : (
								<p className="text-sm italic text-gray-400 dark:text-gray-500">
									Your short URL will appear here
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
