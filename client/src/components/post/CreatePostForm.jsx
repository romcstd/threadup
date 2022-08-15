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
    <section className="create__post">

          <div className="create__post-container">

               <div className="create__post__row">

                    <form className="create__post__form" onSubmit={formOnSubmit}>

                         <div className="create__post__form__heading">Create post</div>

                         <div className="create__post__form__wrapper">

                              <div className="create__post__form__item">
                                   <div className="create__post__form__label"></div>
                                   <input type="text" name="title" 
                                   className={`create__post__form__input`}
                                   placeholder="Title"
                                   onChange={(e) => setTitle(e.target.value)} value={title} />
                              </div>

                              <div className="create__post__form__item">
                                   <div className="create__post__form__label"></div>
                                   <textarea rows={5}
                                   className={`create__post__form__textarea`}
                                   placeholder="What's on your mind?"
                                   onChange={(e) => setDescription(e.target.value)} value={description}
                                   >{description}</textarea>
                              </div>

                              <div className="create__post__form__item">
                                   <button className="create__post__form__button">Post</button>
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
