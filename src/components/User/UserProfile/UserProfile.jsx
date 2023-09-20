import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'
import axiosInstance from '../../../services/axios/axios';

const UserProfile = () => {
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            axiosInstance.get('/userProfile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setUser(response.data);
            }).catch((err) => {
                console.log(err.response);
            })
        }

    }, []);

    const signOut = () => {
        localStorage.removeItem('token')
        navigate('/');
    }

    const updateUser = (id) =>{
        navigate(`/userUpdate/${id}`, id);
    }


    return (
        <>
            <div className='wrapper'>
                <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                    <img src={`http://localhost:5000/${user?.image}`} alt={user?.image} className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                    <div className="space-y-4 text-center divide-y divide-gray-700">
                        <div className="my-2 space-y-1">
                            <h2 className="text-xl font-semibold sm:text-2xl"><span>{user.firstName}</span> {user.lastName}</h2>
                            <p className="px-5 text-xs sm:text-base dark:text-gray-400">{user.phoneNo}</p>
                            <p className="px-5 text-xs sm:text-base dark:text-gray-400">{user.email}</p>
                            <p className="px-5 text-xs sm:text-base dark:text-gray-400">{user.date}</p>
                        </div>
                        <div className="flex justify-center pt-2 space-x-4 align-center">
                            <button
                                onClick={() => updateUser(user._id)}
                                type="button"
                                className="dark:bg-green-500 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
                                Edit Profile
                            </button>
                            <button
                                onClick={signOut}
                                type="button"
                                className="dark:bg-red-500 inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#ff0000] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(255, 0, 0, 0.3),0_4px_18px_0_rgba(255, 0, 0, 0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(255, 0, 0, 0.3),0_4px_18px_0_rgba(255, 0, 0, 0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(255, 0, 0, 0.3),0_4px_18px_0_rgba(255, 0, 0, 0.2)] dark:shadow-[0_4px_9px_-4px_rgba(255, 0, 0, 0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(255, 0, 0, 0.2),0_4px_18px_0_rgba(255, 0, 0, 0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(255, 0, 0, 0.2),0_4px_18px_0_rgba(255, 0, 0, 0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(255, 0, 0, 0.2),0_4px_18px_0_rgba(255, 0, 0, 0.1)]">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile