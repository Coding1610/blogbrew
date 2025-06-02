import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { showToast } from '@/helpers/showToast';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getEnv } from '@/helpers/getEnv';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useFetch } from '@/hooks/useFtech';
import Loading from '@/components/Loading';
import Dropzone from 'react-dropzone';
import { setUser } from '@/redux/User/slice';

export default function Profile() {

    const [file,setFile] = useState();
    const [filePreview, setFilePreview] = useState();

    const user = useSelector((state) => state.user);
    const userId = user?.user?._id;

    const {data:userData, loading, error} = useFetch(userId ? `${getEnv('VITE_API_BASE_URL')}/get-user/${userId}` : null,
        userId ? {method:'get', credentials:'include'} : null
    );

    const dispatch = useDispatch();
    
    const formSchema = z.object({
        name: z.string().min(3,'Name must be atleast 3 character long'),
        email: z.string().email(),
        bio: z.string().min(5,'Bio must be atleast 5 character long'),    
        // password: z.string()
    });

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:"",
            bio:"",
            password:"",
        }
    });

    useEffect(() => {
        if(userData && userData.success){
            form.reset({
                name:userData.user.name,
                email:userData.user.email,
                bio:userData.user.bio,
            });
        }
    },[userData, form.reset]);

    async function onSubmit(values){

        try {
            const formData = new FormData();
            if(file){ 
                formData.append('file', file);
            }
            formData.append('data', JSON.stringify(values));

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/update-user/${userData.user._id}`,{
                method:"put",
                credentials:'include',
                body:formData
            });

            const data = await response.json();

            if(!response.ok){
                showToast('Error', data.message || 'Unable to update Profile');
                return;
            }

            dispatch(setUser(data.user));
            showToast('Success', data.message || "Profile Updated Successfully.");

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
  
    return (
    <>
        <Card className="w-[600px] pb-4 border-none shadow-none">
            <CardContent>

                <div className='flex justify-center items-center mb-4'>
                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Avatar className="w-20 h-20 relative group cursor-pointer">
                                    <AvatarImage src={filePreview? filePreview : userData?.user?.avatar || `https://api.dicebear.com/5.x/initials/svg?seed=${userData?.user?.name}%20` } />
                                    <AvatarFallback>PP</AvatarFallback>
                                    <div className='absolute z-50 w-full h-full top-[40px] left-[40px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black hidden justify-center items-center bg-opacity-60 border-[3.5px] border-darkRed group-hover:flex'>  
                                        <Camera size={32} className='text-darkRed'/>
                                    </div>
                                </Avatar>
                            </div> 
                        )}
                    </Dropzone>
                </div>

                <div>
                        <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                        
                                    <div className='mb-3'>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-roboto text-[15px]">Name</FormLabel>
                                                <FormControl>
                                                    <Input className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter your name..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-roboto text-[15px]">Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter your email..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-roboto text-[15px]">Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter your password..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={form.control}
                                            name="bio"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-roboto text-[15px]">Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea className="font-roboto font-normal h-20 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter your bio..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    </div>
                                    <div className='font-roboto font-normal w-full mt-6'>
                                        <Button type="submit" className="w-full bg-darkRed hover:bg-midRed rounded-lg font-roboto">
                                            <Save/>
                                            Save Changes
                                        </Button>
                                    </div>

                                </form>
                        </Form>
                </div>

            </CardContent>

        </Card>
    </>
  )
}