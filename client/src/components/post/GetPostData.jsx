import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../../features/auth/authSlice'
import { getPosts, deletePost } from '../../features/posts/postSlice'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import * as Icon from 'react-icons/fa'
import Spinner from '../../components/Spinner'

function GetPostData() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { posts, isLoading, isError, message } = useSelector((state) => state.posts)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/')
    }

    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
    
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='get-post'>
        <div className='get-post-container'>
        {posts.length > 0 ? (
          <div className='get-post-row'>
            {posts.map((post) => (
            <div className='get-post-column' key={post._id}>
              <div className='get-post-card'>
                {/* <div>{new Date(post.createdAt).toLocaleString('en-US')}</div> */}
                <div className="italic text-sm text-gray-500 mb-4">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
                <h2>{post.title}</h2>
                <h2>{post.description}</h2>
                <div className="get-post-card-delete-button" onClick={() => dispatch(deletePost(post._id))} >
                  <Icon.FaRegTrashAlt className="mr-1" /> Delete
                </div>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <h3>You have not set any posts</h3>
        )}
        </div>
      </section>
    </>
  )
}

export default GetPostData
