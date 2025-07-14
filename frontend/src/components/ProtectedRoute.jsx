// components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const USERNAME = 'admin'
const PASSWORD = 'admin'

const ProtectedRoute = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [credentials, setCredentials] = useState({ username: '', password: '' })

	useEffect(() => {
		const token = Cookies.get('authToken')
		if (token === 'authenticated') {
			setIsAuthenticated(true)
		}
	}, [])

	const handleLogin = (e) => {
		e.preventDefault()
		const { username, password } = credentials
		if (username === USERNAME && password === PASSWORD) {
			// Set cookie valid for 30 minutes
			Cookies.set('authToken', 'authenticated', { expires: (1 / 48) }) // 1 hour / 2 = 30 min
			setIsAuthenticated(true)
		} else {
			alert('Invalid credentials')
		}
	}

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-black dark:text-white">
				<form
					onSubmit={handleLogin}
					className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-80 space-y-4"
				>
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">Login</h2>
					<input
						type="text"
						placeholder="Username"
						className="w-full px-3 py-2 border rounded dark:bg-zinc-700 dark:text-white"
						value={credentials.username}
						onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full px-3 py-2 border rounded dark:bg-zinc-700 dark:text-white"
						value={credentials.password}
						onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
					>
						Login
					</button>
				</form>
			</div>
		)
	}

	return <>{children}</>
}

export default ProtectedRoute
