import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../../features/posts/postSlice'

function CreatePostForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const formOnSubmit = (e) => {
    e.preventDefault()

    dispatch(createPost({title, description}))
    setTitle('')
    setDescription('')
  }

  return (
    <section className="create-post">

          <div className="create-post-container">

               <div className="create-post-row">

                    <form className="create-post-form" onSubmit={formOnSubmit}>

                         <div className="create-post-form-heading">Create post</div>

                         <div className="create-post-form-wrapper">

                              <div className="create-post-form-item">
                                   <div className="create-post-form-label"></div>
                                   <input type="text" name="title" 
                                   className={`create-post-form-input`}
                                   placeholder="Title"
                                   onChange={(e) => setTitle(e.target.value)} value={title} />
                              </div>

                              <div className="create-post-form-item">
                                   <div className="create-post-form-label"></div>
                                   <textarea rows={5}
                                   className={`create-post-form-textarea`}
                                   placeholder="What's on your mind?"
                                   onChange={(e) => setDescription(e.target.value)} value={description}
                                   >{description}</textarea>
                              </div>

                              <div className="create-post-form-item">
                                   <button className="create-post-form-button">Post</button>
                              </div>

                         </div>

                         {/* {error && <div className="create-post-form-error">{error}</div>} */}

                    </form>

               </div>

          </div>

     </section>
  )
}

export default CreatePostForm
