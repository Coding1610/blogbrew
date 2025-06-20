import React from 'react'
import google from '@/assets/google.png'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../helpers/firebase';
import { Button } from './ui/button';
import { showToast } from '@/helpers/showToast';
import { useNavigate } from 'react-router-dom';
import { getEnv } from '@/helpers/getEnv';
import { RouteIndex } from '@/helpers/RouteName';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/User/slice'

export default function GoogleAuth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        
        try {
            const googleResponse = await signInWithPopup(auth, provider);
            const user = googleResponse.user;
            const bodyData = {
                name:user.displayName,
                email:user.email,
                avatar:user.photoURL
            };
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/google-auth`,{
                method:"post",
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body:JSON.stringify(bodyData)
            });
            const data = await response.json();
            if(!response.ok){
                showToast('Error', data.message || 'Login Failed.');
                return;
            }
            dispatch(setUser(data.user));
            showToast('Success', data.message || "Login Successfully.");
            navigate(RouteIndex);
        } catch(error){
            showToast('Error',error.message || 'Something Went Wrong.');
        }

    };

    return(
        <>
        <Button variant="ghost" onClick={handleLogin} className="w-full mt-1 focus:ring-1 focus:ring-darkRed" >
            <img src={google} alt="Google" className='w-4 h-4 mr-2' />
            Continue with Google
        </Button>
        </>
    )

}