import { useState, useEffect } from "react";
import { LogOut, Sun, Moon, User, PlusSquare } from "lucide-react";
import Logo from '@/assets/logo/logo.png';
// import DarkLogo from '@/assets/logo/dark-logo.png';
import { useAuthStore } from "@/features/auth/useAuthStore"; // your Zustand auth store
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const SideBar = () => {
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);
    const reset = useAuthStore(state => state.reset);

    const onLogout = () => {
        logout();
        reset();
    };

    const [theme, setTheme] = useState<"light" | "dark">(
        (localStorage.getItem("theme") as "light" | "dark") || "light"
    );

    // Apply theme to <html>
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <aside
            className="fixed top-0 left-0 w-16 h-full bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 z-50 hidden md:flex flex-col justify-between"
            role="navigation"
            aria-label="Side Bar"
        >
            <TooltipProvider>
                {/* Top Section */}
                <div className="flex flex-col items-center p-4 space-y-6">
                    {/* Logo */}
                    <a href="/" className="mb-4">
                        <img src={Logo} alt="Logo" className="w-8" />
                    </a>

                    {user &&
                        <nav className="flex flex-col space-y-6 text-gray-600 dark:text-gray-300">

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href="/profile"
                                        className="hover:text-black dark:hover:text-white"
                                    >
                                        <User size={24} />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="right">Profile</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href="/create"
                                        className="hover:text-black dark:hover:text-white"
                                    >
                                        <PlusSquare size={24} />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="right">Create Post</TooltipContent>
                            </Tooltip>
                        </nav>
                    }
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center p-4 space-y-6 text-gray-600 dark:text-gray-300">
                    {/* Theme Toggle */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() =>
                                    setTheme(theme === "light" ? "dark" : "light")
                                }
                                className="hover:text-black dark:hover:text-white"
                            >
                                {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {theme === "light" ? "Dark mode" : "Light mode"}
                        </TooltipContent>
                    </Tooltip>

                    {/* Logout */}
                    {user &&
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={onLogout}
                                    className="hover:text-red-500 transition-colors"
                                >
                                    <LogOut size={22} />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Logout</TooltipContent>
                        </Tooltip>
                    }
                </div>
            </TooltipProvider>
        </aside>
    );
};
