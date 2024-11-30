import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import { getAuthUser } from "../../helper/storage";
import { Link } from "react-router-dom";
import "./h.css";


const SavedJobs = () => {
    const auth = getAuthUser();
    const [savedJobs, setSavedJobs] = useState({
        loading: true,
        data: [],
        error: null
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
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:4000/jobs/save/Important?userId=${auth.id}`)
            .then(response => {
                setSavedJobs({ loading: false, data: response.data, error: null });
            })
            .catch(error => {
                setSavedJobs({ loading: false, data: [], error: "Error retrieving saved jobs." });
            });
    }, [jobs.reload]);

    const deleteSave = (id) => {
        axios.delete(`http://localhost:4000/jobs/deleteSave/` + id ,
            {
                headers: {
                    token: auth.token
                }
            })
            .then((resp) => {
                setJobs({ ...jobs, reload: jobs.reload + 1 });
            })
            .catch((err) => { }
            );
    }

    return (
        <div className="container ">
            {savedJobs.loading && <p>Loading...</p>}
            {savedJobs.error && <Alert variant="danger">{savedJobs.error}</Alert>}
            {savedJobs.data.length === 0 && !savedJobs.loading && !savedJobs.error && (
                <Alert variant="info">No saved jobs found.</Alert>
            )}
            {savedJobs.data.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Job Name</th>
                            <th>Description</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedJobs.data.map(savedJob => {
                            const jobDetails = jobs.results.find(job => job.id === savedJob.job_id);
                            if (jobDetails) {
                                return (
                                    <tr key={savedJob.id}>
                                        <td>{jobDetails.id}</td>
                                        <td>{jobDetails.name}</td>
                                        <td>{jobDetails.description}</td>
                                        <td>{jobDetails.salary}</td>
                                        <td>
                                            <Link to={"/Job/Details/" + jobDetails.id} className="btn btn-sm btn-info">Show</Link>
                                            <button className="btn btn-sm btn-danger mx-3" onClick={(e) => { deleteSave(savedJob.id) }}>Cancel</button>

                                        </td>

                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default SavedJobs;
