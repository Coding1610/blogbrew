import React from 'react'
import { useFetch } from '@/hooks/useFtech'
import { getEnv } from '@/helpers/getEnv'
import { useParams } from 'react-router-dom';
import Loading from '@/components/Loading';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { decode } from 'entities';
import { marked } from 'marked';

export default function SingleBlogDetail() {

    const {blog} = useParams();

    const {data:blogData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
        method:'get',
        credentials:'include',
    });

    const htmlContent = marked.parse(decode(blogData?.blog?.blogContent || ""));

    if(loading) return <Loading/>

    return (
        <>
        <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto flex justify-between gap-12 mt-5 sm:mt-10'>
            {
            blogData && blogData.blog &&
            <>
            <div className='rounded w-[100%]'>
                <div>
                    <div className='flex items-center gap-4 mb-5 bg-gray-50 px-4 py-2 rounded-lg w-max'>
                        <Avatar>
                                <AvatarImage className='w-[40px] h-[40px] rounded-full' src={blogData.blog.author.avatar}/>
                        </Avatar>
                        <p className='font-medium text-[20px]'>{blogData.blog.author.name}</p>
                    </div>
                    <div className='flex flex-wrap w-full'>
                        <h1 className='mb-5 text-[25px] font-bold bg-darkRed text-white px-4 py-2 rounded-lg'>{blogData.blog.title}</h1>
                    </div>
                </div>
                <div className='mb-5'>
                    <img className='rounded-lg' src={blogData.blog.featureImage} alt="blog-cover-img" />
                </div>
                <div className='prose md:prose-lg max-w-none' dangerouslySetInnerHTML={{ __html: decode(htmlContent) }} />
            </div>
            </>
            }
            {/* <div className='border-2 rounded md:w-[30%]'>

            </div> */}
        </div>
        </>
    )
}