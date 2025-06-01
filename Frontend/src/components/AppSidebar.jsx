import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import { House, SquareStack, Users, MessageCircleMore, NotepadText, CircleDotDashed } from 'lucide-react'
import { RouteBlog, RouteBlogByCategory, RouteCateDetails, RouteGetAllUsers, RouteGetComments } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFtech'
import { getEnv } from '@/helpers/getEnv'
import Loading from './Loading'

export default function AppSidebar() {

    const {data:categoryData, loading} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/show-all`, {
        method:'get',
        credentials:'include'
    });

    if(loading) return <Loading/>

    return (
    <>
    <Sidebar>
      <SidebarHeader className="bg-white flex justify-center text-darkRed pl-5 pt-4">
        <h2 className='font-roboto font-bold text-2xl'>BlogBrew</h2>
      </SidebarHeader>
            <SidebarContent className="bg-white">
                <SidebarGroup className="pt-5">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <House className='text-darkRed'/>
                                <Link to="/" className='font-semibold font-raleway'> Home </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                                <SquareStack className='text-darkRed'/>
                                <Link to={RouteCateDetails} className='font-semibold font-raleway'> Categories </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton> 
                                <NotepadText className='text-darkRed'/>
                                <Link to={RouteBlog} className='font-semibold font-raleway'> Blogs </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                                <MessageCircleMore className='text-darkRed'/>
                                <Link to={RouteGetComments} className='font-semibold font-raleway'> Comments </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                                <Users className='text-darkRed'/>
                                <Link to={RouteGetAllUsers} className='font-semibold font-raleway'> Users </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[15px]">
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {categoryData && categoryData.length > 0 && 
                            categoryData.map(category => 
                                <SidebarMenuItem key={category._id}>
                                <SidebarMenuButton>
                                    <CircleDotDashed className='text-darkRed'/>
                                    <Link to={RouteBlogByCategory(category.slug)} className='font-semibold font-raleway'>{category.name}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            )
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
    </Sidebar>
    </>
  )
}