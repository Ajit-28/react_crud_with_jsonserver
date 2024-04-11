import React, { useEffect, useState } from 'react';
import EditModal from './EditUser';
import { Link } from 'react-router-dom';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);
    //-------------------getUsers------------------------
    const fetchUserData = async () => {
        try {
            const data = await fetch("http://localhost:3001/users");
            const response = await data.json();
            setUsers(response);
        } catch (error) {
            console.log('error', error);
        }
    };
    //-------------------deleteUsers------------------------
    const deleteUser = async (userId) => {
        try {
            await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.log('error', error);
        }
    };


    return (
        <div className='container'>
            <Link to="/adduser">
                <button type="button" className="btn btn-success">Add</button>
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>
                                    <Link to={`/edit/${user.id}`}>
                                        <button type="button" className="btn btn-primary m-2">Edit</button>
                                    </Link>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
