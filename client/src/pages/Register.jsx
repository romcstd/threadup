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
        <div className='register__container'>
          <div className='register__row'>
            <form className='register__form' onSubmit={formOnSubmit}>
              <div className='register__form__heading'>Create your account</div>
              <div className='register__form__subheading'>It's quick and easy.</div>       
              <div className='register__form__wrapper'>
                <div className='register__form__item'>
                     <div className='register__form__label'></div>
                     <input type="text" name="name" className={`register__form__input`}
                     placeholder="Full Name" value={name}
                     onChange={formOnChange}
                     />
                </div>
                <div className='register__form__item'>
                     <div className='register__form__label'></div>
                     <input type="text" name="email" className={`register__form__input`}
                     placeholder="Email" value={email}
                     onChange={formOnChange}
                     />
                </div>
                <div className='register__form__item'>
                     <div className='register__form__label'></div>
                     <input type="password" name="password" className={`register__form__input`}
                     placeholder="Password" value={password}
                     onChange={formOnChange}
                     />
                </div>
                <div className='register__form__item'>
                     <div className='register__form__label'></div>
                     <input type="password" name="confirmPassword" className={`register__form__input`}
                     placeholder="Confirm Password" value={confirmPassword}
                     onChange={formOnChange}
                     />
                </div>
                <div className="register__form__item">
                     <button className="register__form__button">Create a new account</button>
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