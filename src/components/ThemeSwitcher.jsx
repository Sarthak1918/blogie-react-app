import React, { useState, useEffect } from 'react';
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";



function ThemeSwitcher() {
    const [isDarkMode, setIsDarkMode] = useState(false);



    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            className="p-2 rounded-md bg-gray-700 dark:bg-gray-700 focus:outline-none"
            onClick={toggleTheme}
        >
            {isDarkMode ? (
                <FaSun color='orange'/>
            ) : (
                <FaMoon color='white'/>
            )}
        </button>
    );
}

export default ThemeSwitcher;
