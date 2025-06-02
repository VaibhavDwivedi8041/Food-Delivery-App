// import React,{useState} from 'react'
// import { Link,useNavigate } from 'react-router-dom'
// export default function Login() {
//   const [credentials, setcredentials] = useState({email:"",password:""})
//   let navigate=useNavigate()
//   const handlesubmit=async(e)=>{
//       e.preventDefault();
//       console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
//       const response=await fetch("http://localhost:5000/api/loginuser",{
//         method:'POST',
//         headers:{
//           'Content-Type':'application/json'
//         },
//         body:JSON.stringify({email:credentials.email,password:credentials.password})
//       }

//       )
//           const json=await response.json()
//           console.log(json);

//           if(!json.success){
//             alert("Enter Valid Credentials")
//           }
//           if(json.success){
//             localStorage.setItem("userEmail",credentials.email);
//             localStorage.setItem("authToken",json.authToken);
//             console.log(localStorage.getItem("authToken"))
//             navigate("/");
//           }
//   }
//   const onChange=(event)=>{
//       setcredentials({...credentials,[event.target.name]:event.target.value})
//   }

//   return (
//     <div>
//       <div className='container'>
//         <form onSubmit={handlesubmit}>
          
//           <div>
//             <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
//             <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
//             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//           </div>
//           <div className="mb-3">
//             <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
//             <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
//           </div>
          

//           <button type="submit" className="m-3 btn btn-success">Submit</button>
//           <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new user</Link>
//         </form>
//       </div>
//     </div>
//   )
// }

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Use environment variable or direct Render URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || "https://food-delivery-app-backend-24sc.onrender.com"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/api/loginuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message || 'Login failed')
      }

      if (!json.success) {
        setError("Invalid email or password")
        return
      }

      // Login successful
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      navigate("/")
      
    } catch (err) {
      console.error("Login error:", err)
      setError(err.message || "An error occurred during login")
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
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    value={credentials.email} 
                    onChange={onChange} 
                    id="email" 
                    required
                  />
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
                  />
                </div>

                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : 'Login'}
                  </button>
                  
                  <Link to="/createuser" className="btn btn-link text-center">
                    Don't have an account? Register here
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