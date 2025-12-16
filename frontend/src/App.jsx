import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar.jsx'
function App() {


  return (
    <div className='bg-[var(--primary-950)] min-h-screen'>
 <Navbar/>
<AppRoutes/>
    </div>
  )
}

export default App
