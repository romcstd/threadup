import { useEffect } from 'react';
import { useUserStore } from '@/features/users/useUserStore';
import { usePostStore } from '@/features/posts/usePostStore';
import UserPosts from './UserPosts';
import { Card } from '@/components/ui/card';

interface Props {
    username: string;
}

const UserProfile = ({ username }: Props) => {
    const { profile, getProfileByUsername } = useUserStore();
    const { posts, getPostsByUsername } = usePostStore();

    useEffect(() => {
        getProfileByUsername(username);
        getPostsByUsername(username);
    }, [username, getProfileByUsername, getPostsByUsername]);

    return (
        <section className="user-profile">
            <div className="user-profile-container max-w-2xl mx-auto p-4">
                <Card className="p-6 mb-6">
                    <h1 className="text-2xl font-bold text-primary">{profile?.name}</h1>
                    <p className="text-primary">{profile?.email}</p>
                </Card>

                <UserPosts posts={posts} isOwnProfile={false} />
            </div>
        </section>
    );
};

export default UserProfile;
