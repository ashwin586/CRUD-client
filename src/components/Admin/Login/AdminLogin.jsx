import React, { useState } from 'react'
import axiosInstance from '../../../services/axios/axios'
import {useNavigate} from  'react-router-dom'

const AdminLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await axiosInstance.post('/admin/adminLogin', {email,password})
            console.log(response.data)
            if(response.data && response.data.adminData){
                localStorage.setItem('token', response.data.adminToken)
                navigate('/dashboard');
            } else {
                alert(response.data.message);
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
                <h1 className="font-bold text-2xl">Welcome Back Admin</h1>
                <form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" onSubmit={handleSubmit}>
                    <label className="font-semibold text-xs" htmlFor="usernameField">
                        Email
                    </label>
                    <input
                        className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
                        Password
                    </label>
                    <input
                        className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}

export default AdminLogin;