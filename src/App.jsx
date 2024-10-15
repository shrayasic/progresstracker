import React from 'react';
import Layout from './components/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Body';
import TaskPage from './components/TaskPge';
import Error from './components/Error';
import './index.css';

function App() {
  const routerapp = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/goal/:goalId",  // Dynamic route for each goal
          element: <TaskPage />,
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routerapp}></RouterProvider>
    </>
  );
}

export default App;
