import { Outlet , Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/storage";

const Guest = () =>{
    const auth = getAuthUser();
    return <>
    {!auth ? <Outlet/> : <Navigate to={"/"}/>}
    </>
    }

export default Guest ;