import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { format } from 'date-fns';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';

const TeacherAttendanceDetail = () => {
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("attendance");
    const [teacherData, setTeacherData] = useState([]);
    const location = useLocation();
    const { teacherId } = location.state || {};

    // Calculate total classes and present days
    const totalClasses = teacherData[0]?.attendance?.length || 0;
    const totalPresent = teacherData[0]?.attendance?.filter(att => att.status === "Present").length || 0;
    const attendancePercentage = totalClasses > 0 ? ((totalPresent / totalClasses) * 100).toFixed(2) + "%" : "0%";
    console.log("attendancePercentage: ", attendancePercentage)

    // Chart options for attendance
    const attendanceChartOptions = {
        animationEnabled: true,
        theme: "dark2",
        title: { text: "Attendance Chart" },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            dataPoints: [
                { y: parseFloat(totalPresent), label: "Present" },
                { y: totalClasses - totalPresent, label: "Absent" }
            ]
        }]
    };

    // Fetch teacher data based on teacherId
    const fetchTeacherData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/Teacher/Teacher/${teacherId}`);
            if (response.data) {
                setTeacherData([{
                    ...response.data,
                    attendance: response.data.attendance.map(att => ({
                        ...att,
                        date: format(new Date(att.date), 'MMMM dd, yyyy, h:mm a')
                    }))
                }]);
            }
        } catch (error) {
            setError("Error fetching teacher data.");
        } finally {
            setLoading(false);
        }
    };

    // Handle tab change
    const handleTabChange = (tab) => setActiveTab(tab);

    useEffect(() => {
            fetchTeacherData();
    }, []);

    return (
        <div className='container mx-auto px-5 py-10 dark:bg-gray-900 bg-gray-100 min-h-screen'>
            {/* Tab Navigation */}
            <nav className='fixed top-0 w-full left-0 mx-64 right-20 z-10 bg-gray-900 rounded-lg shadow-lg'>
                <ul className='flex py-5'>
                    {['attendance'].map((tab) => (
                        <li
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`relative mx-10 cursor-pointer flex flex-col text-lg font-semibold transition-all duration-300 
                    ${activeTab === tab ? 'text-zinc-400' : 'text-gray-600 hover:text-blue-400'}`}
                        >
                            <span className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-300 
                         ${activeTab === tab ? 'bg-blue-500' : 'bg-transparent'}`}></span>
                            {tab.toUpperCase()}
                            <div className={`absolute transition-transform duration-300 ${activeTab === tab ? 'scale-100' : 'scale-0'}`}>
                                <div className='bg-blue-500 rounded-full w-2 h-2 animate-ping mx-7'></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Main Content */}
            <div className='mt-10'>
                {loading ? (
                    <div className='flex justify-center items-center h-96'>
                        <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
                    </div>
                ) : error ? (
                    <div className='text-center text-red-500'>{error}</div>
                ) : (
                    <>
                        {activeTab === "attendance" ? (
                            <>
                                <h1 className='text-5xl font-extrabold text-center text-gray-200 mb-10'><u>Attendance</u></h1>
                                <h1 className='mb-3 text-xl italic font-bold'>Overall Percentage: {attendancePercentage}</h1>
                                <div className='flex flex-col lg:flex-row gap-8 items-start'>
                                    <div className='flex-1'>
                                        <CanvasJSChart options={attendanceChartOptions} />
                                    </div>
                                    <div className='flex-1'>
                                        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                                            <thead className='bg-gray-50 dark:bg-gray-700'>
                                                <tr>
                                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Date</th>
                                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                                                {teacherData[0]?.attendance?.map((att, index) => (
                                                    <tr key={index} className='hover:bg-gray-700 transition'>
                                                        <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{att.date}</td>
                                                        <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{att.status}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </>
                )}
            </div>
        </div>
    );
}

export default TeacherAttendanceDetail;
