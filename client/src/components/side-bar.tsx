import { Link } from 'react-router-dom';
import { LogOut, User } from "lucide-react";
import Logo from '@/assets/logo/logo.png';
import DarkLogo from '@/assets/logo/dark-logo.png';
import { useAuthStore } from "@/features/auth/useAuthStore"; // your Zustand auth store
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useThemeStore } from "@/features/useThemeStore";
import { ThemeToggle } from "@/components/ThemeToggle";

export const SideBar = () => {
    const authUser = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);
    const reset = useAuthStore(state => state.reset);
    
    const theme = useThemeStore((state) => state.theme);

    const onLogout = () => {
        logout();
        reset();
    };

    return (
        <aside
            className="bg-background fixed top-0 left-0 w-16 h-full z-50 hidden md:flex flex-col justify-between"
            role="navigation"
            aria-label="Side Bar"
        >
            <TooltipProvider>
                {/* Top Section */}
                <div className="flex flex-col items-center p-4 space-y-6">
                    {/* Logo */}
                    <Link to="/" className="mb-4">
                        <img src={theme === "light" ? Logo : DarkLogo} alt="Logo" className="w-8" />
                    </Link>

                    {authUser &&
                        <nav className="flex flex-col space-y-6 text-gray-600 dark:text-gray-300">

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to={`/${authUser.username}`}
                                        className="hover:text-black dark:hover:text-white"
                                    >
                                        <User size={24} />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Profile</TooltipContent>
                            </Tooltip>

                            {/* <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/create"
                                        className="hover:text-black dark:hover:text-white"
                                    >
                                        <PlusSquare size={24} />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Create Post</TooltipContent>
                            </Tooltip> */}
                        </nav>
                    }
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center p-4 space-y-6 text-gray-600 dark:text-gray-300">
                    {/* Theme Toggle */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ThemeToggle />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {theme === "light" ? "Dark mode" : "Light mode"}
                        </TooltipContent>
                    </Tooltip>

                    {/* Logout */}
                    {authUser &&
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={onLogout}
                                    className="hover:text-red-500 transition-colors cursor-pointer"
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
