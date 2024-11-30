import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/login.css";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser } from "../../helper/storage";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: "",
        loading: false,
        err: [],
    });
    const LoginFun = (e) => {
        e.preventDefault();
        setLogin({ ...login, loading: true, err: [] });
        axios.post("http://localhost:4000/auth/login", {
            email: login.email,
            password: login.password,
        }).then(resp => {
            setLogin({ ...login, loading: false, err: [] });
            setAuthUser(resp.data)
            navigate("/");
        }).catch(errors => {
            setLogin({ ...login, loading: false, err: errors.response.data.errors });
        })
    }
    return (
        <div className="login-container">
            <h1>Login </h1>
            {login.err.map((error , index) => (
                <Alert key={index} variant="danger" className="p-2">
                    {error.mag}
                </Alert>
            ))}
            <Form onSubmit={LoginFun}>
                <br></br>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        required
                        placeholder="Please enter your email"
                        value={login.email}
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    />
                </Form.Group>

                <br></br>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        required
                        placeholder="Please enter your password"
                        value={login.password}
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                    />
                </Form.Group>

                <br></br>
                <Button className="btn btn-dark w-100" variant="primary" type="submit" disabled={login.loading === true}>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
