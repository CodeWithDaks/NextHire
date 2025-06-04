
//->Now we protect our routes i.e Abi tak ya ho raha ha ki agar koi student admin pages ko acess karna chaiya tu kar pa raha ha(Or asa tu vo khud hi job create kar dega).Hama use ko abb thik karna ha 

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const ProtectedRoute =({children})=>{
    const {user} =useSelector(store =>store.auth);

    const navigate =useNavigate();

    useEffect(()=>{
        if(user === null || user.role !== 'recruiter'){
            navigate("/");
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
}

export default ProtectedRoute;