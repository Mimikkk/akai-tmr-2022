import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { useTheme } from "next-themes";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      className="w-8 h-8 bg-blue-100 rounded-lg dark:bg-slate-800 flex items-center justify-center hover:ring-2 ring-blue-400 transition-all duration-300 focus:outline-none"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? (
        <Icon name="Moon" className="text-blue-500 w-5 h-5" />
      ) : (
        <Icon name="Sun" className="text-blue-400 w-5 h-5" />
      )}
    </button>
  );
};
