import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = uuidv4();

      const userDataWithId = { ...formData, id };

      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDataWithId) 
      });
      if (response.ok) {
        console.log('User added successfully');
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h4>Add User</h4>
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
        <form onSubmit={handleSubmit}>
          <div className="mb-3" style={{ width: '300px' }}>
            <label className="form-label">User Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3" style={{ width: '300px' }}>
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-3" style={{ width: '300px' }}>
            <label className="form-label">Gender</label>
            <input type="text" className="form-control" name="gender" value={formData.gender} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginRight: '30px' }}>Add</button>
          <Link to="/">
            <button className="btn btn-primary" >Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
