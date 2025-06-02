import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage, Form, FormLabel } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent } from '@/components/ui/card'
import { Pencil } from 'lucide-react'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import slugify from 'slugify'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/hooks/useFtech'
import Loading from '@/components/Loading'
import { RouteCateDetails } from '@/helpers/RouteName'
import { useNavigate } from 'react-router-dom'

export default function EditCate() {

    const {cate_id} = useParams();

    const navigate = useNavigate();

    const {data:categoryData, loading, error} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/show/${cate_id}`,{
      method:'get',
      credentials:'include'
    },[cate_id]);

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

    console.log(categoryData);
    
    useEffect(() => {
      if(categoryData){
        form.setValue('name',categoryData.category.name);
        form.setValue('slug',categoryData.category.slug);
      }
    },[categoryData,form.reset]);

    // Backend
    async function onSubmit(values){

        try{
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/category/edit/${cate_id}`,{
                method:'put',
                headers:{'Content-type':'application/json'},
                credentials:'include',
                body:JSON.stringify(values)
            });
            const data = await response.json();
            if(!response.ok){
                return showToast('Error', data.message || 'Something went wrong, please try again later.');
            }
            showToast('Success', 'Category Updated Successfully.');
            navigate(RouteCateDetails);
        } catch (error) {
            showToast('Error', error.message);
        }
    };  

    if(loading) return <Loading/>

  return (
    <>
        <div className='w-full p-5 sm:p-20'>
            <Card className="w-full border-none shadow-none">
                <CardContent className="mt-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <h1 className="font-roboto font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max">Edit Your Category</h1>
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
                            <Pencil/>
                            Modify Category
                        </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </div>
    </>
  )
}   