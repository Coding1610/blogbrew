import { useFetch } from '@/hooks/useFtech';
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading';
import { getEnv } from '@/helpers/getEnv';
import BlogCard from './BlogCard';
import { TriangleAlert } from 'lucide-react';
import { Grid2X2Check } from 'lucide-react';

export default function BlogByCategory() {
   
    const {category} = useParams();

    const {
        data: blogData,
        loading,
      } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`, {
        method: "get",
        credentials: "include",
      },[category]);

      if (loading) return <Loading />;
    
      return (
        <>
            <div className='w-full pl-5 pr-5 pb-5 sm:pl-20 sm:pr-20 font-roboto mb-6 flex flex-col items-center gap-6'>
                <div className='flex gap-2 items-center justify-center border-b-4 p-2'>
                    <Grid2X2Check className='text-darkRed md:w-7 md:h-7'/>
                    <h2 className='text-[20px] sm:text-[28px] font-medium text-darkRed'>{blogData && blogData.categoryData?.name}</h2>
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
      );
}