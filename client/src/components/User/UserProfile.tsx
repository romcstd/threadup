import { useEffect } from 'react';
import { useUserStore } from '@/stores/users/useUserStore';
import { usePostStore } from '@/stores/posts/usePostStore';
import UserPosts from './UserPosts';
import { Card } from '@/components/ui/card';
import Spinner from '@/components/Spinner';

interface Props {
    username: string;
}

const UserProfile = ({ username }: Props) => {
    const { profile, getProfileByUsername } = useUserStore();
    const { isLoading, posts, getPostsByUsername } = usePostStore();

    useEffect(() => {
        getProfileByUsername(username);
        getPostsByUsername(username);
    }, [username, getProfileByUsername, getPostsByUsername]);

    if (isLoading) {
        return <Spinner />;
    }

    console.log('isLoading', isLoading);

    return (
        <section className="user-profile">
            <div className="user-profile-container max-w-2xl mx-auto p-4">
                <Card className="p-6 mb-6 gap-2">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center">
                            <div className='text-2xl'>{profile?.name ? profile?.name.charAt(0).toUpperCase() : 'U'}</div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-primary">{profile?.name}</h1>
                            <p className="text-primary">{profile?.username}</p>
                        </div>
                    </div>
                </Card>

                <UserPosts posts={posts} isOwnProfile={false} />
            </div>
        </section>
    );
};

export default UserProfile;
