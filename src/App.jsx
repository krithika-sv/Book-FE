import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './common/Home'
import Contact from './common/Contact'
import Auth from './common/Auth'
import Books from './User/pages/Books'
import Profile from './User/pages/Profile'
import ViewBook from './User/pages/ViewBook'
import Pnf from './common/Pnf'
import PreLoader from './common/PreLoader'
import AdminDashboard from './admin/pages/admindashboard'
import AdminResources from './admin/pages/AdminResources'
import AdminSettings from './admin/pages/adminsettings'
import { ToastContainer } from 'react-toastify';
import Paymentsuccess from './User/pages/Paymentsuccess'
import PaymentError from './User/pages/PaymentError'
import { routeContext } from './contextshare/RouteGaurdContext'

function App() {

  const { role } = useContext(routeContext)

  const [isLoading, setIsLoading] = useState(true)
  setTimeout(() => {
    setIsLoading(false)
  }, 4000);

  return (
    <>
      <Routes>

        {/* common */}

        <Route path='/' element={isLoading ? <PreLoader /> : <Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister />} />

        {/* users */}
        {role == "user" && <>
          <Route path='/books' element={<Books />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/view/:id/book' element={<ViewBook />} />
          <Route path='/payment/success' element={<Paymentsuccess />} />
          <Route path='/payment/error' element={<PaymentError />} />

        </>}


        {/* admin */}

        {role == "admin" && <>
          <Route path='/admindashboard' element={<AdminDashboard />} />
          <Route path='/adminresources' element={<AdminResources />} />
          <Route path='/adminsettings' element={<AdminSettings />} />

        </>}


        {/* pnf */}

        <Route path='/*' element={<Pnf />} />

      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="light"

      />
    </>
  )
}

export default App
