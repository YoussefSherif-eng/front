import React from "react";
import { Link } from "react-router-dom";
import { getAuthUser, removeAuthUser } from "../helper/storage";
import { useNavigate } from "react-router-dom";
import "../css/header.css"

const Header = () => {
    const navigate = useNavigate();
    const auth = getAuthUser();
    console.log(auth);
    const Logout = () => {
        removeAuthUser();
        navigate("/login");
    };
    return (
        <>
            <header>
                <h1>
                    <Link className="logo " to={"/"}>
                        Job Connect
                    </Link>
                </h1>
                <ul>
                    <li>

                        <Link className="nav" to={"/"}>
                            Home
                        </Link>
                    </li>
                    {auth && (
                        <>
                            <li>
                                <Link className="nav" to={"/Home"}>
                                    List Job
                                </Link>
                            </li>
                        </>
                    )}
                    {!auth && (
                        <>
                            <li>
                                <Link className="nav" to={"/login"}>
                                    Login
                                </Link>

                            </li>
                            <li>

                                <Link className="nav" to={"/register"}>
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                    {auth && auth.role === 1 && (
                        <>
                            <li>

                                <Link className="nav" to={"/ManageJobs"}>
                                    Manage Job
                                </Link>
                            </li>
                            <li>

                                <Link className="nav" to={"/ApplyShow"}>
                                    View Applications
                                </Link>
                            </li>
                            <li>

                                <Link className="nav" to={"/MyJobs"}>
                                    View My Jobs
                                </Link>
                            </li>
                            <li>
                                <Link className="nav" to={"/AcceptedJob"}>
                                    Accepted Job
                                </Link>
                            </li>
                        </>
                    )}
                    {auth && auth.role === 2 && (
                        <>
                            <li>

                                <Link className="nav" to={"/ManageEmployers"}>
                                    Manage Employers
                                </Link>
                            </li>
                            <li>

                                <Link className="nav" to={"/ViewJA"}>
                                    View Requests
                                </Link>
                            </li>

                        </>
                    )}
                    {auth && auth.role === 0 && (
                        <>
                            <li>
                                <Link className="nav" to={"/UserApply"}>
                                    My Applications
                                </Link>
                            </li>
                            <li>
                                <Link className="nav" to={"/SavedJobs"}>
                                    Save Important
                                </Link>
                            </li>
                            <li>
                                <Link className="nav" to={"/AcceptedJobUser"}>
                                    Accepted Job
                                </Link>
                            </li>

                        </>
                    )}

                    {auth && (
                        <>
                            <li>
                                <Link className="nav" onClick={Logout}>
                                    Logout
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </header>
        </>
    );
};

export default Header;
