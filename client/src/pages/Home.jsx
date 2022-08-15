import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { HomeBanner } from '../components'

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
    <>
      <HomeBanner />
    </>
  )
}

export default Home