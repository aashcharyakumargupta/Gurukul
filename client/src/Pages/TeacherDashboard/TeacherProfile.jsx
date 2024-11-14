import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherProfile = () => {
    const [teacherData, setTeacherData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });
    const [loading, setLoading] = useState(true);
   
    // Fetch teacher ID from local storage
    const teacherId = JSON.parse(localStorage.getItem('Teacher'))?._id;
    console.log("Teacher ID: ", teacherId);
    console.log("teacherData: ", teacherData)
    

    useEffect(() => {
        const fetchTeacherData = async () => {
            if (!teacherId) {
                console.error("No teacher ID found in local storage.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/Teacher/Teacher/${teacherId}`);
                console.log("Tecaher response: ", response.data)
                if (response.data) {
                    setTeacherData(response.data);
                    setFormData(response.data);
                } else {
                    console.error("No data returned from API.");
                }
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeacherData();
    }, [teacherId]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/Teacher/Teacher/${teacherId}`, formData); // Update API endpoint
            setTeacherData(formData);
            localStorage.setItem('Teacher', JSON.stringify(formData)); // Update local storage
        } catch (error) {
            console.error("Error saving teacher data:", error);
        }
        setIsEditing(false);
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Your Profile</h2>
                <div className="flex items-center flex-col mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-40 w-40 text-gray-500 dark:text-gray-400 mr-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 1.5c-4.41 0-8 2.69-8 6v1.5h16v-1.5c0-3.31-3.59-6-8-6z" />
                    </svg>
                    <div className='flex flex-col text-center text-2xl'>
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className="w-full text-black outline-none p-2 border border-gray-300 rounded mb-2"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-full text-black outline-none p-2 border border-gray-300 rounded mb-2"
                                />
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    placeholder="Role"
                                    className="w-full text-black outline-none p-2 border border-gray-300 rounded mb-2"
                                />
                            </>
                        ) : (
                            <>
                                <h3 className="text-3xl font-semibold text-zinc-900 dark:text-white">{teacherData.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{teacherData.email}</p>
                                <p className="text-gray-600 dark:text-gray-300">{teacherData.role}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-6">
                    {!isEditing ? (
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                            onClick={handleEditClick}
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
