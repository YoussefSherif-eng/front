import React, {  useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { getAuthUser } from "../../helper/storage";

const AddEmployer = () => {
    const auth = getAuthUser();

    const [employer, setEmployer] = useState({
        name: "",
        email: "",
        password: "",
        err: "",
        loading: false,
        success: null,
    });


    const createEmployer = (e) => {
        e.preventDefault();
        setEmployer({ ...employer, loading: true });
        axios.post("http://localhost:4000/auth/registerEmployers", {
            name: employer.name,
            email: employer.email,
            password: employer.password
        },
            {
                headers: {
                    token: auth.token,
                }
            })
            .then((resp) => {
                setEmployer({
                    name: "",
                    email: "",
                    password: "",
                    err: null,
                    loading: false,
                    success: "Employer Created Successfully !",
                });
            })
            .catch((err) => {
                setEmployer({
                    ...employer,
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
                <h1>Add New Employer </h1>
                {employer.err && (
                    <Alert variant="danger" className="p-2">
                        {employer.err}
                    </Alert>
                )}

                {employer.success && (
                    <Alert variant="success" className="p-2">
                        {employer.success}
                    </Alert>
                )}
                <Form onSubmit={createEmployer}>
                    <br></br>
                    <Form.Group className="mb-3" >
                        <Form.Control required value={employer.name} onChange={(e) => setEmployer({ ...employer, name: e.target.value })} type="text" placeholder="Job Name" />
                    </Form.Group>

                    <br></br>

                    <Form.Group className="mb-3" >
                        <Form.Control required value={employer.email} onChange={(e) => setEmployer({ ...employer, email: e.target.value })} type="email" placeholder="email" />
                    </Form.Group>

                    <br></br>
                    <Form.Group className="mb-3" >
                        <Form.Control required value={employer.password} onChange={(e) => setEmployer({ ...employer, password: e.target.value })} type="password" placeholder="password" />
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

export default AddEmployer;