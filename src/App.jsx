import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import HomePage from './pages/home/home'
import SutjiPage from './pages/sutji/sutji'
import Dino from './pages/dino/dino'
import GuestLinkGenerator from './pages/link-generator/link-gen'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sutji" element={<SutjiPage />} />
        <Route path="/dino-helen" element={<Dino />} />
        <Route path="/gen/:slug" element={<GuestLinkGenerator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
