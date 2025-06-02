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
import { RouteBlogAdd, RouteBlogDetails, RouteBlogEdit, RouteSignIn } from '@/helpers/RouteName'
import { useState } from 'react'
import { useFetch } from '@/hooks/useFtech'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { TriangleAlert,Trash, Eye, FilePenLine } from 'lucide-react'
import moment from 'moment'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import { useSelector } from 'react-redux'

export default function GetMyBlogs() {

    const user = useSelector((state) => state.user);

    const [refreshData, setRefreshData] = useState(false);

    const {data:blogData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-my-blogs/${user?.user?._id}`, {
        method:'get',
        credentials:'include'
    },[refreshData]);
    
    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`);
        if(response){
            showToast('Success','Deleted Successfully');
            setRefreshData(!refreshData);
        }
        else{
            showToast('Error','Error while deleting blog');
        }
    };

    if(loading) return <Loading/>

    if(user && user.isLoggedIn){

        return (
            <>
            <div className='w-full pl-5 pr-5 pb-5 sm:pl-15 sm:pr-15 font-roboto'>
                <Card className='border-none shadow-none'>
                    <CardHeader>
                        <Button className="bg-darkRed hover:bg-midRed rounded-lg w-[130px] sm:w-[130px]">
                            <Link to={RouteBlogAdd} className='font-roboto flex justify-center items-center gap-2'>
                                <Rss />
                                Add Blog
                            </Link>
                        </Button>
                    </CardHeader>
                    <Card className="mx-4 px-2 pt-2">
                        <Table>
                            <TableHeader className="text-darkRed">
                                <TableRow className="text-nowrap">
                                    <TableHead className="text-darkRed text-[15px]">Title</TableHead>
                                    <TableHead className="text-darkRed text-[15px]">Category Name</TableHead>
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
                                        <TableCell>{blog?.title}</TableCell>
                                        <TableCell>{blog?.category?.name}</TableCell>
                                        <TableCell>{blog?.slug}</TableCell>
                                        <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell className="flex gap-2 items-center">
                                            <Button className="rounded-full px-2.5 bg-white  border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                                                <Link to={RouteBlogDetails(blog?.category?.slug,blog?.slug)}>
                                                    <Eye size={16}/>
                                                </Link>
                                            </Button>
                                            <Button className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                                                <Link to={RouteBlogEdit(blog._id)} >    
                                                    <FilePenLine size={16}/>
                                                </Link>
                                            </Button>
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
                                    <TableCell colSpan={5}>
                                        <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                                            <TriangleAlert size={20} />
                                            <p className='font-medium'>you haven't created any blog yet</p>
                                        </div>   
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

    } else{
        return (
            <p className='flex text-[18px] justify-center text-red-600 font-medium items-center gap-2'> <Link to={RouteSignIn} className='hover:border-b-2 border-red-600'>sign-in</Link>to see your blogs</p>
        )
    }

}