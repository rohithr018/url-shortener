import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const USERNAME = "admin";
const PASSWORD = "admin";

const ProtectedRoute = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		const token = Cookies.get("authToken");
		if (token === "authenticated") {
			setIsAuthenticated(true);
		}
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		const { username, password } = credentials;
		if (username === USERNAME && password === PASSWORD) {
			Cookies.set("authToken", "authenticated", { expires: 1 / 48 }); // 30 minutes
			setIsAuthenticated(true);
		} else {
			alert("Invalid credentials");
		}
	};

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
				<div className="w-full max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 space-y-6">
					<h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
						Admin Login
					</h2>
					<form onSubmit={handleLogin} className="space-y-4">
						<div className="flex flex-col">
							<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Username
							</label>
							<input
								type="text"
								placeholder="Enter username"
								value={credentials.username}
								onChange={(e) =>
									setCredentials({ ...credentials, username: e.target.value })
								}
								className="mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div className="flex flex-col">
							<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Password
							</label>
							<input
								type="password"
								placeholder="Enter password"
								value={credentials.password}
								onChange={(e) =>
									setCredentials({ ...credentials, password: e.target.value })
								}
								className="mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-shadow shadow-md hover:shadow-lg"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
