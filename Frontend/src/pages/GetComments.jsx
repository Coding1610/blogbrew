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
import { Trash, TriangleAlert } from 'lucide-react'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import moment from 'moment'

// UI dialog and input
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

export default function GetComments() {

    const [refreshData, setRefreshData] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [confirmText, setConfirmText] = useState('');

    const { data: commentData, loading } = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-all-comments`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData]);

    const commentsArray = commentData?.allComments || [];
    const comments = [...commentsArray].reverse();

    const confirmDelete = async () => {
        if (confirmText !== "Delete Comment") {
            showToast('Error', 'Comment text does not match');
            return;
        }

        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${selectedComment._id}`);
        if (response) {
            setRefreshData(!refreshData);
            showToast('Success', 'Comment Deleted Successfully');
        } else {
            showToast('Error', 'Error while deleting comment');
        }

        setOpenDialog(false);
        setConfirmText('');
        setSelectedComment(null);
    };

    if (loading) return <Loading />

    return (
        <>
            <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto mt-5'>
                <h1 className="font-roboto font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max ml-5">All Comments</h1>
                <Card className='mx-4 px-2 pt-2'>
                    <Table>
                        <TableHeader className="text-darkRed">
                            <TableRow className="bg-gray-50 text-nowrap text-darkRed text-[15px]">
                                <TableHead>Blog</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead>Comment By</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {comments.length > 0 ?
                                comments.map(c =>
                                    <TableRow key={c._id} className="text-nowrap">
                                        <TableCell>{c.blogId?.title}</TableCell>
                                        <TableCell>{c?.comment}</TableCell>
                                        <TableCell>{c?.author?.name}</TableCell>
                                        <TableCell>{moment(c?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell className="flex gap-2 items-center">
                                            <Button
                                                onClick={() => {
                                                    setSelectedComment(c);
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
                                    <TableCell colSpan={5}>
                                        <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                                            <TriangleAlert size={20} />
                                            <p className='font-medium'>Comments are not found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Comment</DialogTitle>
                        <DialogDescription>
                            To confirm deletion, please type : <strong>Delete Comment</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        className="font-roboto font-medium h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50 placeholder:text-gray-500/75"
                        placeholder="Type Delete Comment to confirm"
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