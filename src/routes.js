import {Navigate, createBrowserRouter  } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import App from "./App";
import JobDetails from "./pages/Details/JobDetails";
import ManageJobs from "./pages/ManageJobs/ManageJobs";
import AddJobs from "./pages/ManageJobs/AddJobs";
import UpdateJob from "./pages/ManageJobs/updateJob";
import Guest from "./middleware/Guest";
import Employer from "./middleware/Employer";
import ManageEmployers from "./pages/Admin/ManageEmployers";
import AddEmployer from "./pages/Admin/AddEmployer";
import Admin from "./middleware/admin";
import EmployerDetails from "./pages/Details/EmployerDetails";
import UpdateEmployer from "./pages/Admin/UpdateEmployer";
import HomeAll from "./pages/home/homeAll";
import ApplyShow from "./pages/ManageJobs/Applyshow";
import UserApply from "./pages/home/userApply";
import MyJobs from "./pages/ManageJobs/myJobs";
import ViewJA from "./pages/Admin/viewJA";
import SavedJobs from "./pages/home/SavedJobs";
import AcceptedJob from "./pages/ManageJobs/AcceptedJob";
import AcceptedJobUser from "./pages/home/AcceptedJobUser";


export const routes = createBrowserRouter([

    {
        path: "",
        element: <App />,
        children:[

            {
                path: "/",
                element: <HomeAll />,
            },
            {
                path: "/Home",
                element: <Home />,
            },
            {
                path: "/Job/Details/:id",
                element: <JobDetails />,
            },
            {
                path: "/E/:id",
                element: <EmployerDetails />,
            },
            {
                path: "/ApplyShow",
                element: <ApplyShow />,
            },
            {
                path: "/UserApply",
                element: <UserApply />,
            },
            {
                path: "/MyJobs",
                element: <MyJobs />,
            },
            {
                path: "/ViewJA",
                element: <ViewJA />,
            },
            {
                path: "/SavedJobs",
                element: <SavedJobs />,
            },
            {
                path: "/AcceptedJob",
                element: <AcceptedJob />,
            },
            {
                path: "/AcceptedJobUser",
                element: <AcceptedJobUser />,
            },
            {
                element: <Guest/>,
                children:[
                        {
                            path: "/login",
                            element: <Login />,
                        },
                        {
                            path: "/register",
                            element: <Register />,
                        },
                    ]
                    
                },
                {
                    path: "/ManageJobs",
                    element:<Employer/>,
                    children:[
                        {
                        path:"",
                        element:<ManageJobs/>
                    },
                    {
                        path:"add",
                        element:<AddJobs/>
                    },
                    {
                        path:":id",
                        element:<UpdateJob/>
                    },
                ]
            },
                {
                    path: "/ManageEmployers",
                    element:<Admin/>,
                    children:[
                        {
                        path:"",
                        element:<ManageEmployers/>
                    },
                    {
                        path:"addEmployer",
                        element:<AddEmployer/>
                    },
                    {
                        path:":id",
                        element:<UpdateEmployer/>
                    },
                ]
            },

        ]
    },
    {
        path:"*",
        element:<Navigate to={"/"}/>
    }
]);
