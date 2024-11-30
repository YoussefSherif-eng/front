import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Table from "react-bootstrap/esm/Table";
import { getAuthUser } from "../../helper/storage";

const ViewJA = () => {
    const auth = getAuthUser();
    console.log(auth.token);
    const [apply, setApply] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });


    useEffect(() => {
        setApply({ ...apply, loading: true });
        axios
            .get("http://localhost:4000/jobs" )
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
        axios.put(`http://localhost:4000/jobs/jobReject/${id}/reject`,
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
    const acceptApply = (id) => {
        axios.put(`http://localhost:4000/jobs/jobAccept/${id}/accept`,
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
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
                                <th>Employer Name</th>
                                <th>Name</th>
                                <th>Job Type</th>
                                <th>Post Date</th>
                                <th>Description</th>
                                <th>Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {apply.results.map(apply => (
                                apply.status === 'pending' && (
                                    <tr key={apply.id}>
                                        <td>{apply.id}</td>
                                        <td>{apply.employer_name}</td>
                                        <td>{apply.name}</td>
                                        <td>{apply.job_type}</td>
                                        <td>{formatDate(apply.post_creation_date)}</td>
                                        <td>{apply.description}</td>
                                        <td>{apply.salary}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={(e) => { deleteApply(apply.id) }}>Reject</button>
                                            <button className="btn btn-sm btn-primary mx-2" onClick={(e) => { acceptApply(apply.id) }}>Accept</button>
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

export default ViewJA;
