import { useState, type FormEvent } from 'react'
import { usePostStore } from '../../features/posts/usePostStore'

const CreatePostForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Get createPost action from Zustand store
  const createPost = usePostStore(state => state.createPost)

  const formOnSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await createPost({ title, description })
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
                <input
                  type="text"
                  name="title"
                  className="create-post-form-input"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="create-post-form-item">
                <textarea
                  rows={5}
                  className="create-post-form-textarea"
                  placeholder="What's on your mind?"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="create-post-form-item">
                <button className="create-post-form-button" type="submit">
                  Post
                </button>
              </div>
            </div>
            {/* {error && <div className="create-post-form-error">{error}</div>} */}
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreatePostForm;