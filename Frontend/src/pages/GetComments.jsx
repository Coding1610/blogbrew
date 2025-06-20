import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useFetch } from '@/hooks/useFtech'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { Trash, TriangleAlert} from 'lucide-react'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import moment from 'moment'
 
export default function GetComments() {

    const [refreshData, setRefreshData] = useState(false);

    const {data:commentData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-all-comments`, {
        method:'get',
        credentials:'include'
    },[refreshData]);

    const commentsArray = commentData?.allComments || [];

    const comments = [...commentsArray].reverse();

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`);
        if(response){
            setRefreshData(!refreshData);
            showToast('Success','Comment Deleted Successfully');
        }
        else{
            showToast('Error','Error while deleting comment');
        }
    };

    if(loading) return <Loading/>

    return (
        <>
        <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto mt-5'>
                <h1 className="font-roboto font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max ml-5">All Comments</h1>
                <Card className='mx-4 px-2 pt-2'>
                    <Table>
                        <TableHeader className="text-darkRed">
                            <TableRow className="bg-gray-50 text-nowrap text-darkRed text-[15px]">
                                <TableHead className="text-darkRed text-[15px]">Blog</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Comment</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Comment By</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Date</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {commentData && commentData?.allComments.length > 0 ?  
                            
                            comments.map(c => 
                                <>
                                <TableRow key={c._id} className="text-nowrap">
                                    <TableCell>{c.blogId?.title}</TableCell>
                                    <TableCell>{c?.comment}</TableCell>
                                    <TableCell>{c?.author?.name}</TableCell>
                                    <TableCell>{moment(c?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell className="flex gap-2 items-center">
                                        <Button onClick={() => handleDelete(c._id)} className="rounded-full px-2.5 bg-white  border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
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
                                            <p className='font-medium'>comments are not found</p>
                                        </div>   
                                    </TableCell>
                                </TableRow>
                            </>
                            }
                        </TableBody>
                    </Table>
            </Card>
        </div>
        </>
    )
}