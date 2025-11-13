import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import './index.css';
import 'react-toastify/dist/ReactToastify.css';


import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import AuthProvider from './context/AuthContext.jsx'; 


import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AvailableFoods from './pages/AvailableFoods.jsx';
import AddFood from './pages/AddFood.jsx';
import ManageMyFoods from './pages/ManageMyFoods.jsx';
import MyFoodRequests from './pages/MyFoodRequests.jsx';
import FoodDetails from './pages/FoodDetails.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import UpdateFood from './pages/UpdateFood.jsx';


import PrivateRoute from './routes/PrivateRoute.jsx';


const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/available-foods", element: <AvailableFoods /> },
      { path: "/add-food", element: <PrivateRoute><AddFood /></PrivateRoute> },
      { path: "/manage-my-foods", element: <PrivateRoute><ManageMyFoods /></PrivateRoute> },
      { path: "/my-food-requests", element: <PrivateRoute><MyFoodRequests /></PrivateRoute> },
      { path: "/food/:id", element: <PrivateRoute><FoodDetails /></PrivateRoute> },
      {
        path: "/update-food/:id",
        element: <PrivateRoute><UpdateFood /></PrivateRoute>,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <QueryClientProvider client={queryClient}>
    
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={3000} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);