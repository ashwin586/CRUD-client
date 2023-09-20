import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../services/axios/axios';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('adminToken')
        navigate('/admin')
    }

    const addUser = () => {
        navigate('/addUser');
    }

    const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteUser = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this user?")) {
                const response = await axiosInstance.delete(`/admin/adminDeleteUser/${id}`, id)
                if (response.data.email) {
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== id))
                } else {
                    alert(response.data.message);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateUser = async (id) => {
        try {
            navigate(`/editUser/${id}`, id);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin');
        } else {

            axiosInstance.get('/admin/loadDashboard').then((response) => {
                setUsers(response.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, []);
    return (
        <>
            <div className="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">
                <section className="mb-20 text-gray-800">
                    <div className="block rounded-lg shadow-lg bg-white">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <div className="col-sm-6">
                                            <input type="search"
                                                placeholder='Search Users'
                                                name=""
                                                id=""
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="border border-gray-300 px-3 py-2 rounded-md mr-4 focus:outline-none focus:border-blue-500 transition duration-300"
                                            />
                                            <button onClick={logout} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4 transition duration-300 ease-in-out">
                                                Log out
                                            </button>

                                            <button onClick={addUser} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
                                                Add User
                                            </button>
                                        </div>
                                        <table className="min-w-full mb-0">
                                            <thead className="border-b bg-gray-50 rounded-t-lg text-left">
                                                <tr>
                                                    <th scope="col" className="rounded-tl-lg text-sm font-medium px-6 py-4">Name</th>
                                                    <th scope="col" className="text-sm font-medium px-6 py-4">Phone Number</th>
                                                    <th scope="col" className="text-sm font-medium px-6 py-4">Email</th>
                                                    <th scope="col" className="rounded-tr-lg text-sm font-medium px-6 py-4">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsers.map((user) => (
                                                    <tr className="border-b" key={user._id}>
                                                        <th scope="row" className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                            <div className="flex flex-row items-center">
                                                                <img
                                                                    className="rounded-full w-12"
                                                                    src={`http://localhost:5000/${user?.image}`}
                                                                    alt="Avatar"
                                                                />
                                                                <div className="ml-4">
                                                                    <p className="mb-0.5 font-medium">{user.firstName}</p>
                                                                    <p className="mb-0.5 text-gray-500">{user.lastName}</p>
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                            <div className="flex flex-col">
                                                                <p className="mb-0.5">{user.phoneNo}</p>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                            <p className="mb-0.5 text-gray-500">{user.email}</p>
                                                        </td>
                                                        <td className="align-middle text-gray-500 text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                            <button onClick={() => updateUser(user._id)} className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                                                Edit
                                                            </button>
                                                            <button onClick={() => deleteUser(user._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                                                Delete
                                                            </button>
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home