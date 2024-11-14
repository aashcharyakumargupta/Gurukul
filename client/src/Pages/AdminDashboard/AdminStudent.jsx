import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import courseModel from "./courseModel.png"
import { toast } from 'react-toastify'
import axios from 'axios'
import { format } from 'date-fns'
import CanvasJSReact from '@canvasjs/react-charts';
import { useForm } from 'react-hook-form'

const AdminStudent = () => {

  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [activeTab, setActiveTab] = useState("details")
  const [isModalOpen, setIsModalOpen] = useState("")
  const [marksData, setMarksData] = useState([])
  const [subjectTodo, setSubjectTodo] = useState([])

  const handleTabChange = (tab) => setActiveTab(tab)

  const location = useLocation()
  const { showStudentData = {}, courseName, subjectData } = location.state || {};

  const { handleSubmit, register } = useForm()
  const onError = (errors) => {
    Object.values(errors).forEach(
      error => { toast.error(error.message) }
    )
  }

  const showAttendence = () => {
    if (!showStudentData || !Array.isArray(showStudentData.attendance)) return 0;
    const data = showStudentData.attendance;
    let count = 0;
    data.forEach((status) => {
      if (status.status === "Present") count++;
    });
    return count;
  };

  const absentStudentCount = () => {
    if (!showStudentData || !Array.isArray(showStudentData.attendance)) return 0;
    const data = showStudentData.attendance;
    let count = 0;
    data.forEach((status) => {
      if (status.status === "Absent") count++;
    });
    return count;
  };

  const totalAttendanceCount = showAttendence()
  const absentStudent = absentStudentCount()
  const attendancePercentage = totalAttendanceCount > 0 ? ((totalAttendanceCount / subjectData.text.sessions) * 100).toFixed(2) + '%' : '0.00%'   // for present student
  const absent = absentStudent > 0 ? ((absentStudent / subjectData.text.sessions) * 100).toFixed(2) + '%' : '0.00%'   // for absent student

  const attendance = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2",
    title: {
      text: "Attendance"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: [
        { y: parseFloat(attendancePercentage), label: "Present" },
        { y: parseFloat(absent), label: "Absent" },

      ]
    }]
  }

  const marks = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2",
    title: {
      text: "Marks"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: marksData.map(item => ({
        y: item.marksObtained,
        label: item.subName
      }))
    }]
  }

  const handleMarks = async (data) => {
    try {
      const response = await axios.put(`http://localhost:5000/Student/UpdateExamResult/${showStudentData._id}`, {
        subName: data.subName || "Unknown",
        marksObtained: data.marksObtained || "N/A"
      });
      if (response.status === 200 && response.data.examResult) {
        setMarksData(response.data.examResult);
        toast.success("Marks added successfully");
        setIsModalOpen(true);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      console.log(error.response)
      toast.error(error.message);
    }
  };

  const fetchMarksData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/Student/Student/${showStudentData._id}`);
      if (response.data && response.data.examResult) {
        setMarksData(response.data.examResult);
      } else {
        toast.info("No exam results found for this student");
      }
    } catch (error) {
      console.log(error.response)
      toast.error(error.response?.data?.message || "An error occurred while fetching exam results");
    }
  };

  const fetchSubjectData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Subject/AllSubjects');
      console.log(response.data)
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((subject) => ({
          id: subject._id,
          text: {
            subjectName: subject.subName,
            subjectCode: subject.subCode,
            subjectSessions: subject.sessions,
            department: subject.department
          },
        }));
        setSubjectTodo(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while fetching subjects");
    }
  };

  const deleteAttendance = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/Subject/Subject/${id}`);
      console.log("Response: ", response)
      if (response.status === 200) {
        setSubjectTodo((subjects) => subjects.filter((subject) => subject._id !== id));
        toast.success('Subject deleted successfully');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to delete course';
      toast.error(`Error: ${errorMsg}`);
      console.error("Error deleting subject:", error);
    }
  };

  console.log("Subject Id: ", subjectTodo)

  useEffect(() => {
    fetchMarksData();
    fetchSubjectData()
  }, []);

  return (
    <>
      <div className='w-full '>
        <nav className='fixed top-0 w-full left-0 mx-64 right-20 z-10 bg-gray-900 rounded-lg shadow-lg'>
          <ul className='flex  py-5'>
            {['details', 'attendence', 'marks'].map((tab) => (
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

        <div className='mx-5'>
          {activeTab === "details" && showStudentData && (<>
            <h1 className='text-5xl bold text-center mt-20 font-extrabold mb-5'><u>Students Detail</u></h1>
            <div className=''>
              <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700`}>
                <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Student Name</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Roll Number</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Course</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                  <tr className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200`}  >
                    <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{showStudentData.name || "N/A"}</th>
                    <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{showStudentData.rollNum || "N/A"}</th>
                    <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{courseName}</th>
                  </tr>
                </tbody>
              </table>
              <div className='flex mt-10 '>
                <div className='w-3/4 border-2'>
                  <CanvasJSChart options={attendance} />
                </div>
                <div className='mx-3 border-2 w-3/4'>
                  <CanvasJSChart options={marks}
                  />
                </div>

              </div>
            </div>
          </>)}
          {activeTab === "attendence" && (<>
            <h1 className='text-5xl text-center font-extrabold mt-20 mb-10'><u>Attendance</u></h1>
            <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700`}>
              <thead className='bg-gray-50 dark:bg-gray-700'>
                <tr>
                  <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>S.No</th>
                  <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Subject</th>
                  <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Present</th>
                  <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Total Sessions</th>
                  <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Attendence Percentage</th>
                  <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                {subjectTodo.map((subject, index) => (
                  <tr className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200`} key={subject.id}>
                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{index + 1 || "N/A"}</td>
                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{subject.text.subjectName || "N/A"}</td>
                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{totalAttendanceCount}</td>
                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'> {subject.text.subjectSessions}</td>
                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{totalAttendanceCount > 0 ? ((totalAttendanceCount / subject.text.subjectSessions) * 100).toFixed(2) + '%' : '0.00%' || "N/A"}</td>
                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200 flex'>
                      <button className="bg-red-600 hover:bg-red-500 text-white  mx-2 py-2 px-3 rounded-lg">
                        <Trash2 className="w-5 h-5" onClick={() => deleteAttendance(subject.id)} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <span className='text-xl italic mt-5'>Overall Attendance Percentage: {attendancePercentage}</span>

            <div className='mt-5 mx-10'>
              <h1 className='text-3xl text-center mb-2 font-bold'><u>Attendance Detail</u></h1>
              <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700`}>
                <thead className='tbg-gray-50 dark:bg-gray-700'>
                  <tr>
                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>S.No</td>
                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>Date</td>
                    <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>Subject Name</td>
                    <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Status</td>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                  {
                    Array.isArray(showStudentData?.attendance) ? (
                      showStudentData.attendance.slice().reverse().map((attendance, index) => (
                        <tr key={attendance._id} className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200`}  >
                          <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{index + 1 || "N/A"}</td>
                          <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{format(new Date(attendance.date), 'MMMM dd, yyyy, h:mm a')}</td>
                          <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{attendance.subName}</td>
                          <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{attendance.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center">No attendance records available.</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </>)}

          {activeTab === "marks" && (
            <>
              <div className={`modal backdrop-blur-3xl  flex flex-col justify-around  border-black-900  mx-auto w-96 md:px-0 `}>
                <h1 className='text-5xl text-center font-extrabold mt-20 mb-5'><u>Marks</u></h1>
                <form onSubmit={handleSubmit(handleMarks, onError)} className={`${isModalOpen ? "hidden" : "block"} px-10 text-black bg-white border-2 border-gray-300 flex flex-col justify-center mx-auto `}>
                  <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />
                  <label htmlFor="subName" className='text-xl'>Subject Name</label>
                  <input type="text" placeholder='Subject Name' {...register("subName", { required: "Subject Name is required", minLength: { value: 2, message: "Minimum 2 character is required" } })} className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                  <label htmlFor="marksObtained" className='text-xl'>Marks</label>
                  <input type="number" {...register("marksObtained", { required: "Marks is required" })} name='marksObtained' id='marksObtained' placeholder='Marks' className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-40 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                  <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer`}>Create Marks</button>
                </form>
              </div>

              <div className={`${isModalOpen ? "block" : "hidden"} text-black  mx-5 mt-5 `}>
                <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}>
                  <thead className='bg-gray-50 dark:bg-gray-700'>
                    <tr>
                      <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>S.No</td>
                      <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>Subject Name</td>
                      <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>Marks</td>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                    {marksData.map((marks, index) => (
                      <tr key={index} className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200`}  >
                        <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{index + 1 || "N/A"}</td>
                        <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{marks.subName || "Unknown"}</td>
                        <td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-200'>{marks.marksObtained || "Unknown"}</td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
                <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={() => setIsModalOpen(!isModalOpen)}>Add Marks</button>
              </div>
            </>
          )}
        </div>
      </div >
    </>
  )
}
export default AdminStudent



