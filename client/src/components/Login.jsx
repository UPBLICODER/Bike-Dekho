import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { checkValidData } from '../utils/validate'

const Login = () => {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem('token'))

  const [isSignIn,setIsSignIn] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  
  function toggleSignIn(){
    setIsSignIn(!isSignIn);
  }

  const verifyToken = async () =>{
    try{
      const res = await fetch('http://localhost:3000/',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'authorization': `Bearer ${token}`
        }
      })
      return res.ok;
    } 
    catch{
      return false;
    }    
  }

  const checkUserAuthenticated = async () => {
    if(token){
      // verify token
      const isAuthenticated = await verifyToken();
      if(isAuthenticated) navigate('/dashboard');
      else navigate('/');
    }
  }

  useEffect(()=>{
    checkUserAuthenticated();
  },[])

  const submitFormHandler = async () => {

    const message = isSignIn
      ? checkValidData(email.current.value, password.current.value)
      : checkValidData(email.current.value, password.current.value, name.current.value);
  
    setErrorMessage(message);
    if (message) return;
  
    const endpoint = isSignIn ? 'http://localhost:3000/user/login' : 'http://localhost:3000/user/register';
  
    const payload = isSignIn
      ? { "email": email.current.value.trim(), "password": password.current.value.trim() }
      : { "name": name.current.value.trim(), "email": email.current.value.trim(), "password": password.current.value.trim() };
  
    // sign in / sign up logic
  
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(payload)
      })
  
      if (!res.ok) {
        const errorMsg = await res.json();
        // console.log("error",errorMsg.error)
        throw new Error(errorMsg.error);
      }
  
      const data = await res.json();
  
      // storing token in localstorage for protected routes
      localStorage.setItem('token', data.token);
      setErrorMessage(data.message);
      setTimeout(() => navigate('/dashboard'), 1000)
    }
    catch(error) {
      setErrorMessage(error.message)
    }
  
  }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <form onSubmit={(e)=>{e.preventDefault(); submitFormHandler();}}className="shadow bg-body-tertiary rounded-3 p-5" style={{width:'96%',maxWidth:'400px'}} noValidate>
            <h2 className='py-2'>{isSignIn?'Sign In':'Sign Up'}</h2>
            {!isSignIn && <input ref={name} type="text" name="full_name" className="form-control py-2 my-2" placeholder="Full Name"/>}
            <input ref={email} type="email" name="email" className="form-control py-2 my-2" placeholder="Email Address" autoComplete="1"/>
            <input ref={password} type="password" name="password" className="form-control py-2 my-2" placeholder="Password"/>

            <p className="text-danger fw-bold my-1">{errorMessage}</p>
            <input type="submit" name={isSignIn?"login":"signup"} className="btn btn-primary w-100 my-2" value={isSignIn?"Sign In":"Sign Up"}/>
            <p className="my-2 pe-auto" onClick={toggleSignIn} style={{cursor:'pointer'}}>
              {isSignIn?"Don't have an account? Sign up":"Already have an account? Log in"}
            </p>
        </form>
    </div>
  )
}

export default Login