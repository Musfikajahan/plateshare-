import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import GoogleLogin from '../components/GoogleLogin';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

 
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success('Login Successful!');
        navigate(from, { replace: true }); 
      })
      .catch((error) => {
        toast.error(error.message); 
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Welcome back to PlateShare. Login to manage your food donations, see requests, and find available food near you.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="email@example.com"
                className="input input-bordered"
              />
              {errors.email && <span className="text-red-600">Email is required</span>}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register('password', { required: true })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && <span className="text-red-600">Password is required</span>}
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="card-body pt-0">
         
            <GoogleLogin />

           
            <p className="text-center">
              New to PlateShare?{' '}
              <Link to="/register" className="text-blue-600 font-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;