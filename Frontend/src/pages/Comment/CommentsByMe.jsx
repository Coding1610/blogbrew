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
import { useSelector } from 'react-redux'
import { RouteSignIn } from '@/helpers/RouteName'

// Dialog Components
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

export default function CommentsByMe() {
  const [refreshData, setRefreshData] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState(null)
  const [confirmText, setConfirmText] = useState('')

  const user = useSelector((state) => state.user)

  const { data: commentData, loading } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/blog/comments-by-me/${user?.user?._id}`,
    { method: 'get', credentials: 'include' },
    [refreshData]
  )

  const confirmDelete = async () => {
    const expected = `delete my comment : ${selectedComment?.comment}`
    if (confirmText.trim() !== expected) {
      showToast('Error', 'Text does not match. Please type the exact phrase.')
      return
    }

    const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${selectedComment?._id}`)
    if (response) {
      showToast('Success', 'Comment Deleted Successfully')
      setRefreshData(!refreshData)
    } else {
      showToast('Error', 'Error while deleting comment')
    }

    setOpenDialog(false)
    setConfirmText('')
    setSelectedComment(null)
  }

  if (loading) return <Loading />

  if (user && user.isLoggedIn) {
    return (
      <>
        <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto mt-5'>
          <h1 className="font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max ml-5 text-wrap">Comments by You</h1>
          <Card className='mx-4 px-2 pt-2'>
            <Table>
              <TableHeader className="text-darkRed">
                <TableRow className="bg-gray-50 text-nowrap text-darkRed text-[15px]">
                  <TableHead>Blog</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commentData && commentData?.comments.length > 0 ?
                  commentData.comments.map(c =>
                    <TableRow key={c._id} className="text-nowrap">
                      <TableCell>{c?.blogId?.title}</TableCell>
                      <TableCell>{c?.comment}</TableCell>
                      <TableCell>{moment(c?.createdAt).format('DD-MM-YYYY')}</TableCell>
                      <TableCell className="flex gap-2 items-center">
                        <Button
                          onClick={() => {
                            setSelectedComment(c)
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
                    <TableCell colSpan={4}>
                      <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                        <TriangleAlert size={20} />
                        <p className='font-medium'>you haven't commented on any blog yet</p>
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
          <DialogContent className="sm:max-w-md font-roboto">
            <DialogHeader>
              <DialogTitle>Delete Comment</DialogTitle>
              <DialogDescription>
                To delete this comment, please type:
                <span className="block mt-2 italic text-gray-800">
                  delete my comment : {selectedComment?.comment}
                </span>
              </DialogDescription>
            </DialogHeader>
            <Input
              className="font-medium h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50 placeholder:text-gray-500/75"
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
      <p className='flex text-[18px] justify-center text-red-600 font-medium items-center gap-2 text-wrap'>
        <Link to={RouteSignIn} className='hover:border-b-2 border-red-600'>sign-in</Link> to see comments made by you
      </p>
    )
  }
}