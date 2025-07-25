import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, Register, Dashboard } from './pages';
import Header from './components/Header/Header';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
