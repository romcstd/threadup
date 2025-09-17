import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { usePostStore } from '@/stores/posts/usePostStore';
import UserPosts from './UserPosts';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/Spinner';

const OwnProfile = () => {
    const user = useAuthStore(state => state.user);
    const postLoading = usePostStore(state => state.isLoading);
    const posts = usePostStore(state => state.posts);
    const fetchPosts = usePostStore(state => state.fetchPosts);
    const deletePost = usePostStore(state => state.deletePost);
    const resetPosts = usePostStore(state => state.reset);

    useEffect(() => {
        fetchPosts();
        return () => resetPosts();
    }, [fetchPosts, resetPosts]);

    if (postLoading) {
        return <Spinner />;
    }

    return (
        <section className="user-profile">
            <div className="user-profile-container max-w-2xl mx-auto p-4">
                <Card className="p-6 mb-6 gap-2">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center">
                            <span className='text-secondary font-semibold text-2xl'>{user?.name ? user?.name.charAt(0).toUpperCase() : 'U'}</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-primary">{user?.name}</h1>
                            <p className="text-primary">{user?.email}</p>
                        </div>
                    </div>
                </Card>

                <UserPosts
                    posts={posts}
                    isOwnProfile={true}
                    onDelete={deletePost}
                    postLoading={postLoading}
                />
            </div>
        </section>
    );
};

export default OwnProfile;
