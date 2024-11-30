import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/esm/Table";
import "./h.css";
import { getAuthUser } from "../../helper/storage";

const Home = () => {
    const auth = getAuthUser();

    const [jobs, setJobs] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });
    
    const [savedJobs, setSavedJobs] = useState({
        loading: true,
        data: [],
        error: null
    });

    const [search, setSearch] = useState("");

    useEffect(() => {
        setJobs({ ...jobs, loading: true });
        axios
            .get("http://localhost:4000/jobs", {
                params: {
                    search: search,
                },
            })
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
        axios.get(`http://localhost:4000/jobs/save/Important?userId=${auth.id}`)
            .then(response => {
                setSavedJobs({ loading: false, data: response.data, error: null });
            })
            .catch(error => {
                setSavedJobs({ loading: false, data: [], error: "Error retrieving saved jobs." });
            });
    }, [jobs.reload]);

    const saveImportant = (id) => {
        axios.post("http://localhost:4000/jobs/saveImportant/" + id ,{
            userId : auth.id
        } )
            .then((resp) => {
                setJobs({ ...jobs, reload: jobs.reload + 1 });
            })
            .catch((err) => { }
            );
    }

    const isJobSaved = (jobId) => {
        return savedJobs.data.some(job => job.job_id === jobId);
    }

    const searchJob = (e) => {
        e.preventDefault();
        setJobs({ ...jobs, reload: jobs.reload + 1 });
    };

    return (
        <div className="home-container p-5 ">
            {jobs.loading === true && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {jobs.loading === false && jobs.err == null && (
                <>
                    <Form onSubmit={searchJob}>
                        <Form.Group className="mb-3 d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Search Job"
                                className="rounded-0"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="btn btn-dark rounded-0">Search</button>
                        </Form.Group>
                    </Form>

                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Name Job</th>
                                <th>Job Type</th>
                                <th>Description</th>
                                <th>Salary</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs.results.map(job => (
                                    job.status === 'accepted' && job.statuAccept === 'not Accept' &&(

                                    <tr key={job.id}>
                                        <td>{job.name}</td>
                                        <td>{job.job_type}</td>
                                        <td>{job.description}</td>
                                        <td>{job.salary}</td>
                                        <td>
                                            <Link to={"/Job/Details/" + job.id} className="btn btn-sm btn-info">Show</Link>
                                        
                                        {auth && auth.role === 0 && !isJobSaved(job.id) && (
                                        
                                            <button className="btn btn-sm btn-danger mx-3" onClick={(e) => { saveImportant(job.id) }}>saveImportant</button>
                                        )
                                    }
                                    </td>
                                    </tr>
                                    )
                                ))
                            }
                        </tbody>
                    </Table>
                </>
            )}

            {jobs.loading === false && jobs.err != null && (
                <Alert variant="danger" className="p-2">
                    {jobs.err}
                </Alert>
            )}

            {jobs.loading === false &&
                jobs.err == null &&
                jobs.results.length === 0 && (
                    <Alert variant="info" className="p-2">
                        No jobs, please try again later !
                    </Alert>
                )}
        </div>
    );
};

export default Home;
