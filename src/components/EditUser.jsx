// EditUser.js

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate  } from 'react-router-dom';

export default function EditUser() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: ''
    });

    useEffect(() => {
        fetchUserData();
        console.log(userId)
    }, []);

//---------------------------fetched single user data------------------------
    const fetchUserData = async () => {
        try {
            const data = await fetch(`http://localhost:3001/users/${userId}`);
            const response = await data.json();
            setUser(response);
        } catch (error) {
            console.log('error', error);
        }
    };


    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

//------------------------------update single user data--------------------------
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            navigate('/'); 
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h4>User Edit</h4>
            <div
                style={{
                    width: '400px',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid gray'
                }}>
                <form onSubmit={handleUpdateUser}>
                    <div className="mb-3" style={{ width: '300px' }}>
                        <label className="form-label">User Name</label>
                        <input type="text" className="form-control" name="name" value={user.name} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3" style={{ width: '300px' }}>
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={handleInputChange} />
                    </div>
                    <div className="mb-3" style={{ width: '300px' }}>
                        <label className="form-label">Gender</label>
                        <input type="text" className="form-control" name="gender" value={user.gender} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginRight: '30px' }}>Update</button>
                    <Link to="/">
                        <button className="btn btn-primary" >Back</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}
