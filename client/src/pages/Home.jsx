import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'

function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {

    if (user) {
      navigate('/dashboard')
    }

    return () => {
      dispatch(reset())
    }
    
  }, [user, navigate, dispatch])

  return (
    <div>Home</div>
  )
}

export default Home