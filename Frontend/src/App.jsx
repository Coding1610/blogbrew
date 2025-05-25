import React from 'react'
import './index.css'
import Layout from './layout/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RouteIndex, RouteProfile, RouteSignIn, RouteSignUp, RouteAddCate, RouteCateDetails, RouteEditCate } from './helpers/RouteName'
import Index from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import CateDeatils from './pages/Categories/CateDeatils'
import AddCate from './pages/Categories/AddCate'
import EditCate from './pages/Categories/EditCate'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path={RouteIndex} element={<Layout/>}>
              <Route element={<Index/>}/> {/* when you want to make any default page then set "index" to it*/}
              <Route path={RouteProfile} element={<Profile/>}/>
              <Route path={RouteAddCate} element={<AddCate/>}/>
              <Route path={RouteCateDetails} element={<CateDeatils/>}/>
              <Route path={RouteEditCate()} element={<EditCate/>}/>
            </Route>
            <Route path={RouteSignIn} element={<SignIn/>} />
            <Route path={RouteSignUp} element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}