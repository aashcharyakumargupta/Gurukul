import React, { useEffect, useState } from 'react'
import student from "../../assets/student.png"
import courses from "../../assets/courses.png"
import fee from "../../assets/fee.png"
import { toast } from 'react-toastify'
import axios from 'axios'

const StudentHome = () => {

    const [showNoticeTodo, setShowNoticeTodo] = useState([])
    const [studentCount, setStudentCount] = useState(0);
    const [subjectCount, setSubjectCount] = useState(0);
    const [teacherCount, setTeacherCount] = useState(0);
    const [noticeList, setNoticeList] = useState([]);

    // Count number of Subject
    const fetchSubjectCount = async () => {
        try {
            const studentData = localStorage.getItem("Student");
            if (!studentData) {
                toast.error("No student data found. Please log in.");
                return;
            }

            const student = JSON.parse(studentData);
            const sclassName = student.sclassName?._id;

            const response = await axios.get(`http://localhost:5000/Subject/ClassSubjects/${sclassName}`);
            if (Array.isArray(response.data)) {
                setSubjectCount(response.data.length);
            } else {
                toast.error("Failed to fetch subjects.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while fetching subjects.");
        }
    };
    
    // Count number of student
    const fetchStudentCount = async () => {
        try {
            const studentData = localStorage.getItem("Student");
            if (!studentData) {
                toast.error("No student data found. Please log in.");
                return;
            }

            const student = JSON.parse(studentData);
            const sclassName = student.sclassName?._id;

            console.log("student: ", sclassName)

            const response = await axios.get(`http://localhost:5000/Student/ClassStudents/${sclassName}`);
            console.log("student response: ", response.data)
            if (Array.isArray(response.data)) {
                setStudentCount(response.data.length);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while fetching subjects.");
        }
    };

    // Fetch Notice List
    const fetchNoticeList = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Notice/NoticeList`)
            console.log("response data notice: ", response)
            // setNoticeList(response.data)
            setNoticeList(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.log("error: ", error)
        }
    }
    
    useEffect(() => {
        const getNoticeTodoData = localStorage.getItem("noticeTodo")
        if (getNoticeTodoData) {
            const parsedData = JSON.parse(getNoticeTodoData)
            if (Array.isArray(parsedData)) {
                setShowNoticeTodo(parsedData.map((noticeTodoData) => ({
                    title: noticeTodoData.text.noticeTitle,
                    detail: noticeTodoData.text.noticeDetail,
                    date: noticeTodoData.text.noticeDate
                })))
            } else if (parsedData && parsedData.text) {
                setShowNoticeTodo([{
                    title: parsedData.text.noticeTitle,
                    detail: parsedData.text.noticeDetail,
                    date: parsedData.text.noticeDate
                }]);
            }
        }

        // Fetching teacher count
        const teachersData = localStorage.getItem("Teacher");
        if (teachersData) {
            const parsedTeachers = JSON.parse(teachersData);
            setTeacherCount(Array.isArray(parsedTeachers) ? parsedTeachers.length : 0);
        }
        fetchStudentCount()
        fetchSubjectCount()
        fetchNoticeList();
    }, [])

    return (
        <>
            <div className="w-full flex flex-wrap md:flex-nowrap md:flex-col h-auto text-3xl">
                <div className='flex w-full flex-wrap md:flex-nowrap justify-center'>

                    <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                        <img className='mx-auto my-4 w-20 h-20' src={student} alt="fee collection" />
                        <span>Total Students</span>
                        <span className='text-2xl font-bold text-green-600'>{studentCount}</span>
                    </div>
                    <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                        <img className='mx-auto my-4 w-20 h-20' src={courses} alt="fee collection" />
                        <span>Total Subject</span>
                        <span className='text-2xl font-bold text-green-600'>{subjectCount}</span>
                    </div>
                    <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                        <img className='mx-auto my-4 w-20 h-20' src={fee} alt="fee collection" />
                        <span>Total Fees</span>
                        <span className='text-2xl font-bold text-green-600'>24, 000</span>
                    </div>
                </div>
                <span className='flex items-center text-blue-400 hover:text-blue-300 mt-10'><u>All Notices </u></span>
                {noticeList.map((todoData, index) => (<div className='mt-4 px-5 py-5 border-2 border-black-900 shadow-2xl shadow-black-900' key={index}>
                    <span className=''>Notice: {todoData.title || "N/A"}</span>
                    <p className=' text-sm italic'>Date: {todoData.date || "N/A"}</p>
                    <p className=' text-xl mt-5 italic'>{todoData.details || "N/A"}</p>
                </div>))}
            </div>
        </>
    )
}

export default StudentHome