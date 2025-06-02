import React, { useEffect, useState } from 'react'
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFtech';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useSelector } from 'react-redux';
import { showToast } from '@/helpers/showToast';

export default function LikeCount({props}) {

    const [likecount,setlikecount] = useState(null);
    const [hasLiked,setHasLiked] = useState(false);

    const user = useSelector((state) => state.user);
    const author = user?.user?._id;

    const {data:totalCount} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/likes/${props.blogId}`, {
        method:'get',
        credentials:'include'
    });

    const TotalLikes = totalCount?.Likes;

    const {data:count, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/${props.blogId}/likes-count/${user && user.isLoggedIn ? author : ''}`, {
        method:'get',
        credentials:'include'
    });

    useEffect(() => {
        if(count){
            setlikecount(count.Likes);
            setHasLiked(count.userLiked);
        }
    },[count]);

    const handleLike = async () => {
        try{
            if(!user.isLoggedIn){
                return showToast('Error', 'Please Login into your account');
            }
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/like/add`, {
                method:'post',
                credentials:'include',
                headers:{'Content-type':"application/json"},
                body: JSON.stringify({author:user?.user?._id, blogId:props.blogId})
            });

            if(!response.ok){
                showToast('Error',response.statusText);
            }

            const responseData = await response.json();
            setlikecount(responseData.likeCount);
            setHasLiked(!hasLiked);

        } catch(error){
            showToast('Error',error.message);
        }
    };

    return (
        <>
        <div className='flex gap-4 font-roboto font-medium text-[21px]'>

            {user && user.isLoggedIn
                ?
                (user.user.role === 'User' ?
                    <>
                    <div onClick={handleLike} className='gap-1 text-red-600 flex items-center justify-center'>
                    {hasLiked 
                        ?
                        <GoHeartFill className='text-red-600 w-5 h-5 cursor-pointer'/>
                        :
                        <GoHeart className='text-red-600 w-5 h-5 cursor-pointer'/>
                    }
                    <p>{likecount}</p>
                    </div>
                    </>
                    :
                    <>
                    <div className='gap-1 text-red-600 flex items-center justify-center'>
                        <GoHeartFill className='text-red-600 w-5 h-5'/>
                        <p>{likecount}</p>
                    </div>
                    </>
                )
                :
                (
                    <>
                    <div onClick={handleLike} className='gap-1 text-red-600 flex items-center justify-center'>
                    {hasLiked 
                        ?
                        <GoHeartFill className='text-red-600 w-5 h-5 cursor-pointer'/>
                        :
                        <GoHeart className='text-red-600 w-5 h-5 cursor-pointer'/>
                    }
                    <p>{TotalLikes}</p>
                    </div>
                    </>
                )
        
            }

        </div>
        </>
    )
}
