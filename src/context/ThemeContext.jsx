import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};