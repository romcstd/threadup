
import Logo from '@/assets/logo/logo.png';
// import DarkLogo from '@/assets/logo/dark-logo.png';

export const SideBar = () => {
    return (
        <aside
            className="fixed top-0 left-0 w-16 h-full bg-white border-r z-50"
            role="navigation"
            aria-label="Side Bar"
        >
            <div className="p-4 flex flex-col h-full">
                <nav className="flex-1">
                    <ul className="flex flex-col space-y-2">
                        <li>
                            <a href="/" className="rounded">
                                <img src={Logo} alt="Logo" className="w-8" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};