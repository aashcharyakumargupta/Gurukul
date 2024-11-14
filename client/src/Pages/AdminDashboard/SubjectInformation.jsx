import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import student from "../../assets/student.png"
import { toast } from 'react-toastify'
import axios from 'axios'

const SubjectInformation = () => {
  const [activeTab, setActiveTab] = useState("details")
  const [studentTodo, setStudentTodo] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const { courseId, courseName, subjectTodo } = location.state || {}
  const handleTabChange = (tab) => setActiveTab(tab)

  const handleStudentRoute = (studentTodo) => {
    navigate('/admin/students', { state: { courseId, courseName, studentTodo, showStudentData: studentTodo, attendance, subjectData: subjectTodo } })
  }


  const { attendance } = location.state || {}
  const handleAttendence = (student) => {
    navigate("/admin/subjectInformation/attendence", { state: { courseId, showSubjectData: subjectTodo, studentId: student._id } })
  }
  console.log("subjectTodo: ", subjectTodo)

  // Fetch all the students from the backend
  const fetchAllStudent = async (data) => {
    try {

      // Fetch the student detail using the API call
      const response = await axios.get(`http://localhost:5000/Student/ClassStudents/${courseId}`);
      console.log("student response: ", response.data)
      if (Array.isArray(response.data)) {
        const formattedData = response.data.map((student) => ({
          _id: student._id || "N/A",
          name: student.name || "Unknown",
          rollNum: student.rollNum || "N/A",
          attendance: student.attendance || "N/A"
        }))
        // console.log(formattedData)
        setStudentTodo(formattedData);
      } else {
        toast.error("Failed to fetch subjects.");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "An error occurred while fetching subjects.");
    }
  };

  useEffect(() => {
    fetchAllStudent()
  }, [])

  return (
    <>
      <div className=' w-full'>

        <nav className='fixed top-0 w-full left-0 mx-64 right-20 z-10 bg-gray-900 rounded-lg shadow-lg'>
          <ul className='flex  py-5'>
            {['details', 'students'].map((tab) => (
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

        <div>
          {activeTab === "details" && (
            <div className=" w-full flex flex-wrap md:flex-nowrap md:flex-col h-auto text-3xl mt-20 mb-10">
              <span className='tracking-wide mb-4 mt-10 text-center text-5xl'>Course: {courseName}</span>
              <div className='flex w-full flex-wrap md:flex-nowrap justify-center'>

               
                <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                    <img className='mx-auto my-4 w-20 h-20' src={student} alt="fee collection" />
                    <span>Total Students</span>
                    <span className='text-2xl font-bold'>{subjectTodo?.text?.subName}</span>
                </div>
                
                <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                    <img className='mx-auto my-4 w-20 h-20' src={student} alt="fee collection" />
                    <span>Total Students</span>
                    <span className='text-2xl font-bold'>{subjectTodo?.text?.subCode}</span>
                </div>
               
                <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
                    <img className='mx-auto my-4 w-20 h-20' src={student} alt="fee collection" />
                    <span>Total Students</span>
                    <span className='text-2xl font-bold'>{studentTodo.length}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className=' flex flex-wrap md:flex-nowrap md:flex-col h-auto mx-10 mt-20 mb-10'>
              <h1 className='tracking-wide mb-4 mt-10 text-center text-5xl font-bold'><u>Student List</u> </h1>
              <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 `}>
                <thead className='bg-gray-50 dark:bg-gray-700'>
                  <tr>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>S.No</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Student Name</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Roll number</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                  {studentTodo.map((student, index) => (
                    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`} key={index} >
                      <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{index + 1}</th>
                      <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{student.name}</th>
                      <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{student.rollNum}</th>
                      <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>
                        <div className='-mx-5'>
                          <button className={`bg-cyan-500 hover:bg-cyan-600 px-3 py-2  rounded-lg cursor-pointer`} onClick={() => { handleStudentRoute(student) }}>View</button>
                          <button className={`bg-yellow-600 hover:bg-yellow-700 px-3 py-2 mx-3 rounded-lg cursor-pointer`} onClick={() => handleAttendence(student)}>Take Attendence</button>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div >
    </>
  )
}

export default SubjectInformation