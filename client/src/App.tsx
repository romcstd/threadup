import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Header from './components/Header/Header';
import { SideBar } from './components/side-bar';
import { Home, Login, Register, Dashboard } from './pages';

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <main className="main">
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
      <ToastContainer 
        position="bottom-right"
      />
    </>
  )
}

export default App
