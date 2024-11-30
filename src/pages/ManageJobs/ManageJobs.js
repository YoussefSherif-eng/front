import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "../../css/ManageJobs.css"
import { Link } from "react-router-dom";
// import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { getAuthUser } from "../../helper/storage";


const ManageJobs = () => {
    const auth = getAuthUser();

    const [jobs, setJobs] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0,
    });
    useEffect(() => {
        setJobs({ ...jobs, loading: true });
        axios
            .get("http://localhost:4000/jobs/jobE/" + [auth.id] ,
            {
                headers: {
                    token: auth.token
                }
            })
            .then((resp) => {
                console.log(resp);
                setJobs({ ...jobs, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setJobs({
                    ...jobs,
                    loading: false,
                    err: " something went wrong, please try again later ! ",
                });
            });
    }, [jobs.reload]);
    const deleteMovie = (id) => {
        axios.delete("http://localhost:4000/jobs/delete/" + id,
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
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
    return (
        <div className="ManageMovies p-5">
            <div className=" d-flex justify-content-between mb-5">
                <h3 className="mb-3">Manage Job</h3>
                <Link to={"add"} className=" btn btn-success">Add New Job</Link>
            </div>
            {/* <Alert variant="danger" className="p-2">
                simple alert
            </Alert>
            <Alert variant="success" className="p-2">
                simple alert
            </Alert> */}
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Job Type</th>
                        <th>Date</th>
                        <th>Details</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        jobs.results.map(movie => (
                            movie.status === 'accepted' && (

                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.name}</td>
                                <td>{movie.job_type}</td>
                                <td>{formatDate(movie.post_creation_date)}</td>
                                <td>{movie.description} </td>
                                <td>{movie.salary}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={(e) => { deleteMovie(movie.id) }}>Delete</button>
                                    <Link to={""+movie.id} className="btn btn-sm btn-primary mx-2">Update</Link>
                                    <Link to={"/Job/Details/" + movie.id} className="btn btn-sm btn-info">Show</Link>
                                </td>
                            </tr>
                            )
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default ManageJobs;