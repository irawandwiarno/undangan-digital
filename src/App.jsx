import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import HomePage from './pages/home/home'
import SutjiPage from './pages/sutji/sutji'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sutji" element={<SutjiPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
