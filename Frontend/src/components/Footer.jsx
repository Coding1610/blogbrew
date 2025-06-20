import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
    <div className='text-[13px] md:text-[14px] w-full flex justify-center font-roboto text-gray-700 mb-4'> © Copyright 2025 | Designed & Developed By<Link to={'https://github.com/Coding1610'} className='pl-1 font-semibold text-darkRed'> Yash Prajapati</Link> </div>
    </>
  )
}