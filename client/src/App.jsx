import React, { useContext } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import { AppContext } from './context/AppContext'
import RecruiterLogin from './components/RecruiterLogin'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import Managejobs from './pages/Managejobs'
import Viewapplication from './pages/Viewapplication'
import 'quill/dist/quill.snow.css'

const App = () => {
  const { showrecruiterlogin } = useContext(AppContext)
  
  return (
    <div>
      {showrecruiterlogin && <RecruiterLogin />}
      <Routes>
        {/* Top-level Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />

        {/* Nested Dashboard Routes */}
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='add-jobs' element={<AddJob />} />
          <Route path='manage-jobs' element={<Managejobs />} />
          <Route path='view-applications' element={<Viewapplication />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
