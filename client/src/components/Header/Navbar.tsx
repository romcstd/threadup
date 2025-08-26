import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth/useAuthStore';

function Navbar() {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const reset = useAuthStore(state => state.reset);
    const logout = useAuthStore(state => state.logout);

    const GetData = [
        { text: 'Login', url: '/login', },
        { text: 'Register', url: '/register', }
    ];

    const onLogout = () => {
        logout();
        reset();
        navigate('/');
    };

    return (
        <>
            <nav className="navbar">

                <div className="navbar-container">

                    <div className="navbar-brand">

                        <div className="navbar-brand-item">

                            <Link to="/" className="navbar-brand-link">

                                <div className="navbar-brand-logo">ThreadUp</div>

                            </Link>

                        </div>

                    </div>

                    <div className="navbar-desktop-menu">
                        {user ? (
                            <>
                                <div className="navbar-desktop-menu-item">

                                    <button onClick={onLogout} className="navbar-desktop-menu-link">Logout</button>

                                </div>
                            </>
                        ) : (
                            <>
                                {GetData.map((data, index) => (

                                    <div key={data.text + index} className="navbar-desktop-menu-item">

                                        <Link to={data.url} className="navbar-desktop-menu-link">{data.text}</Link>

                                    </div>

                                ))}
                            </>
                        )}

                    </div>

                    <div className="navbar-mobile-menu"></div>

                </div>

            </nav >
        </>
    )
}

export default Navbar