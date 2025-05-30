import React from 'react'
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFtech';
import { TriangleAlert } from 'lucide-react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';

export default function RelatedBlog({props}) {

    const currentBlogId = props.blog;

    const {data:relatedBlogData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/related-blog/${props.category}`, {
        method:'get',
        credentials:'include',
    });

    // filter blogs
    const filteredBlogs = relatedBlogData?.blog?.filter(blog => blog._id !== currentBlogId);

    if(loading) return <Loading/>

    return (
        <div className='font-roboto flex flex-col justify-center items-center'>
            <div className='flex items-center justify-center'>
                <h1 className='font-bold text-2xl'>Related Blogs</h1>
            </div>

            {filteredBlogs && filteredBlogs.length > 0 ? (
                <div className='flex flex-col gap-4 mt-4'>
                    {filteredBlogs.map(blog => (
                        <Link key={blog._id} to={RouteBlogDetails(props.cateSlug, blog?.slug)} >
                        <div className='cursor-pointer flex gap-3 items-center bg-gray-50 rounded-md p-3'>
                            <img src={blog.featureImage} alt="blog-cover" className='w-[120px] h-[75px] object-cover rounded-md' />
                            <p className='font-medium text-[16px]'>{blog.title}</p>
                        </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                    <TriangleAlert size={20} />
                    <p className='font-medium'>no related blogs</p>
                </div>
            )}
        </div>
    );
}