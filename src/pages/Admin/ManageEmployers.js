import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/esm/Table";
import { getAuthUser } from "../../helper/storage";

const ManageEmployers = () => {
    const auth = getAuthUser();

    const [employers, setEmployers] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });

    useEffect(() => {
        setEmployers({ ...employers, loading: true });
        axios
            .get("http://localhost:4000/jobs/employers", {
                headers: {
                    token: auth.token
                }
            })
            .then((resp) => {
                console.log(resp);
                setEmployers({ ...employers, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setEmployers({
                    ...employers,
                    loading: false,
                    err: " something went wrong, please try again later ! ",
                });
            });
    }, [employers.reload]);
    const deleteEmployer = (id) => {
        axios.delete("http://localhost:4000/jobs/deleteEmployer/" + id,
            {
                headers: {
                    token: auth.token
                }
            })
            .then((resp) => {
                setEmployers({ ...employers, reload: employers.reload + 1 });
            })
            .catch((err) => { }
            );
    }

    return (
        <div className="home-container p-5">
            <div className=" d-flex justify-content-between mb-5">
                <h3 className="mb-3">Manage Employers</h3>
                <Link to={"addEmployer"} className=" btn btn-success">Add New Employer</Link>
            </div>
            {employers.loading === true && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {employers.loading === false && employers.err == null && (
                <>

                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Employer Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employers.results.map(employer => (
                                    <tr key={employer.id}>
                                        <td>{employer.id}</td>
                                        <td>{employer.name}</td>
                                        <td>{employer.email}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={(e) => { deleteEmployer(employer.id) }}>Delete</button>
                                            <Link to={"" + employer.id} className="btn btn-sm btn-primary mx-2">Update</Link>
                                            <Link to={"/E/" + employer.id} className="btn btn-sm btn-info">Show</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </>
            )}

            {employers.loading === false && employers.err != null && (
                <Alert variant="danger" className="p-2">
                    {employers.err}
                </Alert>
            )}

            {employers.loading === false &&
                employers.err == null &&
                employers.results.length === 0 && (
                    <Alert variant="info" className="p-2">
                        No jobs, please try again later !
                    </Alert>
                )}
        </div>
    );
};

export default ManageEmployers;