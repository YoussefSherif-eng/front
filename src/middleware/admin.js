import { Outlet , Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/storage";

const Admin = () =>{
    const auth = getAuthUser();
    return <>
    {auth && auth.role ===2 ? <Outlet/> : <Navigate to={"/"}/>}
    </>
    }

export default Admin ;