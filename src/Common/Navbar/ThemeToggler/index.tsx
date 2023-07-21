import React, { useState, useEffect } from "react";

import DayNightToggle from 'react-day-and-night-toggle';


const ThemeToggler = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>("lightTheme");
    const [isDarkTheme, setisDarkTheme] = useState<boolean>(false);
    
    useEffect(() => {
        document.body.classList.add(currentTheme);
        
        setisDarkTheme(currentTheme === 'darkTheme');

        return () => {
            document.body.classList.remove(currentTheme);
        };
    }, [currentTheme]);
    
    const toggleTheme = () => {
        const selectedTheme = currentTheme === "lightTheme" ? "darkTheme" : "lightTheme";
        setCurrentTheme(selectedTheme);
    };
    
  return (
    <div>
        <DayNightToggle onChange={toggleTheme} checked={isDarkTheme} />
    </div>
  );
};

export default ThemeToggler;

type Theme = "lightTheme" | "darkTheme";