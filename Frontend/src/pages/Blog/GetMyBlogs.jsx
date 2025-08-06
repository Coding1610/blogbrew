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
import { Rss, Trash, Eye, FilePenLine, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader } from '@/components/ui/card'
import { RouteBlogAdd, RouteBlogDetails, RouteBlogEdit, RouteSignIn } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFtech'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import moment from 'moment'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import { useSelector } from 'react-redux'

// Dialog components
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

export default function GetMyBlogs() {
    const user = useSelector((state) => state.user)
    const [refreshData, setRefreshData] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedBlog, setSelectedBlog] = useState(null)
    const [confirmText, setConfirmText] = useState('')

    const { data: blogData, loading } = useFetch(
        `${getEnv('VITE_API_BASE_URL')}/blog/get-my-blogs/${user?.user?._id}`,
        { method: 'get', credentials: 'include' },
        [refreshData]
    )

    const confirmDelete = async () => {
        const expected = `delete my blog : ${selectedBlog?.title}`
        if (confirmText.trim() !== expected) {
            showToast('Error', 'Text does not match. Please type the exact phrase.')
            return
        }

        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${selectedBlog._id}`)
        if (response) {
            showToast('Success', 'Deleted Successfully')
            setRefreshData(!refreshData)
        } else {
            showToast('Error', 'Error while deleting blog')
        }

        setOpenDialog(false)
        setConfirmText('')
        setSelectedBlog(null)
    }

    if (loading) return <Loading />

    if (user && user.isLoggedIn) {
        return (
            <>
                <div className='w-full pl-5 pr-5 pb-5 sm:pl-15 sm:pr-15 font-roboto'>
                    <Card className='border-none shadow-none'>
                        <CardHeader>
                            <Button className="bg-darkRed hover:bg-midRed rounded-lg w-[130px]">
                                <Link to={RouteBlogAdd} className='flex justify-center items-center gap-2'>
                                    <Rss />
                                    Add Blog
                                </Link>
                            </Button>
                        </CardHeader>
                        <Card className="mx-4 px-2 pt-2">
                            <Table>
                                <TableHeader className="text-darkRed">
                                    <TableRow className="text-nowrap">
                                        <TableHead>Title</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Slug</TableHead>
                                        <TableHead>Dated</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {blogData && blogData.blog.length > 0 ?
                                        blogData.blog.map(blog =>
                                            <TableRow key={blog?._id} className="text-nowrap">
                                                <TableCell>{blog?.title}</TableCell>
                                                <TableCell>{blog?.category?.name}</TableCell>
                                                <TableCell>{blog?.slug}</TableCell>
                                                <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                                <TableCell className="flex gap-2 items-center">
                                                    <Button className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                                                        <Link to={RouteBlogDetails(blog?.category?.slug, blog?.slug)}>
                                                            <Eye size={16} />
                                                        </Link>
                                                    </Button>
                                                    <Button className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                                                        <Link to={RouteBlogEdit(blog._id)}>
                                                            <FilePenLine size={16} />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedBlog(blog)
                                                            setOpenDialog(true)
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
                                            <TableCell colSpan={5}>
                                                <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                                                    <TriangleAlert size={20} />
                                                    <p className='font-medium'>You haven't created any blog yet</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </Card>
                    </Card>
                </div>

                {/* Delete Confirmation Dialog */}
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="sm:max-w-md font-roboto">
                        <DialogHeader>
                            <DialogTitle>Delete Blog</DialogTitle>
                            <DialogDescription>
                                To delete this blog, please type,
                                <span className="block mt-2 italic text-gray-800">
                                    delete my blog : {selectedBlog?.title}
                                </span>
                            </DialogDescription>
                        </DialogHeader>
                        <Input
                            className="font-roboto font-medium h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50 placeholder:text-gray-500/75"
                            placeholder='Type confirmation text'
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                        />
                        <DialogFooter className="flex justify-end gap-2 pt-4">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setOpenDialog(false)
                                        setConfirmText('')
                                    }}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={confirmDelete}
                            >
                                Confirm Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
        )
    } else {
        return (
            <p className='flex text-[18px] justify-center text-red-600 font-medium items-center gap-2'>
                <Link to={RouteSignIn} className='hover:border-b-2 border-red-600'>sign-in</Link> to see your blogs
            </p>
        )
    }
}