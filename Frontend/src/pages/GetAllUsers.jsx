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
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

// Dialog + Input
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

export default function GetAllUsers() {
    const [refreshData, setRefreshData] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [confirmText, setConfirmText] = useState('')

    const { data: userData, loading } = useFetch(`${getEnv('VITE_API_BASE_URL')}/get-all-users`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const usersArray = userData?.allUsers || []
    const users = [...usersArray].reverse()

    const confirmDelete = async () => {
        if (confirmText !== selectedUser?.name) {
            showToast('Error', 'Username does not match')
            return
        }

        const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/user/delete/${selectedUser._id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('Success', 'User Deleted Successfully')
        } else {
            showToast('Error', 'Error while deleting user')
        }

        setOpenDialog(false)
        setConfirmText('')
        setSelectedUser(null)
    }

    if (loading) return <Loading />

    return (
        <>
            <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto mt-5'>
                <h1 className="font-roboto font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max ml-5">All Users</h1>
                <Card className='mx-4 px-2 pt-2'>
                    <Table>
                        <TableHeader className="text-darkRed">
                            <TableRow className="bg-gray-50 text-nowrap text-darkRed text-[15px]">
                                <TableHead>Role</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Avatar</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length > 0 ?
                                users.map(u =>
                                    <TableRow key={u?._id} className="text-nowrap">
                                        <TableCell>{u?.role}</TableCell>
                                        <TableCell>{u?.name}</TableCell>
                                        <TableCell>{u?.email}</TableCell>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage className='w-8 h-8 rounded-full' src={u?.avatar || `https://api.dicebear.com/5.x/initials/svg?seed=${u?.name}%20`} />
                                                <AvatarFallback>PP</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{u?.createdAt ? moment(u?.createdAt).format('DD-MM-YYYY') : '_'}</TableCell>
                                        <TableCell className={u?.role === "User" ? "flex gap-2 items-center" : "hidden"}>
                                            <Button
                                                onClick={() => {
                                                    setSelectedUser(u)
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
                                    <TableCell colSpan={6}>
                                        <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                                            <TriangleAlert size={20} />
                                            <p className='font-medium'>Users are not found</p>
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
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            To confirm deletion, please type the blog title : <strong>{selectedUser?.name}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        className="font-roboto font-medium h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50 placeholder:text-gray-500/75"
                        placeholder="Type username to confirm"
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
                            Yes, Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}