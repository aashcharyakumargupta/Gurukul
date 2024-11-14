import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authProvider'

const TeacherDashboard = () => {
    const [menu, setMenu] = useState(true);
    const navigate = useNavigate()
    const { authTeacher, setAuthTeacher, logOutTeacher } = useAuth();
    const location = useLocation()


    const handleMenuBar = () => {
        setMenu(!menu);
    };

    const handleLogout = async () => {
        try {
            await logOutTeacher();
            navigate('/dashboard');
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    const linkStyle = (path) => (
        location.pathname === path ? "bg-gray-700 text-white" : "text-gray-200"
    );
    
    return (
        <>
            {/* Sidebar and main layout */}
            <div className="flex h-screen bg-gray-900 text-white">
                {/* Sidebar toggle button for small screens */}
                <button
                    onClick={handleMenuBar}
                    className="md:hidden p-4 z-20 text-white hover:text-gray-400 focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Sidebar */}
                <div className={`bg-gray-800 shadow-lg transition-transform duration-300 transform ${menu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 h-full flex-shrink-0`}>
                    <div className="flex flex-col h-full">
                        <div className="p-6 text-center text-xl font-semibold text-gray-100 border-b border-gray-700">
                            Teacher Dashboard
                        </div>
                        <div className="flex-grow overflow-y-auto mt-8">
                            <ul>
                                <li className="mb-4">
                                    <Link to="/teacher/home" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/teacher/home')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>

                                        Home
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/teacher/attendance" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/teacher/attendance')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                        </svg>
                                        Attendance
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/teacher/subjects" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/teacher/subjects')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                        </svg>
                                        Schedule
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/teacher/profile" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/teacher/profile')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                        </svg>
                                        Profile
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <button onClick={handleLogout} className="flex items-center w-full px-6 py-3 text-gray-200 hover:bg-red-600 hover:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-4">
                                            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                        Logout
                                    </button>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow p-6 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export default TeacherDashboard;
