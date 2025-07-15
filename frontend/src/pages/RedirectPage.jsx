import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { resolveShortUrl } from "../services/url.service";

const RedirectPage = () => {
	const { shortcode } = useParams();

	useEffect(() => {
		const redirect = async () => {
			try {
				const location = await resolveShortUrl(shortcode);
				if (location) {
					window.location.href = location;
				} else {
					window.location.href = "/404";
				}
			} catch (err) {
				console.error("Failed to resolve URL:", err);
				window.location.href = "/404";
			}
		};

		redirect();
	}, [shortcode]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 text-black dark:text-white px-4">
			<div className="text-center">
				<div className="animate-pulse text-blue-600 dark:text-blue-400 text-xl font-semibold mb-2">
					Redirecting...
				</div>
				<p className="text-gray-600 dark:text-gray-400 text-sm">
					Please wait while we take you to your destination.
				</p>
			</div>
		</div>
	);
};

export default RedirectPage;
