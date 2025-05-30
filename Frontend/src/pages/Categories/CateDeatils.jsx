import React, { useState } from 'react'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RouteAddCate, RouteEditCate } from '@/helpers/RouteName'
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
import { TriangleAlert, Trash, FilePenLine } from 'lucide-react'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
 
export default function CateDeatils() {
     
    const [refreshData, setRefreshData] = useState(false);

    const {data:categoryData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/show-all`, {
        method:'get',
        credentials:'include'
    },[refreshData]);

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/category/delete/${id}`);
        if(response){
            setRefreshData(!refreshData);
            showToast('Success','Category Deleted Successfully');
        }
        else{
            showToast('Error','Error while deleting data');
        }
    };

    if(loading) return <Loading/>

    return (
        <>
        <div className='w-full pl-5 pr-5 pb-5 sm:pl-20 sm:pr-20 font-roboto'>
            <Card className='border-none shadow-none'>
                <CardHeader>
                    <Button className="bg-darkRed hover:bg-midRed rounded-lg w-[130px] sm:w-[200px]">
                        <Link to={RouteAddCate} className='font-roboto flex justify-center items-center gap-2'>
                            <ShoppingCart />
                            Add Category
                        </Link>
                    </Button>
                </CardHeader>
                <Card className="mx-4 px-2 pt-2">
                    <Table>
                        <TableHeader className="text-darkRed">
                            <TableRow className="bg-gray-50 text-nowrap">
                                <TableHead className="text-darkRed text-[15px]">Category</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Slug</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categoryData && categoryData.length > 0 ?  
                            
                            categoryData.map(category => 
                                <>
                                <TableRow key={category._id} className="text-nowrap">
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell className="flex gap-2 items-center">
                                        <Button className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                                            <Link to={RouteEditCate(category._id)} >    
                                                <FilePenLine size={16}/>
                                            </Link>
                                        </Button>
                                        <Button onClick={() => handleDelete(category._id)} className="rounded-full px-2.5 bg-white  border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
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
                                    <TableCell colSpan={3} className='text-center'>
                                        <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                                            <TriangleAlert size={20} />
                                            <p className='font-medium'>categories are not found</p>
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
}