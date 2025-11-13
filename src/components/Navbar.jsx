import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logged out successfully');
                // Navigate will happen automatically as user state changes
            })
            .catch((error) => toast.error(error.message));
    };

    // This is for NavLink active styling
    const activeLinkClass = ({ isActive }) =>
        isActive ? 'text-blue-500 font-bold' : 'hover:text-blue-400';

    // Common links for everyone
    const commonLinks = (
        <>
            <li><NavLink to="/" className={activeLinkClass}>Home</NavLink></li>
            <li><NavLink to="/available-foods" className={activeLinkClass}>Available Foods</NavLink></li>    </>
    );

    // Links to show ONLY when logged in [cite: 29]
    const loggedInLinks = (
        <>
            <li><NavLink to="/add-food" className={activeLinkClass}>Add Food</NavLink></li>
            <li><NavLink to="/manage-my-foods" className={activeLinkClass}>Manage My Foods</NavLink></li>
            <li><NavLink to="/my-food-requests" className={activeLinkClass}>My Food Requests</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="navbar-start">
                {/* --- Mobile Dropdown Menu --- */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">
                        {commonLinks}
                        {user && loggedInLinks}
                    </ul>
                </div>

                {/* --- Website Logo & Name --- */}
                <Link to="/" className="btn btn-ghost text-xl font-bold">
                    PlateShare
                </Link>
            </div>

            {/* --- Desktop Menu --- */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {commonLinks}
                    {user && loggedInLinks}
                </ul>
            </div>

            {/* --- Right Side (Login/Logout) --- */}
            <div className="navbar-end">
                {/* Show a spinner while loading user info */}
                {loading ? (
                    <span className="loading loading-spinner"></span>
                ) : user ? (
                    // --- If User is Logged In --- [cite: 33]
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar" title={user.displayName}>
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Profile"
                                    src={user.photoURL}
                                />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="p-2"><strong>{user.displayName}</strong></li>
                            <li>
                                <button onClick={handleLogout} className="btn btn-ghost">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    // --- If User is Logged Out --- [cite: 28]
                    <Link to="/login" className="btn btn-primary bg-blue-600 text-white hover:bg-blue-700">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
