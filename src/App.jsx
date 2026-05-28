import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/home'
import { fetchGuests } from './utils/supabase'

function App() {
  const [guests, setGuests] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)


  return (
    <>
      <Toaster />
      <Home />
    </>
  )
}

export default App
