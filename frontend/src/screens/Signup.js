// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// export default function Signup() {
//   const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }))
//     const response = await fetch("http://localhost:5000/api/CreateUser", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
//     }

//     )
//     const json = await response.json()
//     console.log(json);

//     if (!json.success) {
//       alert("Enter Valid Credentials")
//     }
//   }
//   const onChange = (event) => {
//     setcredentials({ ...credentials, [event.target.name]: event.target.value })
//   }

//   return (
//     <>
//       <div className='container'>
//         <form onSubmit={handlesubmit}>
//           <div className="mb-3">
//             <label htmlfor="name" className="form-label">UserName</label>
//             <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
//           </div>
//           <div>
//             <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
//             <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
//             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//           </div>
//           <div className="mb-3">
//             <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
//             <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
//           </div>
//           <div className="mb-3">
//             <label htmlfor="exampleInputPassword1" className="form-label">Address</label>
//             <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" />
//           </div>

//           <button type="submit" className="m-3 btn btn-success">Submit</button>
//           <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
//         </form>
//       </div>
//     </>
//   )
// }

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [credentials, setCredentials] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    geolocation: "" 
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  // Use environment variable or direct Render URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || "https://food-delivery-app-backend-24sc.onrender.com"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      console.log('Creating user:', {
        name: credentials.name,
        email: credentials.email,
        location: credentials.geolocation
      })

      const response = await fetch(`${API_BASE_URL}/api/CreateUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation
        })
      })

      const json = await response.json()
      console.log('Signup response:', json)

      if (!response.ok) {
        throw new Error(json.message || 'Signup failed')
      }

      if (!json.success) {
        setError(json.message || "Please enter valid credentials")
        return
      }

      // Signup successful
      setSuccess(true)
      setTimeout(() => {
        navigate("/login")
      }, 2000)
      
    } catch (err) {
      console.error("Signup error:", err)
      setError(err.message || "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create Account</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  Account created successfully! Redirecting to login...
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    value={credentials.name} 
                    onChange={onChange} 
                    id="name"
                    required
                    minLength="2"
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    value={credentials.email} 
                    onChange={onChange} 
                    id="email" 
                    aria-describedby="emailHelp"
                    required
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="password" 
                    value={credentials.password} 
                    onChange={onChange} 
                    id="password"
                    required
                    minLength="6"
                  />
                  <div className="form-text">
                    Password must be at least 6 characters long.
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="geolocation" className="form-label">Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="geolocation" 
                    value={credentials.geolocation} 
                    onChange={onChange} 
                    id="geolocation"
                    placeholder="Enter your full address"
                    required
                  />
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Account...
                      </>
                    ) : 'Create Account'}
                  </button>
                  
                  <Link to="/login" className="btn btn-link text-center">
                    Already have an account? Login here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}