import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage, Form, FormLabel } from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LogIn } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { RouteIndex, RouteSignIn } from '@/helpers/RouteName'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import GoogleAuth from '@/components/GoogleAuth'
import logo from '../assets/blogbrew_icon.svg'

export default function SignUp() {

    const navigate = useNavigate();

    const formSchema = z.object({
        name: z.string().min(3, 'Name must be atleast 3 character long.'),
        email: z.string().email(),
        password: z.string().min(8, 'Password must be atleast 8 characters long.'),
        confirmPassword: z.string().refine(data => data.password === data.confirmPassword, 'password and confirm password should be same.')
    });

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    });

    // Backend
    async function onSubmit(values){
        try { 
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/register`,{
                method:"post",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(values)
            });
            const data = await response.json();
            if(!response.ok){
                showToast('Error',data.message || 'Registration Failed.');
                return;
            }
            showToast('Success',data.message || "Registraction Successfully.");
            navigate(RouteSignIn);
        } catch(error) {
            showToast('Error',error.message || 'Something Went Wrong.');

        }
    };  

  return (
    <>
        <div className='bg-white flex justify-center items-center w-screen h-screen font-roboto'>
            <Card className="w-[340px] md:w-[450px] p-6 pt-8 pb-8 ">
                <div className='w-full flex flex-col gap-2 justify-center items-center mb-6'>
                    <Link to={RouteIndex} className='font-roboto font-bold text-2xl flex justify-center items-center gap-3 mb-1'>
                        <img src={logo} className='w-8 h-8'/>
                        <p className="bg-gradient-to-r from-darkRed to-midRed text-transparent bg-clip-text">BlogBrew</p>
                    </Link>
                    <h2 className='flex justify-center items-center text-xl font-roboto font-bold text-gray-700'>Create your account</h2>
                </div>
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
                                        <Input className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter your email..." {...field} />
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
                                name="confirmPassword"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-roboto text-[15px]">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="enter your confirm password..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className='font-roboto font-normal w-full flex flex-col justify-center items-center gap-3'>
                            <GoogleAuth/>
                            <Button type="submit" className="w-full bg-darkRed hover:bg-midRed rounded-lg font-roboto"><LogIn className='text-white'/>Sign Up</Button>
                            <div className=''>
                                <p className='text-gray-800'>Already have an account ?<Link className='pl-1 font-bold text-darkRed hover:underline' to={RouteSignIn}>sign in</Link></p>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    </>
  )
}   