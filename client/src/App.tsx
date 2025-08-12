import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Header from './components/Header/Header';
import { SideBar } from './components/side-bar';
import { Home, Login, Register, Dashboard } from './pages';

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout />
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideSidebar = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="relative h-screen w-screen">
      {!hideSidebar && <SideBar />}
      {/* <Header /> */}
      <main className={`fixed top-0 bottom-0 ${hideSidebar ? 'left-0' : 'left-0 md:left-16'} right-0 bg-secondary z-0 overflow-y-auto ${!hideSidebar ? 'max-w-5xl mx-auto' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}


export default App
