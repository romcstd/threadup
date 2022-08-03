import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header, Footer } from './components/utilities/Utilities'
import { Home, Login, Register, Dashboard } from './pages/Pages'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App