import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { RouteIndex } from '@/helpers/RouteName'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
    <div className="font-roboto flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-7xl font-extrabold text-gray-800 mb-4 animate-bounce">OOPS!</h1>
      <h2 className="text-4xl text-red-600 font-semibold mb-2">404 - Not Found</h2>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        The page you’re looking for doesn’t exist or was moved. Let’s get you back to BlogBrew!
      </p>
      <Button asChild className="bg-darkRed hover:bg-midRed rounded-lg">
                    <Link to={RouteIndex} className="text-white font-roboto">
                    <Home className="text-white" />
                        Go To Home
                    </Link>
                </Button>
    </div>
    </>
  )
}