import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { CalendarArrowUp } from 'lucide-react';
import moment from 'moment';
import ReactParallaxTilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';

export default function BlogCard({props}) {

    const username = props?.author?.name;

    return (
        <>  
        <ReactParallaxTilt scale={0.95}>
            <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
            <Card className="font-roboto w-[350px] h-[400px] pt-5 cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                <CardContent>
                    <div className='flex items-center justify-between mb-5'>
                        <div className='flex justify-between items-center gap-3'>
                            <Avatar>
                                <AvatarImage className='w-[50px] h-[50px] rounded-full' src={props.author?.avatar ? props.author.avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${username}%20`} />  
                            </Avatar>
                            <p>{props.author?.name}</p>
                        </div>
                        {props?.author?.role === 'Admin' ?
                        <Badge className='ring-1 hover:ring-2 ring-midRed bg-gray-50 text-midRed hover:bg-gray-50 text-center'>
                            Admin
                        </Badge>                            
                        :
                        <>
                        <Badge className='ring-1 hover:ring-2 ring-midRed bg-gray-50 text-midRed hover:bg-gray-50 text-center'>
                            User
                        </Badge>   
                        </>
                        }
                    </div>
                    <div className='object-cover mb-5'>
                        <img src={props.featureImage} className='rounded-md'/>
                    </div>
                    <div className=''>
                        <p className='flex gap-2 items-center text-darkRed font-medium'> <CalendarArrowUp size={20} className='text-darkRed'/>{moment(props?.createdAt).format('DD-MM-YYYY')}</p>
                        <p className='font-bold text-[25px]'>{props?.title}</p>
                    </div>
                </CardContent>
            </Card>
            </Link>
            </ReactParallaxTilt>
        </>
    )
}