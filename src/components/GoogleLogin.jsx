import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // This will send the user back to the page they were on before logging in
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        toast.success('Successfully logged in!');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="form-control mt-4">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-primary"
      >
        <FaGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;