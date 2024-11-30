import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { getAuthUser } from "../../helper/storage";
import { useParams } from "react-router-dom";

const UpdateEmployer = () => {
    const auth = getAuthUser();
    let { id } = useParams();


    const [employers, setEmployers] = useState({
        name: "",
        email: "",
        password: "",
        image_url: null,
        err: "",
        loading: false,
        success: null,
        reload: false
    });
    useEffect(() => {
        axios.get("http://localhost:4000/jobs/employers/all/" + id,
        {
            headers: {
                token: auth.token,
            }
        })
            .then((resp) => {
                setEmployers({
                    name: resp.data.name,
                    email: resp.data.email,
                });
            })
            .catch((err) => {
                setEmployers({
                    ...employers,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });

            }
            );
    }, [employers.reload])
    const UpdateEmployer = (e) => {
        e.preventDefault();
        setEmployers({ ...employers, loading: true });
        axios.put("http://localhost:4000/jobs/updateEmployer/" + id, {
            name: employers.name,
            email: employers.email,
        },
            {
                headers: {
                    token: auth.token,
                }
            })
            .then((resp) => {
                setEmployers({
                    ...employers,
                    loading: false,
                    reload: employers.reload + 1,
                    success: " Done",
                })
            })
            .catch((err) => {
                setEmployers({
                    ...employers,
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
                <h1>Update Job </h1>
                {employers.err && (
                    <Alert variant="danger" className="p-2">
                        {employers.err}
                    </Alert>
                )}

                {employers.success && (
                    <Alert variant="success" className="p-2">
                        {employers.success}
                    </Alert>
                )}
                <Form onSubmit={UpdateEmployer}>
                    
                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Employer Name" value={employers.name} onChange={(e) => setEmployers({ ...employers, name: e.target.value })} />
                    </Form.Group>
                    <br></br>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="email" value={employers.email} onChange={(e) => setEmployers({ ...employers, email: e.target.value })} />
                    </Form.Group>
                    <br></br>



                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="password" value={employers.password} onChange={(e) => setEmployers({ ...employers, password: e.target.value })} />
                    </Form.Group>

                    <br></br>
                    <Button className="btn btn-dark w-100" variant="primary" type="submit">
                        Update Job
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default UpdateEmployer;