import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFtech';
import Loading from './Loading';
import BlogCard from './BlogCard';
import { TriangleAlert } from 'lucide-react';
import { Search } from 'lucide-react';

export default function SearchResult(){

    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    
    const {
        data: blogData,
        loading,
      } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`, {
        method: "get",
        credentials: "include",
      },[q]);

      if(loading) return <Loading/>

    return (
        <>
        <div className='w-full pl-5 pr-5 pb-5 sm:pl-20 sm:pr-20 font-roboto mb-6 flex flex-col items-center gap-6'>
                <div className='flex gap-2 items-center justify-center border-b-4 p-2'>
                    <Search className='text-darkRed md:w-7 md:h-7'/>
                    <h2 className='text-[20px] sm:text-[28px] font-medium text-darkRed'>Seach result for : {q}</h2>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-5'>
                    {blogData && blogData.blog.length > 0 ? (
                    blogData.blog.map((blog) => <BlogCard key={blog._id} props={blog}/>)
                    ) : (
                    <>
                        <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                            <TriangleAlert size={20} />
                            <p className='font-medium'>blogs are not found</p>
                        </div>
                    </>
                    )}
                </div>
            </div>
        </>
    )
}
