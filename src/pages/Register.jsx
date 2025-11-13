import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import GoogleLogin from '../components/GoogleLogin';

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);

       
        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);

                
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('User profile updated');
                        reset(); 
                        toast.success('Registration Successful!');
                        navigate('/'); 
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Join PlateShare to help reduce food waste and support your community. Sign up to start sharing and receiving food today.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                       
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                placeholder="Your Name"
                                className="input input-bordered"
                            />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>

                      
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                {...register('photoURL', { required: true })}
                                placeholder="http://example.com/photo.jpg"
                                className="input input-bordered"
                            />
                            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        </div>

                        
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


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*[A-Z])(?=.*[a-z])/,
                                })}
                                placeholder="password"
                                className="input input-bordered"
                            />
                           
                            {errors.password?.type === 'required' && (
                                <span className="text-red-600">Password is required</span>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <span className="text-red-600">Password must be 6 characters long</span>
                            )}
                            {errors.password?.type === 'pattern' && (
                                <span className="text-red-600">Password must have one Uppercase and one Lowercase letter</span>
                            )}
                        </div>

                      
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>

                    <div className="card-body pt-0">
                     
                        <GoogleLogin />

                        
                        <p className="text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 font-bold">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;