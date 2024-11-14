import React, { useEffect, useState } from 'react';

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });

    useEffect(() => {
        const storedAdminData = localStorage.getItem('Student');
        if (storedAdminData) {
            const parsedData = JSON.parse(storedAdminData);
            setAdminData(parsedData);
            setFormData(parsedData); 
        }
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        localStorage.setItem('Student', JSON.stringify(formData));
        setAdminData(formData);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Admin Profile</h2>
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
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                />
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    placeholder="Role"
                                    className="w-full p-2 border border-gray-300 rounded mb-2"
                                />
                            </>
                        ) : (
                            <>
                                <h3 className="text-3xl font-semibold text-zinc-900 dark:text-white">{adminData.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{adminData.email}</p>
                                <p className="text-gray-600 dark:text-gray-300">{adminData.role}</p>
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

export default AdminProfile;
