import React, { useEffect, useState } from "react";
import "../../css/JobDetails.css"
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/storage";



const EmployerDetails = () => {
    let { id } = useParams();
    const auth = getAuthUser();
    const [employer, setEmployer] = useState({
        loading: true,
        result: null,
        err: null,
        reload: 0
    });
    useEffect(() => {
        setEmployer({ ...employer, loading: true });
        axios
            .get("http://localhost:4000/jobs/employers/" + id,
            {
                headers: {
                    token: auth.token
                }
            })
            .then((resp) => {
                console.log(resp);
                setEmployer({ ...employer, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setEmployer({
                    ...employer,
                    loading: false,
                    err: " something went wrong, please try again later ! ",
                });
            });
    }, [employer.reload]);

    return (
        <div className="MovieDetails" >
            {/* Loader  */}
            {employer.loading === true && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {employer.loading === false && employer.err == null && (
                <>
                    <div className="row">
                        <div className="">
                            <h3>{employer.result.name} </h3>
                            <p>{employer.result.email}</p>
                        </div>
                    </div>

                    <hr />
                </>
            )}
        </div>
    );
};

export default EmployerDetails;