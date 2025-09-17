import Logo from '@/assets/logo/logo-with-text.png';
import DarkLogo from '@/assets/logo/dark-logo-with-text.png';
import { useThemeStore } from "@/stores/useThemeStore";

export const Spinner = () => {
  const theme = useThemeStore(state => state.theme);
  return (
    <div className='loadingSpinnerContainer'>
      <img src={theme === "light" ? Logo : DarkLogo} alt="Logo" className="w-48" />
    </div>
  )
}