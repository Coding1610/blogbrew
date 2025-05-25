import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import { House, SquareStack, Users, MessageCircleMore, NotepadText, CircleDotDashed } from 'lucide-react'
import { RouteCateDetails } from '@/helpers/RouteName'

export default function AppSidebar() {
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
                                <Link to="/" className='font-semibold font-raleway'> Blogs </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                                <MessageCircleMore className='text-darkRed'/>
                                <Link to="/" className='font-semibold font-raleway'> Comments </Link>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                                <Users className='text-darkRed'/>
                                <Link to="/" className='font-semibold font-raleway'> Users </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <CircleDotDashed className='text-darkRed'/>
                                <Link to={'/'} className='font-semibold font-raleway'> Category Item</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
    </Sidebar>
    </>
  )
}