import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
// import GoogleLogin from '../components/GoogleLogin';

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
        toast.success('Welcome back, foodie!');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 flex justify-center items-center px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 animate-fadeIn">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Welcome Back 🍽️
        </h1>
        <p className="text-center text-gray-200 mb-8 text-sm">
          Login to <span className="font-semibold">PlateShare</span> and help fight hunger.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              {...register('email', { required: true })}
              id="email"
              className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute text-gray-300 text-sm left-4 top-2.5 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-pink-300"
            >
              Email
            </label>
            {errors.email && <span className="text-pink-300 text-sm">Email is required</span>}
          </div>
          <div className="relative">
            <input
              type="password"
              {...register('password', { required: true })}
              id="password"
              className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute text-gray-300 text-sm left-4 top-2.5 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-pink-300"
            >
              Password
            </label>
            {errors.password && <span className="text-pink-300 text-sm">Password is required</span>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg text-white font-semibold shadow-lg transition-all hover:scale-[1.03] hover:shadow-pink-500/50 focus:ring-2 focus:ring-pink-300"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          {/* <GoogleLogin /> */}
          <p className="text-gray-300">
            New to PlateShare?{' '}
            <Link
              to="/register"
              className="text-pink-300 hover:text-white font-semibold transition-all"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;