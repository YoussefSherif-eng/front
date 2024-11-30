import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Table from "react-bootstrap/esm/Table";
import { getAuthUser } from "../../helper/storage";

const AcceptedJobUser = () => {
    const auth = getAuthUser();

    const [apply, setApply] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    const [jobs, setJobs] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });
    

    useEffect(() => {
        setJobs({ ...jobs, loading: true });
        axios
            .get("http://localhost:4000/jobs")
            .then((resp) => {
                console.log(resp);
                setJobs({ ...jobs, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setJobs({
                    ...jobs,
                    loading: false,
                    err: "Something went wrong, please try again later!",
                });
            });
    }, [jobs.reload]);


    useEffect(() => {
        setApply({ ...apply, loading: true });
        axios
            .get("http://localhost:4000/jobs/applyShowUser/" + [auth.id], {
                headers: {
                    token: auth.token,
                }
            })
            .then((resp) => {
                console.log(resp);
                setApply({ ...apply, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setApply({
                    ...apply,
                    loading: false,
                    err: " something went wrong, please try again later ! ",
                });
            });
        console.log(apply.results);
    }, [apply.reload]);

    return (
        <div className="home-container p-5 ">
            {apply.loading === true && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {apply.loading === false && apply.err == null && (
                <>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Job Id</th>
                                <th>Job Name</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Age</th>
                                <th>status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {apply.results.map(apply => (
                                apply.status === 'accepted' && (
                                    <tr key={apply.id}>
                                        <td>{apply.job_id}</td>
                                        <td>{jobs.results.find(job => job.id === apply.job_id)?.name || ""}</td>
                                        <td>{apply.name}</td>
                                        <td>{apply.email}</td>
                                        <td>{apply.phone}</td>
                                        <td>{apply.age}</td>
                                        <td>{apply.status}</td>
                                        <td>{apply.status}</td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </Table>
                </>
            )}

            {apply.loading === false && apply.err != null && (
                <Alert variant="danger" className="p-2">
                    {apply.err}
                </Alert>
            )}

            {apply.loading === false &&
                apply.err == null &&
                apply.results.length === 0 && (
                    <Alert variant="info" className="p-2">
                        No jobs, please try again later !
                    </Alert>
                )}
        </div>
    );
};

export default AcceptedJobUser;
