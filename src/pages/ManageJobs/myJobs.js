import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Table from "react-bootstrap/esm/Table";
import { getAuthUser } from "../../helper/storage";

const MyJobs = () => {
    const auth = getAuthUser();

    const [apply, setApply] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });


    useEffect(() => {
        setApply({ ...apply, loading: true });
        axios
            .get("http://localhost:4000/jobs/jobE/" + [auth.id], {
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
        axios.delete(`http://localhost:4000/jobs/deleteRequest/` + id,
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
                                <th>Name</th>
                                <th>Job Type</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {apply.results.map(apply => (
                                apply.status !== 'accepted' && (
                                    <tr key={apply.id}>
                                        <td>{apply.id}</td>
                                        <td>{apply.name}</td>
                                        <td>{apply.job_type}</td>
                                        <td>{formatDate(apply.post_creation_date)}</td>
                                        <td>{apply.description}</td>
                                        <td>{apply.salary}</td>
                                        <td>{apply.status}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={(e) => { deleteApply(apply.id) }}>Cancel</button>
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

export default MyJobs;
