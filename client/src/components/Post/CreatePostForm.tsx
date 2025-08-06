import { useState, useEffect, type FormEvent } from 'react';
import { usePostStore } from '../../features/posts/usePostStore';
import { toast } from 'react-toastify';


const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Get createPost action from Zustand store
  const createPost = usePostStore(state => state.createPost);
  const resetPosts = usePostStore(state => state.reset);
  const isLoading = usePostStore(state => state.isLoading);
  const isError = usePostStore(state => state.isError);
  const isSuccess = usePostStore(state => state.isSuccess);
  const message = usePostStore(state => state.message);
  const actionType = usePostStore(state => state.actionType);
  

  const formOnSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!title.trim() && !description.trim()) {
      toast.error('Both Title and Description cannot be empty');
      return;
    }

    if (!title.trim()) {
      toast.error('Title cannot be empty');
      return;
    }
    if (!description.trim()) {
      toast.error('Description cannot be empty');
      return;
    }

    try {
      await createPost({ title: title.trim(), description: description.trim() })
      setTitle('')
      setDescription('')
    } catch {
      // Error is globally handled by Zustand (no need for extra catch handling here)
    }
  }

  useEffect(() => {
    if (isSuccess && actionType === 'create') {
      toast.success(message || 'Post created successfully!');
      resetPosts();
    }
    if (isError) {
      toast.error(message || 'Failed to create post');
      resetPosts();
    }
  }, [isSuccess, isError, message, actionType, resetPosts]);

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
                <button disabled={isLoading} className="create-post-form-button">
                  {isLoading ? 'Posting…' : 'Post'}
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