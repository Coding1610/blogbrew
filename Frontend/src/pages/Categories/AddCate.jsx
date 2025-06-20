import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage, Form, FormLabel } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent } from '@/components/ui/card'
import { ListPlus } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import slugify from 'slugify'

export default function AddCate() {

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be atleast 3 character long.'),
        slug: z.string().min(3, 'Slug must be atleast 3 character long.'),     
    });

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            slug:"",
        }
    });

    const categoryName = form.watch('name');

    // Slugify function
    useEffect(() => {
        if(categoryName){
            const slug = slugify(categoryName, {lower:true});
            form.setValue('slug',slug);
        } 
    },[categoryName]);

    // Backend
    async function onSubmit(values){
        try{
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/add`,{
                method:'post',
                headers:{'Content-type':'application/json'},
                credentials:'include',
                body:JSON.stringify(values)
            });
            const data = await response.json();
            if(!response.ok){
                return showToast('Error', data.message || 'Something went wrong, please try again later.');
            }
            form.reset();
            showToast('Success', 'Category Added Successfully.');
        } catch (error) {
            showToast('Error', error.message);
        }
    };  

  return (
    <>
        <div className='w-full p-5 sm:p-20'>
            <Card className="w-full border-none shadow-none">
                <CardContent className="mt-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <h1 className="font-roboto font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max">Add New Category</h1>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-roboto text-[15px]">Name</FormLabel>
                                    <FormControl>
                                        <Input className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter category name..." {...field} />
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
}   