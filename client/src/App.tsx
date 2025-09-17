// App.tsx
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SideBar } from './components/SideBar';
import { Home, Login, Register, Profile, PageNotFound, UserNotFound } from './pages';
import { useEffect } from "react";
import { useThemeStore } from "@/stores/useThemeStore";

function App() {

  const theme = useThemeStore(state => state.theme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>

        {/* Routes with Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:username" element={<Profile />} />
        </Route>

        {/* Routes without Sidebar */}
        <Route element={<NoSidebarLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/user-not-found" element={<UserNotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

function MainLayout() {
  return (
    <div className="relative min-h-screen">
      <SideBar />
      <main className="fixed top-0 bottom-0 left-0 md:left-16 right-0 z-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function NoSidebarLayout() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default App;