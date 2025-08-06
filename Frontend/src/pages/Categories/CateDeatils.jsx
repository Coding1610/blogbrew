import React, { useState } from 'react'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, TriangleAlert, Trash, FilePenLine } from 'lucide-react'
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
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

export default function CateDeatils() {

    const [refreshData, setRefreshData] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [confirmText, setConfirmText] = useState('');

    const { data: categoryData, loading } = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/show-all`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData]);

    const confirmDelete = async () => {
        if (confirmText !== selectedCategory?.name) {
            showToast('Error', 'Category name does not match');
            return;
        }

        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/category/delete/${selectedCategory._id}`);
        if (response) {
            setRefreshData(!refreshData);
            showToast('Success', 'Category Deleted Successfully');
        } else {
            showToast('Error', 'Error while deleting data');
        }

        setOpenDialog(false);
        setConfirmText('');
        setSelectedCategory(null);
    };

    if (loading) return <Loading />

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
                                        <TableRow key={category._id} className="text-nowrap">
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell>{category.slug}</TableCell>
                                            <TableCell className="flex gap-2 items-center">
                                                <Button className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                                                    <Link to={RouteEditCate(category._id)} >
                                                        <FilePenLine size={16} />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setOpenDialog(true);
                                                    }}
                                                    className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white"
                                                >
                                                    <Trash size={16} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                    :
                                    <TableRow>
                                        <TableCell colSpan={3} className='text-center'>
                                            <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                                                <TriangleAlert size={20} />
                                                <p className='font-medium'>categories are not found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Card>
                </Card>
            </div>

            {/* Delete Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md font-roboto">
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            To confirm deletion, please type the name of the category : <strong>{selectedCategory?.name}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        className="font-roboto font-medium h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50 placeholder:text-gray-500/75"
                        placeholder="Type category name to confirm"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                    />
                    <DialogFooter className="flex justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => {
                                setOpenDialog(false);
                                setConfirmText('');
                            }}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={confirmDelete}
                        >
                            Yes, Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}