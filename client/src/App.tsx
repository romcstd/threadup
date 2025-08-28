// App.tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SideBar } from './components/SideBar';
import { Home, Login, Register, Profile } from './pages';
import { useEffect } from "react";
import { useThemeStore } from "@/stores/useThemeStore"

function App() {
  
  const theme = useThemeStore(state => state.theme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <MainLayout />
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideSidebar = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="relative h-screen w-screen">
      {!hideSidebar && <SideBar />}
      <main className={`fixed top-0 bottom-0 ${hideSidebar ? 'left-0' : 'left-0 md:left-16'} right-0 z-0 overflow-y-auto`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;