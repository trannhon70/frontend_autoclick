import { useEffect, useState } from "react"
import { userAPI } from "../apis/user.api";


const useGetByIdUser = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const fetchRole = async () => {
            try {
                const result = await userAPI.getByIdUser();
                setData(result.data.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            } 
        };

        fetchRole();
    }, [])
    
    return {
        role : data?.role, 
        user : data, 
        loading
    }
}

export default useGetByIdUser