import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const userDetails = useSelector((state) => state.reducer.userDetails);
    const handleLogout = ()=>{
      navigate('/logout');
    }
    const imageUrl = '../../../public/images.jpg'
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ backgroundImage: `url(${imageUrl})`,backgroundSize: 'cover', }}>
            <div className="bg-opacity-40 bg-black p-8 rounded shadow-md w-full max-w-md">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-center text-white text-opacity-90">
                        Welcome, {userDetails.name}
                    </h1>
                </div>
                <div className="flex justify-center">
                    <Link to="/profile" className="bg-blue-500 text-white p-2 rounded mr-4">
                        Profile
                    </Link>
                    <button
                        className="bg-red-500 text-white p-2 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;