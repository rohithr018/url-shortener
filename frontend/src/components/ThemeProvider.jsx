import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
    const { theme } = useSelector((state) => state.theme); // expects 'dark' or 'light'

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="min-h-screen bg-white text-gray-800 dark:bg-[rgb(16,23,42)] dark:text-gray-200 ">
                {children}
            </div>
        </div>
    );
}
