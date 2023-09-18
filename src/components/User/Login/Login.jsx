import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../services/axios/axios';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [emailExist, setEmailExits] = useState('');
    const [formdata, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formdata, [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formdata);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axiosInstance.post('/userLogin', formdata);
                if (response.status === 200) {
                    localStorage.setItem('token', response.data);
                    navigate('/userProfile');
                }
            } catch (err) {
                console.log(err);
                if(err.response.status === 401){
                    setEmailExits('Incorrect email or password');
                }
            }
        } else {
            setErrors(validationErrors);
        }
    }

    const validateForm = (data) => {
        const errors = {}
        if (!data.email) {
            errors.email = 'Email is  required';
        }

        if (!data.password) {
            errors.password = 'Password is required';
        }
        return errors;
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/userProfile');
        } else {
            navigate('/');
        }
    }, [])
    return (
        <>
            <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        class="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div class="max-w-md mx-auto">
                            <div>
                                <h1 class="font-bold text-3xl text-gray-900">LOGIN</h1>
                            </div>
                            <div>
                                {emailExist && <p className="text-red-500 text-sm mt-1">{emailExist}</p>}
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div class="divide-y divide-gray-200">
                                    <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div class="relative">
                                            <input value={formdata.email} onChange={handleOnChange} id="email" name="email" type="text" className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none ${errors.email ? 'border-red-500' : ''} focus:borer-rose-600`} placeholder="Email address" />
                                            <label class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                        <div class="relative">
                                            <input value={formdata.password} onChange={handleOnChange} id="password" name="password" type="password" className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none ${errors.password ? 'border-red-500' : ''} focus:borer-rose-600`} placeholder="Password" />
                                            <label class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                            {errors.password && (
                                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                            )}
                                        </div>
                                        <div class="relative flex items-center justify-between">
                                            <button class="bg-blue-500 text-white rounded-md px-2 py-1">Login</button>
                                            <button class="bg-blue-500 text-white rounded-md px-2 py-1 ml-2" onClick={() => navigate('/userSignup')}>Signup</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login