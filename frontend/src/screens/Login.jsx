import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://quick-bite-backend.vercel.app/api/v1/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    if (!json.success) {
      alert("Enter Valid Credentials");
    }

    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      window.scrollTo(0,0);
      navigate("/");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <div className="ctnWrapper">
      <div className='container'>
        <div className="formWrapper">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name="email" value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">Submit</button>
            <Link to="/createuser" className='btn btn-danger w-100 mt-3'>I am a new user</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
