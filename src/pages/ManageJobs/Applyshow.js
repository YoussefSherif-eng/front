import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Table from "react-bootstrap/esm/Table";
import { getAuthUser } from "../../helper/storage";

const ApplyShow = () => {
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
            .get("http://localhost:4000/jobs/applyShow/" + [auth.id], {
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

    const deleteApply = (id) => {
        axios.put(`http://localhost:4000/jobs/proposals/${id}/reject`,
            {
                headers: {
                    token: auth.token
                }
            })
            .then((resp) => {
                setApply({ ...apply, reload: apply.reload + 1 });
            })
            .catch((err) => { }
            );
    }

    const acceptApply = (id , JId) => {
        axios.put(`http://localhost:4000/jobs/proposals/${id}/accept`, null, {
            headers: {
                token: auth.token
            }
        })
        .then((resp) => {
            setApply({ ...apply, reload: apply.reload + 1 });
        })
        .catch((err) => {
        });
    
        axios.put(`http://localhost:4000/jobs/removeJobFromList/${JId}`, null, {
            headers: {
                token: auth.token
            }
        })
        .then((resp) => {
            setApply({ ...apply, reload: apply.reload + 1 });
        })
        .catch((err) => {
        });
    }
    
    const viewCV = (cv) => {
        window.open(cv, '_blank');
    }
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
                                <th>CV</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {apply.results.map(apply => (
                                apply.status === 'pending' && (
                                    <tr key={apply.id}>
                                        <td>{apply.job_id}</td>
                                        <td>{jobs.results.find(job => job.id === apply.job_id)?.name || ""}</td>
                                        <td>{apply.name}</td>
                                        <td>{apply.email}</td>
                                        <td>{apply.phone}</td>
                                        <td>{apply.age}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info" onClick={() => viewCV(apply.cv)}>View CV</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={(e) => { deleteApply(apply.id) }}>Reject</button>
                                            <button className="btn btn-sm btn-primary mx-2" onClick={(e) => { acceptApply(apply.id , apply.job_id ) }}>Accept</button>
                                        </td>
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

export default ApplyShow;
