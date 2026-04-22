import React from 'react';
import {Routes, Route} from "react-router";


import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FeaturePage from './pages/FeaturePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  return (
    <div className='relative h-full w-full'>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/about' element={<AboutPage/>}></Route>
        <Route path='/features' element={<FeaturePage/>}></Route>
        <Route path='/contact' element={<ContactPage/>}></Route>
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
        <Route path='/community' element={<ProtectedRoute><UserPage/></ProtectedRoute>}></Route>
      </Routes>
    </div>
  )
}

export default App
