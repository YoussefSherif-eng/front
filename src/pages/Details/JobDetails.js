import React, { useEffect, useRef, useState } from "react";
import "../../css/JobDetails.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/storage";
import Form from "react-bootstrap/Form";

const JobDetails = () => {
    let { id } = useParams();
    const auth = getAuthUser();
    const [job, setjob] = useState({
        loading: true,
        result: null,
        err: null,
        reload: 0,
    });
    const [Apply, setApply] = useState({
        loading: false,
        name: "",
        email: "",
        phone: "",
        age: "",
        err: null,
        success: null,
    });
    const cv = useRef(null);

    const [hasApplied, setHasApplied] = useState(false); // State to track whether the user has already applied

    useEffect(() => {
        setjob({ ...job, loading: true });
        axios
            .get("http://localhost:4000/jobs/Job/Details/" + id)
            .then((resp) => {
                console.log(resp);
                setjob({ ...job, result: resp.data, loading: false, err: null });
                if (
                    auth &&
                    auth.role === 0 &&
                    resp.data.apply.some((application) => application.user_id === auth.id)
                ) {
                    setHasApplied(true);
                }
            })
            .catch((err) => {
                setjob({
                    ...job,
                    loading: false,
                    err: " something went wrong, please try again later ! ",
                });
            });
    }, [job.reload]);
    const sendApply = (e) => {
        e.preventDefault();
        setApply({ ...Apply, loading: true });
        const formData = new FormData();
        formData.append("job_id", id);
        formData.append("employer_id", job.result.employer_id);
        formData.append("name", Apply.name);
        formData.append("email", Apply.email);
        formData.append("phone", Apply.phone);
        formData.append("age", Apply.age);
        if (cv.current.files && cv.current.files[0]) {
            formData.append("cv", cv.current.files[0]);
        }

        axios
            .post(
                "http://localhost:4000/jobs/applyers",
                formData,
                {
                    headers: {
                        token: auth.token,
                    },
                }
            )
            .then((resp) => {
                setApply({
                    err: null,
                    Apply: "",
                    loading: false,
                    success: "Apply Was Successfully !",
                });
                setjob({
                    ...job,
                    reload: job.reload + 1,
                });
                setHasApplied(true);
            })
            .catch((errors) => {
                setApply({ ...Apply, loading: false });
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="MovieDetails">
            {/* Loader  */}
            {job.loading === true && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {job.loading === false && job.err == null && (
                <>
                    <div className="row">
                        <div className="">
                            <h3>Employer Name : {job.result.employer_name} </h3>
                            <h3>Job Name : {job.result.name} </h3>
                            <h3>Job Type : {job.result.job_type} </h3>
                            <h3>Date : {formatDate(job.result.post_creation_date)} </h3>
                            <h3>Description : {job.result.description}</h3>
                            <h3>Salary : {job.result.salary}</h3>
                        </div>
                    </div>

                    <hr />
                    {Apply.success && (
                        <Alert variant="success" className="p-2">
                            {Apply.success}
                        </Alert>
                    )}

                    {auth && auth.role === 0 && !hasApplied && (
                        <Form onSubmit={sendApply}>
                            <h5>Application </h5>
                            <br></br>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Please enter your name"
                                    value={([Apply.name] = [auth.name])}
                                    onChange={(e) => setApply({ ...Apply, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Please enter your email"
                                    value={([Apply.email] = [auth.email])}
                                    onChange={(e) =>
                                        setApply({ ...Apply, email: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Please enter your phone"
                                    value={([Apply.phone] = [auth.phone])}
                                    onChange={(e) =>
                                        setApply({ ...Apply, phone: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Please enter your age"
                                    value={([Apply.age] = [auth.age])}
                                    onChange={(e) => setApply({ ...Apply, age: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <input type="file" className="form-control" ref={cv} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <button className="btn btn-dark w-100"> Send Apply</button>
                            </Form.Group>
                        </Form>
                    )}
                </>
            )}
            {auth && auth.role === 0 && hasApplied && (
                <Alert variant="info" className="p-2">
                    You have already applied for this job.
                </Alert>
            )}
            {job.loading === false && job.err != null && (
                <Alert variant="danger" className="p-2">
                    {job.err}
                </Alert>
            )}
            {!auth && (
                <Alert variant="danger" className="p-2">
                    please login first
                </Alert>
            )}
        </div>
    );
};

export default JobDetails;
