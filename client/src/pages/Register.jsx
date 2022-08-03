import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='register'>
        <div className='register-container'>
          <div className='register-row'>
            <form className='register-form' onSubmit={formOnSubmit}>
              <div className='register-form-heading'>Create your account</div>
              <div className='register-form-subheading'>It's quick and easy.</div>       
              <div className='register-form-wrapper'>
                <div className='register-form-item'>
                     <div className='register-form-label'></div>
                     <input type="text" name="name" className={`register-form-input`}
                     placeholder="Full Name" value={name}
                     onChange={formOnChange}
                     />
                </div>
                <div className='register-form-item'>
                     <div className='register-form-label'></div>
                     <input type="text" name="email" className={`register-form-input`}
                     placeholder="Email" value={email}
                     onChange={formOnChange}
                     />
                </div>
                <div className='register-form-item'>
                     <div className='register-form-label'></div>
                     <input type="password" name="password" className={`register-form-input`}
                     placeholder="Password" value={password}
                     onChange={formOnChange}
                     />
                </div>
                <div className='register-form-item'>
                     <div className='register-form-label'></div>
                     <input type="password" name="confirmPassword" className={`register-form-input`}
                     placeholder="Confirm Password" value={confirmPassword}
                     onChange={formOnChange}
                     />
                </div>
                <div className="register-form-item">
                     <button className="register-form-button">Create a new account</button>
                </div>
              </div>
            </form>
          </div>
        </div>
     </section>
    </>
  )
}

export default Register