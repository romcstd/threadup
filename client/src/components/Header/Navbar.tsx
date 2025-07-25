import { Link } from 'react-router-dom'

function Navbar() {

    const GetData = [

        { text: 'Login', url: '/login', },
        { text: 'Register', url: '/register', }

    ];

    return (
        <>
            <nav className="navbar">

                <div className="navbar-container">

                    <div className="navbar-row">

                        <div className="navbar-brand">

                            <div className="navbar-brand-item">

                                <Link to="/" className="navbar-brand-link">

                                    <div className="navbar-brand-logo">BLOG APP</div>

                                </Link>

                            </div>

                        </div>

                        <div className="navbar-desktop-menu">

                            {GetData.map((data, index) => (

                                <div key={data.text + index} className="navbar-desktop-menu-item">

                                    <Link to={data.url} className="navbar-desktop-menu-link">{data.text}</Link>

                                </div>

                            ))}

                        </div>

                        <div className="navbar-mobile-menu"></div>

                    </div>

                </div>

            </nav>
        </>
    )
}

export default Navbar