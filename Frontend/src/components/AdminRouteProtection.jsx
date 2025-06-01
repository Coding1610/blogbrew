import React from 'react'
import { useSelector } from 'react-redux'
import { RouteSignIn } from '@/helpers/RouteName';
import { Outlet } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import logo from '../assets/blogbrew_icon.svg'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function AdminRouteProtection() {

    const user = useSelector((state) => state.user);

    if(user && user.isLoggedIn && user?.user?.role === 'Admin'){
        return (
            <Outlet/>
        )
    }
    else{
        return (
            <>
             <div className="flex flex-col items-center justify-center px-6 text-center font-roboto">
                <div className="animate-bounce mb-4">
                    <img src={logo} className='w-12 h-12'/>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in to explore</h2>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-darkRed to-midRed text-transparent bg-clip-text mb-3 pb-3">
                    BlogBrew
                </h1>
                {/* <Button asChild className="bg-darkRed hover:bg-midRed rounded-lg text-[16px] px-4 py-5">
                    <Link to={RouteSignIn} className="text-white font-roboto">
                    <LogIn className="text-white" />
                        Sign In
                    </Link>
                </Button> */}
            </div>
            </>
        )
    }
}