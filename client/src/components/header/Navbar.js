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

        <div className='navbar__container'>

          <div className='navbar__row'>

            <div className='navbar__brand'>

              <div className='navbar__brand__item'>

                <Link to="/" className='navbar__brand__link'>
                  
                  <div className='navbar__brand__logo'>BLOG APP</div>
                  
                </Link>          

              </div>

            </div>

            <div className='navbar__desktop__menu'>

              {user ? (
                <>
                  <div className='navbar__desktop__menu__item'>
                      
                    <button onClick={onLogout} className='navbar__desktop__menu__link'>Logout</button>
      
                  </div>
                </>
              ) : (
                <>
                  {GetData.map((data, index) => (

                    <div key={data + index} className='navbar__desktop__menu__item'>
                      
                      <Link to={data.url} className='navbar__desktop__menu__link'>{data.text}</Link>

                    </div>

                  ))}
                </>
              ) }
            </div>

            <div className='navbar__mobile__menu'></div>

          </div>

        </div>

      </nav>
    </>
  )
}

export default Navbar