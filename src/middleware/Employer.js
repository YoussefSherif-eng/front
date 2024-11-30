import { Outlet , Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/storage";

const Employer = () =>{
    const auth = getAuthUser();
    return <>
    {auth && auth.role ===1 ? <Outlet/> : <Navigate to={"/"}/>}
    </>
    }

export default Employer ;