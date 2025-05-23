import React from 'react';
import loading from '../assets/loading.gif';

export default function Loading() {
  return (
    <>
    <div className='w-full h-full flex justify-center items-center'>
        <img className='w-10 h-10' src={loading} alt="loading..." />
    </div>
    </>
  )
}