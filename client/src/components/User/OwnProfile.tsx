import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/useAuthStore';
import { usePostStore } from '@/features/posts/usePostStore';
import UserPosts from './UserPosts';
import { Card } from '@/components/ui/card';

const OwnProfile = () => {
    const user = useAuthStore(state => state.user);
    const posts = usePostStore(state => state.posts);
    const fetchPosts = usePostStore(state => state.fetchPosts);
    const deletePost = usePostStore(state => state.deletePost);
    const resetPosts = usePostStore(state => state.reset);

    useEffect(() => {
        fetchPosts();
        return () => resetPosts();
    }, [fetchPosts, resetPosts]);

    return (
        <section className="user-profile">
            <div className="user-profile-container max-w-2xl mx-auto p-4">
                <Card className="p-6 mb-6">
                    <h1 className="text-2xl font-bold text-primary">{user?.name}</h1>
                    <p className="text-primary">{user?.email}</p>
                </Card>

                <UserPosts
                    posts={posts}
                    isOwnProfile={true}
                    user={user}
                    onDelete={deletePost}
                />
            </div>
        </section>
    );
};

export default OwnProfile;
