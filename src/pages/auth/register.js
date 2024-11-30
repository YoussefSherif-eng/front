import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../css/register.css"
import Alert from 'react-bootstrap/Alert';
import { setAuthUser } from "../../helper/storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
    const navigate = useNavigate();

    const [register, setRegister] = useState({

        email: "",
        password: "",
        name: "",
        phone: "",
        age: "",
        role: "",
        loading: false,
        err: [],
    });
    const RegisterFun = (e) => {
        e.preventDefault();
        setRegister({ ...register, loading: true, err: [] });
        axios.post("http://localhost:4000/auth/register", {
            email: register.email,
            password: register.password,
            name: register.name,
            phone: register.phone,
            age: register.age,
            role: "0"
        }).then(resp => {
            setRegister({ ...register, loading: false, err: [] });
            setAuthUser(resp.data)
            navigate("/login");
        }).catch(errors => {
            setRegister({ ...register, loading: false, err: errors.response.data.errors });
        })
    }
    return (
        <div className="register-container">
            <h1>Registration </h1>
            {register.err.map((error, index) => (
                <Alert key={index} variant="danger" className="p-2">
                    {error.mag}
                </Alert>
            ))}
            <Form onSubmit={RegisterFun}>
                <br></br>
                <Form.Group className="mb-3" >
                    <Form.Control
                        type="text"
                        placeholder="Please enter your name"
                        value={register.name}
                        onChange={(e) => setRegister({ ...register, name: e.target.value })}
                    />
                </Form.Group>

                <br></br>
                <Form.Group className="mb-3" >
                    <Form.Control
                        type="email"
                        placeholder="Please enter your email"
                        value={register.email}
                        onChange={(e) => setRegister({ ...register, email: e.target.value })}
                    />
                </Form.Group>

                <br></br>
                <Form.Group className="mb-3" >
                    <Form.Control
                        type="password"
                        placeholder="Please enter your password"
                        value={register.password}
                        onChange={(e) => setRegister({ ...register, password: e.target.value })}
                    />
                </Form.Group>
                <br></br>
                <Form.Group className="mb-3" >
                    <Form.Control
                        type="number"
                        placeholder="Please enter your phone"
                        value={register.phone}
                        onChange={(e) => setRegister({ ...register, phone: e.target.value })}
                    />
                </Form.Group>
                <br></br>
                <Form.Group className="mb-3" >
                    <Form.Control
                        type="number"
                        placeholder="Please enter your age"
                        value={register.age}
                        onChange={(e) => setRegister({ ...register, age: e.target.value })}
                    />
                </Form.Group>

                <br></br>
                <Button className="btn btn-dark w-100" variant="primary" type="submit">
                    Registration
                </Button>
            </Form> 
        </div>
    );
};

export default Register;