import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const getPreferredTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }
  return "light";
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: getPreferredTheme(),

      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
      },

      toggleTheme: () => {
        const nextTheme = get().theme === "light" ? "dark" : "light";
         set({ theme: nextTheme });
         document.documentElement.classList.remove("light", "dark");
         document.documentElement.classList.add(nextTheme);
        },
    }),
    {
      name: "theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply persisted theme immediately after hydration
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(state.theme);
        }
      },
    }
  )
);