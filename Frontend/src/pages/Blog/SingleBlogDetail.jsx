import React from 'react'
import { useFetch } from '@/hooks/useFtech'
import { getEnv } from '@/helpers/getEnv'
import { useParams } from 'react-router-dom';
import Loading from '@/components/Loading';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { decode } from 'entities';
import { marked } from 'marked';
import Comment from '@/components/Comment';
import moment from 'moment';
import { CalendarFold } from 'lucide-react';
import CommentCount from '@/components/CommentCount';
import LikeCount from '@/components/LikeCount';
import RelatedBlog from '@/components/RelatedBlog';
import DOMPurify from 'dompurify'

export default function SingleBlogDetail() {

    const {blog} = useParams();

    const {data:blogData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog/${blog}`, {
        method:'get',
        credentials:'include',
    },[blog]);

    const categoryid = blogData?.blog?.category?._id;
    const categorySlug = blogData?.blog?.category.slug;
    const blogid = blogData?.blog?._id;

    const htmlContent = DOMPurify.sanitize(marked.parse(decode(blogData?.blog?.blogContent || "")));

    if(loading) return <Loading/>

    return (
        <>
        <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto flex flex-col lg:flex-row justify-between gap-12 mt-5 sm:mt-9'>
            {
            blogData && blogData.blog &&
            <>
            <div className='rounded w-[100%] lg:max-w-[70%]'>
                <div>
                    <div className='flex items-center gap-4 mb-5 bg-gray-50 px-4 py-2 rounded-lg w-max'>
                        <Avatar>
                                <AvatarImage className='w-[40px] h-[40px] rounded-full' src={blogData?.blog?.author?.avatar ? blogData?.blog?.author?.avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${blogData?.blog?.author?.name}%20`}/>
                        </Avatar>
                        <div >
                            <p className='font-medium text-[17px]'>{blogData.blog.author.name}</p>
                            <p className='text-gray-400 flex items-center gap-1'>  <CalendarFold size={18}/> {moment(blogData?.blog?.createdAt).format('DD-MM-YYYY')}</p>
                        </div>
                    </div>
                    <div className='flex flex-wrap w-full gap-3 mb-5'>
                        <h1 className='text-[25px] font-bold bg-darkRed text-white px-4 py-2 rounded-lg'>{blogData.blog.title}</h1>
                        <CommentCount props={{blogId:blogData?.blog?._id}} />
                        <LikeCount props={{blogId:blogData?.blog?._id}}/>
                    </div>
                </div>
                <div className='mb-5'>
                    <img className='rounded-lg' src={blogData.blog.featureImage} alt="blog-cover-img" />
                </div>
                <div className='prose md:prose-lg max-w-none mt-10 mb-10 sm:mb-14' dangerouslySetInnerHTML={{ __html: decode(htmlContent) }} />
                <div>
                    <Comment props={{blogId:blogData?.blog?._id}} />
                </div>
            </div>
            </>
            }
            <div className='border-2 rounded-md max-w-full lg:min-w-[35%] h-max px-2 py-4'>
                <RelatedBlog props={{category:categoryid,blog:blogid,cateSlug:categorySlug}}/>
            </div>
        </div>
        </>
    )
}