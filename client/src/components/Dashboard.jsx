import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [token] = useState(localStorage.getItem('token'))
  const [dashboard,setDashboard] = useState("Loading...")

const verifyToken = async () =>{
  const uri = 'http://localhost:3000/';
            
  const res = await fetch(uri,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'authorization': `Bearer ${token}`
    }
  })
  if(!res.ok) return false;
  return res;
}

const checkAuth = async()=> {
  try{
    const isAuthenticated = await verifyToken();
    if(!isAuthenticated){
      window.location.href ='/'
    }
    else{
      setDashboard("Welcome To Dashboard Page !");
    }
  }
catch(error){
  alert(error);
  window.location.href ='/'
}
}

  useEffect(() => {
    checkAuth();
  }, [token])
  
  return (
    <div>
      {dashboard}
    </div>
  )
}

export default Dashboard
