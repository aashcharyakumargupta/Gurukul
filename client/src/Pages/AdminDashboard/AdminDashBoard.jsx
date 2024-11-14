import React, { useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/authProvider'

const AdminDashBoard = () => {
    const [menu, setMenu] = useState(true)
    const navigate = useNavigate()
    const { authUser, setAuthUser, logOut } = useAuth()
    const location = useLocation()

    const handleMenuBar = () => {
        setMenu(!menu)
    }

    const handleLogout = async () => {
        try {
            await logOut()
            navigate('/dashboard')
        } catch (error) {
            console.error("Logout failed: ", error)
        }
    }

    const linkStyle = (path) => (
        location.pathname === path ? "bg-gray-700 text-white" : "text-gray-200"
    )

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
                            Admin Dashboard
                        </div>
                        <div className="flex-grow overflow-y-auto mt-8">
                            <ul>
                                <li className="mb-4">
                                    <Link to="/admin/home" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/admin/home')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>

                                        Home
                                    </Link>
                                </li>
                                <li className="mb-4">
                                <Link to="/admin/courses" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/admin/courses')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                        </svg>
                                        Courses
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    {/* <Link to="/admin/subjects" className={`flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 hover:text-white ${linkStyle('/admin/adminStudent')}`}> */}
                                    <Link to="/admin/subjects" className={`flex items-center px-6 py-3 hover:bg-gray-700 ${linkStyle('/admin/subjects')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                        </svg>
                                        Subjects
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/admin/teachers" className={`flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 hover:text-white ${linkStyle('/admin/teachers')}`}>
                                        <svg className="w-5 h-5 mr-4 invert" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SupervisorAccountOutlinedIcon"><path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18C19 9.12 17.88 8 16.5 8S14 9.12 14 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z"></path></svg>
                                        Teachers
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/admin/adminStudent" className={`flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 hover:text-white ${linkStyle('/admin/adminStudent')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                        Students
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/admin/notices" className={`flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 hover:text-white ${linkStyle('/admin/notices')}`}>
                                        <svg className="w-5 h-5 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                        Notices
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/admin/profile" className={`flex items-center px-6 py-3 text-gray-200 hover:bg-gray-700 hover:text-white ${linkStyle('/admin/profile')}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-4">
                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
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
}

export default AdminDashBoard

