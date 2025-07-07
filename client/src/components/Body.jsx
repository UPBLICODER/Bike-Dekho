import React from 'react'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import Login from './Login';
import Dashboard from './Dashboard';

const appRouter = createBrowserRouter(
  [
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/dashboard',
      element:<Dashboard/>
    }
  ]
);

const Body = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body