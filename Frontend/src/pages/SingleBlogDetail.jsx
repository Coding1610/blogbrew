import React from 'react'
import { useFetch } from '@/hooks/useFtech'
import { getEnv } from '@/helpers/getEnv'
import { useParams } from 'react-router-dom';

export default function SingleBlogDetail() {

    const {blog} = useParams();

    const {data:blogData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
        method:'get',
        credentials:'include',
    });

    console.log(blogData);

    return (
        <>
        <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto flex justify-between gap-12 mt-5 sm:mt-20'>
            <div className='border-2 rounded w-[70%]'>
                <h1></h1>
            </div>
            <div className='border-2 rounded w-[30%]'>

            </div>
        </div>
        </>
    )
}