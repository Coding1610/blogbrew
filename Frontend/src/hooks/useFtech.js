import { useEffect, useState } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
    
    const [data,setData] = useState();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);    
    
    useEffect( () => {
        
        setLoading(true);

        const fetchData = async() => {

            try{

                const response = await fetch(url, options);
                const responseData = await response.json();
                    
                if(!response.ok){
                    throw new Error(`Error, ${response.statusText}, ${response.status}`);
                }
                setData(responseData.data || responseData);
                setError(null);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    },dependencies);

    return {data,loading,error};

};