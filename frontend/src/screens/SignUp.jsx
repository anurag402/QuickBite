import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://quick-bite-backend.vercel.app/api/v1/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json();
    if (!json.success) {
      alert(json.message);
    }
    if (json.success) {
      window.scrollTo(0,0);
      navigate("/");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div className='ctnWrapper'>
      <div className='container'>
        <div className='formWrapper'>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name="email" value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
              <input type="text" className="form-control" name="geolocation" value={credentials.address} id="exampleInputPassword1" onChange={onChange} />
            </div>
            <button type="submit" className=" btn btn-success w-100 mt-3">Submit</button>
            <Link to="/login" className=' btn btn-danger w-100 mt-3'>Already a user?</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
