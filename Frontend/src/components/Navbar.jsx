import React from "react";
import { Button } from "./ui/button";
import { LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { RouteSignIn } from "@/helpers/RouteName";
import { useSelector } from "react-redux";
import { UserRound, LogOut, CircleFadingPlus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "@/redux/User/slice";
import { RouteIndex, RouteProfile } from "@/helpers/RouteName";
import { getEnv } from "@/helpers/getEnv";

export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const username = user?.user?.name;

    const handleLogout = async () => {
        try{
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/logout`,{
                method:"get",
                credentials:'include',
            });
            const data = await response.json();
            if(!response.ok){
                showToast('Error', data.message || 'Logout Failed.');
                return;
            }
            dispatch(removeUser());
            showToast('Success', data.message || "Logout Successfully.");
            navigate(RouteIndex);
        } catch(error){
            showToast('Error', error.message || "Internal Server Error.");
            return;
        }
    };

    return (
    <>
        <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
            {/* logo */}
            <div>
            <Link to={RouteIndex} className="font-roboto font-bold text-2xl text-darkRed">
                BlogBrew
            </Link>
        </div>
        {/* search input */}
        <div className="w-[130px] sm:w-[330px] md:w-[500px]">
            <SearchBox />
        </div>
        {/* sign in button */}
        <div className="flex items-center">
            {!user.isLoggedIn ? 

                <Button asChild className="bg-darkRed hover:bg-midRed rounded-lg">
                    <Link to={RouteSignIn} className="text-white font-roboto">
                    <LogIn className="text-white" />
                        Sign In
                    </Link>
                </Button>
                :
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src={user?.user?.avatar ? user.user.avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${username}%20`} />
                            <AvatarFallback>PP</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <p className="font-roboto font-medium">{user.user.name}</p>
                            <p className="font-roboto text-sm font-medium">{user.user.email}</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to={RouteProfile} className="font-roboto cursor-pointer">
                               <UserRound size={32} className="text-darkRed" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link to={'/'} className="font-roboto cursor-pointer">
                               <CircleFadingPlus size={32} className="text-darkRed" />
                                Create Blog
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem asChild>
                            <p onClick={handleLogout} className="font-roboto cursor-pointer">
                               <LogOut size={32} className="text-darkRed" />
                                Logout
                            </p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            }   
        </div>
      </div>
    </>
  );
}
