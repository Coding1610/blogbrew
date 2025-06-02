import React, { use, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage, Form, FormLabel } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent } from '@/components/ui/card'
import { ListPlus } from 'lucide-react'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import slugify from 'slugify'
import { useFetch } from '@/hooks/useFtech'
import Dropzone from 'react-dropzone'
import CkEditor from '@/components/CkEditor'
import { RouteSignIn } from '@/helpers/RouteName'
import { 
    Select, 
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  
import { useSelector } from 'react-redux'
import Loading from '@/components/Loading'
import { useNavigate } from 'react-router-dom'
import { RouteGetMyBlogs } from '@/helpers/RouteName'
import { Link } from 'react-router-dom'

export default function AddBlog() {

    const navigate = useNavigate();

    const user = useSelector((state) => state.user);

    const [file,setFile] = useState();
    const [filePreview, setFilePreview] = useState();

    const {data:categoryData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/show-all`, {
        method:'get',
        credentials:'include'
    });

    const formSchema = z.object({
        category: z.string().min(3, 'Category must be atleast 3 character long.'),
        title: z.string().min(3, 'Title must be atleast 3 character long.'),
        slug: z.string().min(3, 'Slug must be atleast 3 character long.'),   
        blogContent: z.string().min(3, 'Blog Content must be atleast 3 character long.'),     
    });

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            category:"",
            title:"",
            slug:"",
            blogContent:""
        }
    });

    const handleEditorData = (event,editor) => {
        const data = editor.getData();
        form.setValue('blogContent',data);
    };

    const blogTitle = form.watch('title');

    // Slugify function
    useEffect(() => {
        if(blogTitle){
            const slug = slugify(blogTitle, {lower:true});
            form.setValue('slug',slug);
        } 
    },[blogTitle]);

    // Backend
    async function onSubmit(values){

        try {
            const newValues = {...values,author:user?.user._id};
            const formData = new FormData();
            if(file){ 
                formData.append('file', file);
            }
            else{
                showToast('Error','Featured Image is required.');
            }
            formData.append('data', JSON.stringify(newValues));

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/add`,{
                method:"post",
                credentials:'include',
                body:formData
            });

            const data = await response.json();

            if(!response.ok){
                showToast('Error', data.message || 'Unable to upload new Blog.');
                return;
            }
            form.reset();
            setFile()
            setFilePreview();
            showToast('Success', data.message || "Your Blog Uploaded Successfully.");
            navigate(RouteGetMyBlogs);

        } catch(error){
            showToast('Error',error.message || 'Something Went Wrong.');
        }
    };  

    const handleFileSelection = (files) => {
        const file = files[0];
        const preview = URL.createObjectURL(file);
        setFile(file);
        setFilePreview(preview);
    };

    if(loading) return <Loading/>

    if(user && user.isLoggedIn){

    return (
        <>
            <div className='w-full pl-5 pr-5 pb-5 sm:pl-20 sm:pr-20 font-roboto'>
                <Card className="w-full border-none shadow-none">
                    <CardContent className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <h1 className="font-roboto font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max">Add New Blog</h1>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[15px]">Category</FormLabel>
                                        <Select className="w-full" onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="h-10 rounded-lg bg-gray-50 font-normal focus-visible:ring-darkRed focus:outline-none w-full">
                                                <SelectValue placeholder="Select"/>
                                            </SelectTrigger>
                                            <SelectContent className='font-normal'>
                                                {categoryData && 
                                                    categoryData.map((category) => 
                                                        <SelectItem key={category._id} value={category._id} >{category.name}</SelectItem>
                                                    )
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-roboto text-[15px]">Title</FormLabel>
                                        <FormControl>
                                            <Input className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter blog title..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-roboto text-[15px]">Slug</FormLabel>
                                        <FormControl>
                                            <Input className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="generated-slug..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormLabel className="font-roboto text-[15px]">Featured Image</FormLabel>
                                <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className='bg-gray-50 mt-2 cursor-pointer flex justify-center items-center rounded-lg border-2 border-midRed border-dashed h-[180px] w-[300px] px-2'>
                                                <img src={filePreview} className='rounded-lg'/>
                                            </div>
                                        </div> 
                                    )}
                                </Dropzone>
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="blogContent"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-roboto text-[15px]">Blog Content</FormLabel>
                                        <FormControl>
                                            <CkEditor props={{initialData:'',onChange:handleEditorData}} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <Button type="submit" className="bg-darkRed hover:bg-midRed rounded-lg w-full flex justify-center items-center gap-2 mt-5">
                                <ListPlus/>
                                Submit
                            </Button>
                        </form>
                    </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    )

    } else{
        return (
            <p className='flex text-[18px] justify-center text-red-600 font-medium items-center gap-2'> <Link to={RouteSignIn} className='hover:border-b-2 border-red-600'>sign-in</Link>to create new blog</p>
        )  
    }
}   