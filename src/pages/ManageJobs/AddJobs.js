import React, {  useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { getAuthUser } from "../../helper/storage";

const AddJobs = () => {
    const auth = getAuthUser();

    const [job, setjob] = useState({
        name: "",
        employer_name: "",
        job_type: "",
        post_creation_date: "",
        description: "",
        salary: "",
        err: "",
        loading: false,
        success: null,
    });


    const createMovie = (e) => {
        e.preventDefault();
        setjob({ ...job, loading: true });
        // const formData = new FormData();
        // formData.append("name", job.name)
        // formData.append("employer_name", job.name)
        // formData.append("job_type", job.job_type)
        // formData.append("post_creation_date", job.post_creation_date)
        // formData.append("description", job.description)
        // formData.append("salary", job.salary)
        
        axios.post("http://localhost:4000/jobs/create", {
            name: job.name,
            employer_name: job.employer_name,
            job_type: job.job_type,
            post_creation_date: job.post_creation_date,
            description: job.description,
            salary: job.salary
        },
            {
                headers: {
                    token: auth.token,
                }
            })
            .then((resp) => {
                setjob({
                    name: "",
                    employer_name: "",
                    job_type: "",
                    post_creation_date: "",
                    description: "",
                    salary: "",
                    err: null,
                    loading: false,
                    success: "Job Created Successfully !",
                });
            })
            .catch((err) => {
                setjob({
                    ...job,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });

            }
            );
    }
    return (
        <div className="AddMovies">
            <div className="login-container">
                <h1>Add New Job </h1>
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
                <Form onSubmit={createMovie}>
                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control required value={job.name} onChange={(e) => setjob({ ...job, name: e.target.value })} type="text" placeholder="Job Name" />
                    </Form.Group>

                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control required value={[job.employer_name ]= [auth.name]} onChange={(e) => setjob({ ...job, employer_name: e.target.value })} type="text" placeholder="Employer Name" />
                    </Form.Group>

                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control required value={job.job_type} onChange={(e) => setjob({ ...job, job_type: e.target.value })} type="text" placeholder="Job Type" />
                    </Form.Group>

                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control required value={job.post_creation_date} onChange={(e) => setjob({ ...job, post_creation_date: e.target.value })} type="date" placeholder="Post Creation Date" />
                    </Form.Group>

                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <textarea required value={job.description} onChange={(e) => setjob({ ...job, description: e.target.value })} className="form-control" placeholder="Details" rows={5}></textarea>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control required value={job.salary} onChange={(e) => setjob({ ...job, salary: e.target.value })} type="text" placeholder="salary" />
                    </Form.Group>

                    <br></br>
                    <Button className="btn btn-dark w-100" variant="primary" type="submit">
                        Add New Job
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddJobs;