import './index.css'
import React from 'react'
import Layout from './layout/Layout'

import Index from './pages/Index'
import Profile from './pages/Profile'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

import CateDeatils from './pages/Categories/CateDeatils'
import AddCate from './pages/Categories/AddCate'
import EditCate from './pages/Categories/EditCate'

import AddBlog from './pages/Blog/AddBlog'
import EditBlog from './pages/Blog/EditBlog'
import BlogDeatils from './pages/Blog/BlogDeatils'
import SingleBlogDetail from './pages/Blog/SingleBlogDetail'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RouteBlogDetails, RouteBlog, RouteBlogAdd, RouteBlogEdit, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp, RouteAddCate, RouteCateDetails, RouteEditCate, RouteBlogByCategory, RouteSearch, RouteGetComments, RouteGetAllUsers, RouteGetMyBlogs, RouteMyBlogsComments, RouteCommentsByMe } from './helpers/RouteName'
import BlogByCategory from './components/BlogByCategory'
import SearchResult from './components/SearchResult'
import GetComments from './pages/GetComments'
import GetAllUsers from './pages/GetAllUsers'
import GetMyBlogs from './pages/Blog/GetMyBlogs'
import MyBlogsComments from './pages/Comment/MyBlogsComments'
import CommentsByMe from './pages/Comment/CommentsByMe'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path={RouteIndex} element={<Layout/>}>

              {/* Home Page Route */}
              <Route path={RouteIndex} element={<Index/>}/> {/* when you want to make any default page then set "index" to it*/}
              
              {/* User Profile Route */}
              <Route path={RouteProfile} element={<Profile/>}/>

              {/* Category Routes */}
              <Route path={RouteAddCate} element={<AddCate/>}/>
              <Route path={RouteCateDetails} element={<CateDeatils/>}/>
              <Route path={RouteEditCate()} element={<EditCate/>}/>

              {/* Blog Routes */}
              <Route path={RouteBlog} element={<BlogDeatils/>}/>
              <Route path={RouteBlogAdd} element={<AddBlog/>}/>
              <Route path={RouteBlogEdit()} element={<EditBlog/>}/>
              <Route path={RouteBlogDetails()} element={<SingleBlogDetail/>}/>
              <Route path={RouteBlogByCategory()} element={<BlogByCategory/>}/>
              <Route path={RouteSearch()} element={<SearchResult/>} />

              <Route path={RouteGetComments} element={<GetComments/>}/>
              <Route path={RouteGetAllUsers} element={<GetAllUsers/>}/>

              <Route path={RouteGetMyBlogs} element={<GetMyBlogs/>} />
              <Route path={RouteMyBlogsComments} element={<MyBlogsComments/>} />
              <Route path={RouteCommentsByMe} element={<CommentsByMe/>} />

            </Route>

            {/* Authentication Routes */}
            <Route path={RouteSignIn} element={<SignIn/>} />
            <Route path={RouteSignUp} element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}