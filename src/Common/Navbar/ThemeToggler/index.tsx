import { useState, useEffect } from "react";

import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../../Utils/storageUtils";

import { APP_THEME_LEY } from "../../../Constants/localStorageKeys";

import styles from './themeToggler.module.css';

const ThemeToggler = () => {

  const getinitialAppTheme = () => {
    const storedTheme = getLocalStorageData<string>(APP_THEME_LEY);
    if (storedTheme === "lightTheme" || storedTheme === "darkTheme") {
      return storedTheme;
    }
    return "darkTheme";
  };

  const [currentTheme, setCurrentTheme] = useState<Theme>(getinitialAppTheme());
  const [isDarkTheme, setisDarkTheme] = useState<boolean>(currentTheme === "darkTheme");

  useEffect(() => {
    document.body.classList.toggle(currentTheme);

    setisDarkTheme(currentTheme === "darkTheme");

    return () => {
      document.body.classList.remove(currentTheme);
    };
  }, [currentTheme]);

  const toggleTheme = () => {
    const selectedTheme = currentTheme === "lightTheme" ? "darkTheme" : "lightTheme";
    setCurrentTheme(selectedTheme);
    setLocalStorageData(APP_THEME_LEY, selectedTheme);
  };

  return (
    <div>
      <label className={styles.toggleButton}>
        <input
          type="checkbox"
          checked={isDarkTheme}
          onChange={toggleTheme}
        />
        <span className={`${styles.slider} ${isDarkTheme ? styles.darkMode : styles.lightMode}`}>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggler;

type Theme = "lightTheme" | "darkTheme";