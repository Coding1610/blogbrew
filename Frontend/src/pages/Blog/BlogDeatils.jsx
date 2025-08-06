import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Rss, Ban, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader } from '@/components/ui/card'
import { RouteBlogAdd } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFtech'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import moment from 'moment'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import { useSelector } from 'react-redux'

// Dialog and Input components from shadcn
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function BlogDeatils() {

    const user = useSelector((state) => state.user);

    const [refreshData, setRefreshData] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [confirmText, setConfirmText] = useState('');

    const { data: blogData, loading } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/show-all`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData]);

    const confirmDelete = async () => {
        if (confirmText !== selectedBlog?.title) {
            showToast('Error', 'Blog title does not match');
            return;
        }

        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${selectedBlog._id}`);
        if (response) {
            setRefreshData(!refreshData);
            showToast('Success', 'Deleted Successfully');
        } else {
            showToast('Error', 'Error while deleting blog');
        }

        setOpenDialog(false);
        setConfirmText('');
        setSelectedBlog(null);
    };

    if (loading) return <Loading />

    return (
        <>
            <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto mt-5'>

                {user?.user?.role === 'User' &&
                    <Card className='border-none shadow-none'>
                        <CardHeader>
                            <Button className="bg-darkRed hover:bg-midRed rounded-lg w-[130px] sm:w-[130px]">
                                <Link to={RouteBlogAdd} className='font-roboto flex justify-center items-center gap-2'>
                                    <Rss />
                                    Add Blog
                                </Link>
                            </Button>
                        </CardHeader>
                    </Card>
                }

                <h1 className="font-roboto font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max ml-5">All Blogs</h1>
                <Card className="mx-4 px-2 pt-2">
                    <Table>
                        <TableHeader className="text-darkRed bg-gray-50">
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
                                    <TableRow key={blog?._id} className="text-nowrap">
                                        <TableCell>{blog?.author?.name}</TableCell>
                                        <TableCell>{blog?.category?.name}</TableCell>
                                        <TableCell>{blog?.title}</TableCell>
                                        <TableCell>{blog?.slug}</TableCell>
                                        <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell className="flex gap-2 items-center">
                                            <Button
                                                onClick={() => {
                                                    setSelectedBlog(blog);
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
                                    <TableCell colSpan={6} className='text-center'>
                                        <p className='flex justify-center mt-2 text-red-600 font-medium items-center gap-2'>
                                            <Ban size={18} /> No Blogs are Found
                                        </p>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Delete Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md font-roboto">
                    <DialogHeader>
                        <DialogTitle>Delete Blog</DialogTitle>
                        <DialogDescription>
                            To confirm deletion, please type the blog title : <strong>{selectedBlog?.title}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        className="font-roboto font-medium h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50 placeholder:text-gray-500/75"
                        placeholder="Type blog title to confirm"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                    />
                    <DialogFooter className="flex justify-end gap-2 pt-4">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setOpenDialog(false);
                                    setConfirmText('');
                                }}
                            >
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