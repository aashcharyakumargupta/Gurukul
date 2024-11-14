import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as Notice } from 'lucide-react';
import fee from "../../assets/fee.png"
import student from "../../assets/student.png"
import teacher from "../../assets/teachers.png"
import courses from "../../assets/courses.png"
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner'

const AdminHome = () => {
    const [studentCount, setStudentCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);
    const [noticeList, setNoticeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(typeof noticeList)

    // Count the total number of students
    const tStudentCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Student/Students`)
            setStudentCount(response.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    // count the total number of teachers
    const tTeacherCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Teacher/Teachers`)
            setTeacherCount(response.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch Notice List
    const fetchNoticeList = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:5000/Notice/NoticeList`)
            console.log("response data notice: ", response)
            setNoticeList(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.log("error: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {


        // Fetching course count
        const coursesData = localStorage.getItem("courseTodo");
        if (coursesData) {
            const parsedCourses = JSON.parse(coursesData);
            setCourseCount(Array.isArray(parsedCourses) ? parsedCourses.length : 0);
        }

        tStudentCount();
        tTeacherCount();
        fetchNoticeList();

    }, []);

    return (
        <div className="w-full flex flex-wrap md:flex-nowrap md:flex-col h-auto text-3xl bg-gray-900 text-white">
            <div className='flex w-full flex-wrap md:flex-nowrap justify-center'>
                <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                    <img className='mx-auto my-4 w-20 h-20' src={student} alt="fee collection" />
                    <span>Total Students</span>
                    <span className='text-2xl font-bold text-green-600'>{studentCount}</span>
                </div>
                <div className='box-2 h-64 mx-5 my-2 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-12 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                    <img className='mx-auto my-4 w-20 h-20' src={courses} alt="fee collection" />
                    <span>Total Courses</span>
                    <span className='text-2xl font-bold text-green-600'>{courseCount}</span>
                </div>
                <div className='box-3 h-64 mx-5 my-2 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                    <img className='mx-auto my-4 w-20 h-20' src={teacher} alt="fee collection" />
                    <span>Total Teachers</span>
                    <span className='text-2xl font-bold text-green-600'>{teacherCount}</span>
                </div>
                <div className='box-4 h-64 mx-5 my-2 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                    <img className='mx-auto my-4 w-20 h-20' src={fee} alt="fee collection" />
                    <span>Fee Collection</span>
                    <span className='text-2xl font-bold text-green-600'>24,000</span>
                </div>
            </div>
            <span className='mt-20 -mb-14 mx-5 cursor-pointer'>
                <Link to="/admin/notices" className='flex items-center text-blue-400 hover:text-blue-300'>
                    <Notice /> Add Notice:
                </Link>
            </span>
            {loading ? (
                <tr>
                    <td colSpan="5" className="text-center">
                        <div className="flex justify-center items-center h-96">
                            <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
                        </div>
                    </td>
                </tr>
            ) :
                error ? (
                    <tr>
                        <td colSpan="5" className="text-center text-red-500">{error}</td>
                    </tr>
                ) :
                    (
                        noticeList.map((todoData, index) => (
                            <div className='mt-20 mx-5 px-5 py-10 border-2 border-gray-600 shadow-lg shadow-black rounded-3xl bg-gray-800' key={index}>
                                <span className='font-semibold text-lg'>Notice : {todoData.title || "N/A"}</span>
                                <p className='text-sm italic text-green-600'>Date: {todoData.date || "N/A"}</p>
                                <p className='text-xl mt-5 italic'>{todoData.details || "N/A"}</p>
                            </div>
                        ))
                    )}
        </div>
    );
};

export default AdminHome;
