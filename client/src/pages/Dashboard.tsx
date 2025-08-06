import CreatePostForm from '../components/Post/CreatePostForm';
import GetPostData from '../components/Post/GetPostData';
import { useAuthStore } from '../features/auth/useAuthStore';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  return <>
    {user && <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>}
    <CreatePostForm />
    <GetPostData />
  </>;
};

export default Dashboard;