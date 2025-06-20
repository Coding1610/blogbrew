import { toast, Bounce } from "react-toastify";

export const showToast = (type,msg) => {
    const config = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    }
    if( type === "Success"){
        toast.success(msg,config);
    }
    else if( type === "Error"){
        toast.error(msg,config);
    }
    else if( type === "Info"){
        toast.info(msg,config);
    }
    else{
        toast(msg,config);
    }
}