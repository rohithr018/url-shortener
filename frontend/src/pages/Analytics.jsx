import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import { getGlobalAnalytics } from "../services/url.service";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	ArcElement,
	Tooltip,
	Legend,
	TimeScale,
	TimeSeriesScale,
	Filler,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	ArcElement,
	Tooltip,
	Legend,
	TimeScale,
	TimeSeriesScale,
	Filler
);

const getChartOptions = (isDarkMode) => ({
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: { display: false },
		tooltip: {
			titleColor: isDarkMode ? "#f9fafb" : "#111827",
			bodyColor: isDarkMode ? "#e5e7eb" : "#1f2937",
			backgroundColor: isDarkMode ? "#111827" : "#ffffff",
			borderColor: isDarkMode ? "#374151" : "#d1d5db",
			borderWidth: 1,
		},
	},
	scales: {
		x: {
			ticks: {
				color: isDarkMode ? "#e5e5e5" : "#333",
				font: { size: 12, weight: "bold" },
			},
			grid: {
				color: isDarkMode ? "#2f2f2f" : "#dcdcdc",
			},
		},
		y: {
			ticks: {
				color: isDarkMode ? "#e5e5e5" : "#333",
				font: { size: 12, weight: "bold" },
			},
			grid: {
				color: isDarkMode ? "#2f2f2f" : "#dcdcdc",
			},
		},
	},
});

const Card = ({ title, children }) => (
	<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-lg p-6 w-full min-h-[500px] flex flex-col transition hover:shadow-xl">
		<h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
			{title}
		</h2>
		<div className="flex-1 flex items-center justify-center">{children}</div>
	</div>
);

const NoData = () => (
	<p className="text-gray-500 dark:text-zinc-400 text-sm italic text-center">
		No data available
	</p>
);

export default function AnalyticsPage() {
	const navigate = useNavigate();
	const isDarkMode = useSelector((state) => state.theme.theme) === "dark";
	const [analytics, setAnalytics] = useState(null);

	useEffect(() => {
		const fetchAnalytics = async () => {
			try {
				const data = await getGlobalAnalytics();
				setAnalytics(data);
			} catch (err) {
				console.error("Failed to fetch analytics:", err);
			}
		};

		fetchAnalytics();
	}, []);

	const chartOptions = getChartOptions(isDarkMode);

	if (!analytics) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950 text-gray-500 dark:text-zinc-400">
				Loading analytics...
			</div>
		);
	}

	const dateLabels = Object.keys(analytics.clicksByDate).sort();
	const clickCounts = dateLabels.map((date) => analytics.clicksByDate[date]);

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 md:px-8 py-12 text-black dark:text-white scroll-smooth">
			{/* Header */}
			<div className="relative mb-12 text-center">
				<button
					onClick={() => navigate("/")}
					className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-blue-600 dark:text-blue-400 hover:underline"
				>
					<FiArrowLeft className="mr-1 text-lg" />
					<span className="hidden sm:inline">Back</span>
				</button>
				<h1 className="text-4xl sm:text-5xl font-bold">Analytics Overview</h1>
			</div>

			{/* Charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<Card title="Click Trends Over Time">
					{dateLabels.length > 0 ? (
						<Line
							data={{
								labels: dateLabels,
								datasets: [
									{
										label: "Clicks",
										data: clickCounts,
										borderColor: "#3b82f6",
										backgroundColor: "rgba(59, 130, 246, 0.2)",
										fill: true,
										tension: 0.3,
									},
								],
							}}
							options={chartOptions}
						/>
					) : (
						<NoData />
					)}
				</Card>

				<Card title="Top Countries">
					{Object.keys(analytics.topCountries).length > 0 ? (
						<Bar
							data={{
								labels: Object.keys(analytics.topCountries),
								datasets: [
									{
										label: "Clicks",
										data: Object.values(analytics.topCountries),
										backgroundColor: "#10b981",
									},
								],
							}}
							options={chartOptions}
						/>
					) : (
						<NoData />
					)}
				</Card>

				<Card title="Hourly Click Activity">
					{analytics.hourlyClicks.some((count) => count > 0) ? (
						<Bar
							data={{
								labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
								datasets: [
									{
										label: "Clicks",
										data: analytics.hourlyClicks,
										backgroundColor: "#f59e0b",
									},
								],
							}}
							options={chartOptions}
						/>
					) : (
						<NoData />
					)}
				</Card>

				<Card title="Top Referrers">
					{Object.keys(analytics.topReferrers).length > 0 ? (
						<Pie
							data={{
								labels: Object.keys(analytics.topReferrers),
								datasets: [
									{
										label: "Referrers",
										data: Object.values(analytics.topReferrers),
										backgroundColor: [
											"#e11d48",
											"#8b5cf6",
											"#3b82f6",
											"#10b981",
											"#f97316",
										],
									},
								],
							}}
							options={chartOptions}
						/>
					) : (
						<NoData />
					)}
				</Card>

				<Card title="Top User Agents">
					{Object.keys(analytics.topUserAgents).length > 0 ? (
						<Bar
							data={{
								labels: Object.keys(analytics.topUserAgents),
								datasets: [
									{
										label: "Devices",
										data: Object.values(analytics.topUserAgents),
										backgroundColor: "#6366f1",
									},
								],
							}}
							options={chartOptions}
						/>
					) : (
						<NoData />
					)}
				</Card>

				<Card title="Top Short URLs">
					{analytics.topUrls.length > 0 ? (
						<Bar
							data={{
								labels: analytics.topUrls.map((url) => url.shortCode),
								datasets: [
									{
										label: "Clicks",
										data: analytics.topUrls.map((url) => url.clickCount),
										backgroundColor: "#ef4444",
									},
								],
							}}
							options={chartOptions}
						/>
					) : (
						<NoData />
					)}
				</Card>
			</div>
		</div>
	);
}
