import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/storage";
import { useParams } from "react-router-dom";

const UpdateJob = () => {
    const auth = getAuthUser();
    let { id } = useParams();

    const [job, setjob] = useState({
        name: "",
        employer_name: "",
        job_type: "",
        post_creation_date: "",
        description: "",
        err: "",
        loading: false,
        success: null,
        reload: false,
    });
    useEffect(() => {
        axios
            .get("http://localhost:4000/jobs/Job/Details/" + id)
            .then((resp) => {
                setjob({
                    name: resp.data.name,
                    employer_name: resp.data.employer_name,
                    job_type: resp.data.job_type,
                    post_creation_date: resp.data.post_creation_date,
                    description: resp.data.description,
                    salary: resp.data.salary,
                });
            })
            .catch((err) => {
                setjob({
                    ...job,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });
            });
    }, [job.reload]);
    const updateJob = (e) => {
        e.preventDefault();
        setjob({ ...job, loading: true });

        axios
            .put(
                "http://localhost:4000/jobs/update/" + id,
                {
                    name: job.name,
                    employer_name: job.employer_name,
                    job_type: job.job_type,
                    post_creation_date: job.post_creation_date,
                    description: job.description,
                    salary: job.salary,
                },
                {
                    headers: {
                        token: auth.token,
                    },
                }
            )
            .then((resp) => {
                setjob({
                    ...job,
                    loading: false,
                    reload: job.reload + 1,
                    success: " Done",
                });
            })
            .catch((err) => {
                setjob({
                    ...job,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });
            });
    };
    return (
        <div className="AddMovies">
            <div className="login-container">
                <h1>Update Job </h1>
                {job.err && (
                    <Alert variant="danger" className="p-2">
                        {job.err}
                    </Alert>
                )}

                {job.success && (
                    <Alert variant="success" className="p-2">
                        {job.success}
                    </Alert>
                )}
                <Form onSubmit={updateJob}>
                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Job Name"
                            value={job.name}
                            onChange={(e) => setjob({ ...job, name: e.target.value })}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Job Name"
                            value={job.employer_name}
                            onChange={(e) =>
                                setjob({ ...job, employer_name: e.target.value })
                            }
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text" 
                            placeholder="Job Name"
                            value={job.job_type}
                            onChange={(e) => setjob({ ...job, job_type: e.target.value })}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="date"
                            placeholder="Job Name"
                            value={job.post_creation_date.slice(0, 10)} // Extract the date part
                            onChange={(e) =>
                                setjob({ ...job, post_creation_date: e.target.value })
                            }
                        />
                    </Form.Group>

                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <textarea
                            className="form-control"
                            placeholder="Details"
                            value={job.description}
                            onChange={(e) => setjob({ ...job, description: e.target.value })}
                            rows={5}
                        ></textarea>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Salary"
                            value={job.salary}
                            onChange={(e) => setjob({ ...job, salary: e.target.value })}
                        />
                    </Form.Group>

                    <br></br>
                    <Button
                        className="btn btn-dark w-100"
                        variant="primary"
                        type="submit"
                    >
                        Update Job
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default UpdateJob;
