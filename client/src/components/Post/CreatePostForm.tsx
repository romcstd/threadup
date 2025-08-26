import { useState, useEffect, type FormEvent } from 'react';
import { usePostStore } from '@/stores/posts/usePostStore';
import { useAuthStore } from '@/stores/auth/useAuthStore'
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { isUserPopulated } from '@/stores/posts/postUtils';
import { Plus } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [createNewPost, setNewCreatePost] = useState(false);

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
      // Error is globally handled by Zustand
    }
  }

  useEffect(() => {
    if (isSuccess && actionType === 'create') {
      toast.success(message || 'Post created successfully!');
      resetPosts();
      setNewCreatePost(false);
    }
    if (isError) {
      toast.error(message || 'Failed to create post');
      resetPosts();
    }
  }, [isSuccess, isError, message, actionType, resetPosts]);

  return (
    <section className="max-w-2xl mx-auto px-4 py-6">
      <form className="" onSubmit={formOnSubmit}>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
                <span className="text-secondary font-semibold text-sm">
                  {isUserPopulated(user) ? (
                    user.name ? user.name.charAt(0).toUpperCase() : 'U'
                  ) : (
                    'U'
                  )}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-primary">
                  {typeof user === 'object' && user.name}
                </h3>
              </div>
            </div>
          </CardHeader>
          {createNewPost ? (
            <>
              <CardContent className="p-4">
                <textarea
                  rows={4}
                  className="w-full p-3 border rounded-lg resize-none"
                  placeholder="What's on your mind?"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  name="content"
                />
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setNewCreatePost(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Posting…' : 'Post'}
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardContent className="text-center space-y-4">
                <h3 className="text-xl font-medium">
                  What's on your mind?
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Share your thoughts and ideas with the community!
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button type="button" size="lg" className="cursor-pointer" onClick={() => setNewCreatePost(true)}>
                  <Plus /> Create New Post
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </form>
    </section>
  )
}

export default CreatePostForm;