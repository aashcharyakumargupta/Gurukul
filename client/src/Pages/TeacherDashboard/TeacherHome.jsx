import React from 'react';

const TeacherHome = () => {
    return (
        <div className="flex w-full flex-col items-center justify-center min-h-screen bg-gray-900 p-5 text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Teacher Dashboard</h1>
            <p className="text-lg mb-8 text-gray-400">
                Your one-stop solution for managing your classes, tracking student progress, and staying organized.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <h2 className="text-2xl font-semibold">Course Management</h2>
                    <p className="mt-2 text-gray-300">
                        Easily manage your courses, upload materials, and access syllabi at your convenience.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v7.5m-4.5-3.75h9" />
                    </svg>
                    <h2 className="text-2xl font-semibold">Attendance Tracking</h2>
                    <p className="mt-2 text-gray-300">
                        Mark student attendance and keep track of attendance records seamlessly.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l4.5-4.5m-4.5 4.5L7.5 15" />
                    </svg>
                    <h2 className="text-2xl font-semibold">Grades Management</h2>
                    <p className="mt-2 text-gray-300">
                        Manage grades, assignments, and assessments efficiently to ensure student success.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-4 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v3m0 3v3m3-6h-3m3 3h-3m4.5 4.5L21 12l-6.75-6.75M3 12l6.75 6.75L3 12l6.75-6.75" />
                    </svg>
                    <h2 className="text-2xl font-semibold">Communication Tools</h2>
                    <p className="mt-2 text-gray-300">
                        Connect with students and faculty through messaging and announcements.
                    </p>
                </div>
            </div>

            <footer className="mt-10 text-gray-500">
                <p>&copy; 2024 College Management System. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default TeacherHome;

