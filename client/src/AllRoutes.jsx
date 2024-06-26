import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import LoginHistory from './pages/UserProfile/LoginHistory'
import RestrictedAccess from './components/RestrictedAccess/RestrictedAccess'
import useMobileRestriction from './hooks/useMobileRestriction'
import VerifyEmail from './pages/LanguageAuthentication/VerifyEmail'
import VerifyPhone from './pages/LanguageAuthentication/VerifyPhone'

const AllRoutes = () => {
    const isMobileRestricted = useMobileRestriction();
    if (isMobileRestricted) {
      return <RestrictedAccess />
    }
    return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Auth' element={<Auth />} />
        <Route path='/Questions' element={<Questions />} />
        <Route path='/AskQuestion'  element={<AskQuestion />} />
        <Route path='/Questions/:id' element={<DisplayQuestion />} />
        <Route path='/Tags' element={<Tags />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/Users/:id' element={<UserProfile />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
        <Route path='/Users/login-history/:id' element={<LoginHistory />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/verify-phone' element={<VerifyPhone />} />
      
    </Routes>
    )
}

export default AllRoutes
