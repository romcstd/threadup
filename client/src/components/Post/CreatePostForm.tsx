import { useState, useEffect, type FormEvent } from 'react';
import { usePostStore } from '@/features/posts/usePostStore';
import { useAuthStore } from '@/features/auth/useAuthStore'
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const CreatePostForm = () => {
  const [content, setContent] = useState('');

  const user = useAuthStore(state => state.user);
  const createPost = usePostStore(state => state.createPost);
  const resetPosts = usePostStore(state => state.reset);
  const isLoading = usePostStore(state => state.isLoading);
  const isError = usePostStore(state => state.isError);
  const isSuccess = usePostStore(state => state.isSuccess);
  const message = usePostStore(state => state.message);
  const actionType = usePostStore(state => state.actionType);


  const formOnSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast.error('Content cannot be empty');
      return;
    }

    try {
      await createPost({ content: content.trim() })
      setContent('')
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
    <section className="max-w-2xl mx-auto px-4 py-6">
      <form className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" onSubmit={formOnSubmit}>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {typeof user === 'object' && user.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What's on your mind?"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              name="content"
            />
            <div className="flex justify-end space-x-2">
              <Button disabled={isLoading}>
                {isLoading ? 'Posting…' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default CreatePostForm;