import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/stores/useThemeStore";

export const ThemeToggle = () => {
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    return (
        <button
            onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
            }
            className="hover:text-black dark:hover:text-white cursor-pointer"
        >
            {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
        </button>
    );
};