import React from 'react'
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFtech';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { BiSolidMessage } from "react-icons/bi";

export default function CommentCount({props}) {

    const {data:count, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/${props.blogId}/comments-count`, {
        method:'get',
        credentials:'include'
    });

    return (
        <>
        <div className='flex gap-4  font-roboto font-medium text-[22px]'>

            <div className='gap-1 flex items-center justify-center ml-5'>
                <BiSolidMessage className='w-6 h-6'/>
                <p>{count?.commentCount !== 0 ? count?.commentCount : 0}</p>
            </div>

            <div className='gap-1 text-red-600 flex items-center justify-center'>
                <GoHeartFill className='w-6 h-6 cursor-pointer'/>
                <p>2</p>
            </div>
        
        </div>
        </>
    )
}