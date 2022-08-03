import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

function Navbar() {

  const GetData = [

    { text: "Login", url: "/login", },
    { text: "Register", url: "/register", }

  ];

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <nav className='navbar'>

        <div className='navbar-container'>

          <div className='navbar-row'>

            <div className='navbar-brand'>

              <div className='navbar-brand-item'>

                <Link to="/" className='navbar-brand-link'>
                  
                  <div className='navbar-brand-logo'>MERN</div>
                  
                </Link>          

              </div>

            </div>

            <div className='navbar-desktop-menu'>

              {user ? (
                <>
                  <div className='navbar-desktop-menu-item'>
                      
                    <button onClick={onLogout} className='navbar-desktop-menu-link'>Logout</button>
      
                  </div>
                </>
              ) : (
                <>
                  {GetData.map((data, index) => (

                    <div key={data + index} className='navbar-desktop-menu-item'>
                      
                      <Link to={data.url} className='navbar-desktop-menu-link'>{data.text}</Link>

                    </div>

                  ))}
                </>
              ) }
            </div>

            <div className='navbar-mobile-menu'></div>

          </div>

        </div>

      </nav>
    </>
  )
}

export default Navbar