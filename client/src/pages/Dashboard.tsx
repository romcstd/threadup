import CreatePostForm from '../components/Post/CreatePostForm'
import GetPostData from '../components/Post/GetPostData'

const Dashboard = () => {
  return <>
    <h2>Dashboard Page</h2>
    <CreatePostForm />
    <GetPostData />
  </>;
};

export default Dashboard;