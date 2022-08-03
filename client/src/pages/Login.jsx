import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const formOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const formOnSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='login'>
        <div className='login-container'>
          <div className='login-row'>
            <form className='login-form' onSubmit={formOnSubmit}>
              <div className='login-form-heading'>Login your account</div>
              <div className='login-form-subheading'>Please login your credentials to continue.</div>   
              <div className='login-form-wrapper'>
                <div className='login-form-item'>
                     <div className='login-form-label'></div>
                     <input type="text" name="email" className={`login-form-input`}
                     placeholder="Email" value={email}
                     onChange={formOnChange}
                     />
                </div>
                <div className='login-form-item'>
                     <div className='login-form-label'></div>
                     <input type="password" name="password" className={`login-form-input`}
                     placeholder="Password" value={password}
                     onChange={formOnChange}
                     />
                </div>
                <div className="login-form-item">
                     <button className="login-form-button">Login</button>
                </div>   
              </div>
            </form>
          </div>
        </div>
     </section>
    </>
  )
}

export default Login