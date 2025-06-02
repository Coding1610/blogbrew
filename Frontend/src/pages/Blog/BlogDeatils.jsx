import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Rss } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader } from '@/components/ui/card'
import { RouteBlogAdd } from '@/helpers/RouteName'
import { useState } from 'react'
import { useFetch } from '@/hooks/useFtech'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { Ban,Trash } from 'lucide-react'
import moment from 'moment'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import { useSelector } from 'react-redux'

export default function BlogDeatils(){

    const user = useSelector((state) => state.user);

    const [refreshData, setRefreshData] = useState(false);

    const {data:blogData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/show-all`, {
        method:'get',
        credentials:'include'
    },[refreshData]);
    
    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`);
        if(response){
            setRefreshData(!refreshData);
            showToast('Success','Deleted Successfully');
        }
        else{
            showToast('Error','Error while deleting blog');
        }
    };

    if(loading) return <Loading/>

    return (
        <>
        <div className='w-full pl-5 pr-5 pb-5 sm:pl-15 sm:pr-15 font-roboto'>
            <Card className='border-none shadow-none'>
                <CardHeader>
                    {user?.user?.role === 'User' 
                    ?
                    <>
                    <Button className="bg-darkRed hover:bg-midRed rounded-lg w-[130px] sm:w-[130px]">
                        <Link to={RouteBlogAdd} className='font-roboto flex justify-center items-center gap-2'>
                            <Rss />
                            Add Blog
                        </Link>
                    </Button>
                    </>
                    :
                    <>
                    </>
                    }
                </CardHeader>
                <Card className="mx-4 px-2 pt-2">
                    <Table>
                        <TableHeader className="text-darkRed">
                            <TableRow className="text-nowrap">
                                <TableHead className="text-darkRed text-[15px]">Author</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Category Name</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Title</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Slug</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Dated</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogData && blogData.blog.length > 0 ?  
                            
                            blogData.blog.map(blog => 
                                <>
                                <TableRow key={blog?._id} className="text-nowrap">
                                    <TableCell>{blog?.author?.name}</TableCell>
                                    <TableCell>{blog?.category?.name}</TableCell>
                                    <TableCell>{blog?.title}</TableCell>
                                    <TableCell>{blog?.slug}</TableCell>
                                    <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell className="flex gap-2 items-center">
                                        <Button onClick={ () => handleDelete(blog._id)} className="rounded-full px-2.5 bg-white  border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                                            <Link>
                                                <Trash size={16}/>
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                </>    
                            )
                            :
                            <>
                                <TableRow>
                                    <TableCell className='text-center'>
                                        <p className='flex justify-center mt-2 text-red-600 font-medium items-center gap-2'> <Ban size={18}/> No Blogs are Found</p>
                                    </TableCell>
                                </TableRow>
                            </>
                            }
                        </TableBody>
                    </Table>
                </Card>
            </Card>
        </div>
        </>
    )
}