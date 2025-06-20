import AppSidebar from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>  
    <SidebarProvider>
        <Navbar/>
        <AppSidebar/>
        <main className='w-full'>
            <div className='w-full min-h-[calc(100vh-35px)] pt-[70px] flex justify-center items-center'>
                <Outlet/>
            </div>
            <Footer/>
        </main>
    </SidebarProvider>
    </>
  )
}