import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import student from "../../assets/student.png"
import teacherImg from "../../assets/teachers.png"
import courses from "../../assets/courses.png"
import courseModel from "./courseModel.png"
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { ColorRing } from 'react-loader-spinner'


const CourseInformation = () => {

  const [activeTab, setActiveTab] = useState("details")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [subjectTodos, setSubjectTodos] = useState([])
  const [studentTodos, setStudentTodos] = useState([])

  const [teacherData, setTeacherData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacher, setTeacher] = useState([]);

  const navigate = useNavigate()
  const location = useLocation();
  const { courseId, courseName } = location.state || {};
  const { handleSubmit, register, reset } = useForm()
  const onError = (errors) => {
    Object.values(errors).forEach(
      error => { toast.error(error.message) }
    )
  }

  const handleTabChange = (tab) => setActiveTab(tab)

  const handleSubjectRoute = (subjectTodo) => {
    navigate('/admin/courses/information/subjectInformation', { state: { courseId, courseName, subjectTodo } })
  }

  const handleStudentRoute = (studentTodo) => {
    navigate('/admin/courses/information/courseStudentDetail', { state: { subjectTodos, studentTodo: studentTodo._id } })
  }

  const handleFormToggle = () => {
    setIsModalOpen(!isModalOpen)
  }



  /* ===========================================Subject COMPLETED================================================================= */
  // Add Subject
  const addSubjectData = async (data) => {
    try {
      const response = await axios.post(`http://localhost:5000/Subject/SubjectCreate/${courseId}`, {
        ...data,
        courseId,
      });
      const { _id, subName, subCode, sessions } = response.data;
      setSubjectTodos(previous => [
        ...previous,
        { _id, courseId, text: { subName, subCode, sessions } },
      ]);
      reset();
      toast.success("Subject added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Fetch data from the database
  const fetchSubjectData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Subject/AllSubjects');
      if (Array.isArray(response.data)) {
        const formattedStudent = response.data.map((subject) => ({
          _id: subject._id,
          courseId: subject.sclassName,
          text: {
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
          },
        }));
        setSubjectTodos(formattedStudent);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };


  // Filter subjects according to the course 
  const filterSubject = subjectTodos.filter((subject) => subject.courseId === courseId);

  // Delete Subject Data
  const deleteSubjectTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/Subject/Subject/${id}`);
      if (response.status === 200) {
        setSubjectTodos(prev => prev.filter(subject => subject._id !== id));
        toast.success("Subject deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };


  /* ==========================================Student================================================================== */

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/Student/ClassStudents/${courseId}`);
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((student) => ({
          _id: student._id,
          courseId: student.sclassName,
          text: {
            name: student.name,
            rollNum: student.rollNum,
            attendance: student.attendance,
          },
        }));
        setStudentTodos(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/Student/Student/${id}`);
        setStudentTodos((prev) => prev.filter((student) => student._id !== id));
        toast.success("Student deleted successfully");
    } catch (error) {
        console.error(error);
        toast.error("An error occurred while deleting the student.");
    }
};
  const filterStudent = studentTodos.filter((student) => student.courseId === courseId);


  /* =============================================Teacher=============================================================== */

  const handleTeacherAttendance = (teacherId) => {
    navigate("/admin/teacherAttendance", { state: { teacherId } })
  }

  const handleTeacherRoute = (teacherId) => {
    navigate('/admin/teacherAttendanceDetail', { state: { teacherId } })
  }

  const fetchTeacherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/Teacher/Teachers');
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((teacher) => ({
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          teachSclass: teacher.teachSclass.sclassName,
          id: teacher.teachSclass._id
        }));
        setTeacherData(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const filterTeacher = teacherData.filter((teacher) => teacher.id === courseId);

  const deleteTeacher = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/Teacher/Teacher/${id}`);
      if (response.status === 200) {
        setTeacher((teachers) => teachers.filter((teacher) => teacher._id !== id));
        toast.success('Subject deleted successfully');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to delete course';
      toast.error(`Error: ${errorMsg}`);
      console.error("Error deleting subject:", error);
    }
  };



  /* =================================================================================================================== */

  // UseEffect for the subject data and student data
  useEffect(() => {
    fetchSubjectData()
    fetchStudentData()
    fetchTeacherData()
  }, [])

  useEffect(() => {
    const courses = JSON.parse(localStorage.getItem("courseTodo")) || [];
    const currentCourse = courses.find(course => course.id === courseId);
    setCourseData(currentCourse);
  }, [courseId]);

  return (
    <>
      <div className=' w-full  '>
        <nav className='fixed top-0 w-full left-0 mx-64 right-20 z-10 bg-gray-900 rounded-lg shadow-lg'>
          <ul className='flex  py-5'>
            {['details', 'subjects', 'students', 'teachers'].map((tab) => (
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

        <h1 className='text-center mt-20 text-5xl font-bold'><u>Course Detail : {courseName}</u></h1>

        {/* DETAIL SECTION  */}

        {activeTab === "details" && (
          <div className='w-full flex h-auto text-3xl'>
            <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
              <img className='mx-auto my-4 w-20 h-20' src={student} alt="student" />
              <span className=''>Total Students</span><br />
              <span className='text-green-700 font-bold'>{studentTodos.filter(student => student.courseId === courseId).length}</span>
            </div>
            <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
              <img className='mx-auto my-4 w-20 h-20' src={courses} alt="courses" />
              <span >Total Subject</span><br />
              <span className='text-green-700 font-bold'>{subjectTodos.filter(subject => subject.courseId === courseId).length}</span>
            </div>
            <div className='box-1 h-64 mx-5 my-2 mt-20 md:h-60 md:w-1/2 md:m-5 flex flex-col items-center border-2 border-gray-600 shadow-lg shadow-black px-10 md:px-0 bg-gray-800 rounded-3xl transition-transform transform hover:scale-105'>
              <img className='mx-auto my-4 w-20 h-20' src={teacherImg} alt="teacher" />
              <span>Total Teachers</span><br />
              <span className='text-green-700 font-bold'>{teacherData.filter(teacher => teacher.id === courseId).length}</span>
            </div>
          </div>)}


        {/* SUBJECT SECTION */}

        {activeTab === "subjects" && (
          <>
            <div className={`modal bg-white  backdrop-blur-3xl text-black flex flex-col justify-around  shadow-2xl shadow-black-900 mx-auto w-96 mt-6  md:px-0 `}>
              <form onSubmit={handleSubmit(addSubjectData, onError)} className={`${isModalOpen ? "hidden" : "block"}  border-2  border-gray-300 flex flex-col justify-center mx-auto `}>
                <img className={`mx-auto h-full object-cover`} src={courseModel} alt="add course data" />
                <input {...register("subName", { required: "Subject Name is required", minLength: { value: 2, message: "Minimum 2 character is required" } })} type="text" placeholder='Subject Name*' className={`rounded-lg font-5xl mt-5 mb-5 outline-none border-2 border-gray-900 py-3 px-4 mx-4  ${isModalOpen ? "hidden" : "block"}`} />
                <input {...register("subCode", { required: "Subject Code is required", minLength: { value: 2, message: "Minimum 2 character is required" } })} type="text" placeholder='Subject Code*' className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4  mx-4 ${isModalOpen ? "hidden" : "block"}`} />
                <input {...register("sessions", { required: "Subject Session is required", minLength: { value: 1, message: "Minimum 2 character is required" } })} type="text" placeholder='Subject Sessions*' className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 mx-4   ${isModalOpen ? "hidden" : "block"}`} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-5 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
                <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer mx-4`}  >Create Subject</button>
              </form>
            </div>



            {isModalOpen && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Subject</button>
              <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Subject</button>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Subject Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Subject Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Sessions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
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

                        filterSubject.map((subjectTodo, index) => (
                          <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`} key={subjectTodo._id}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{index + 1 || "N/A"}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{subjectTodo.text.subName}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{subjectTodo.text.subCode}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{subjectTodo.text.sessions}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 flex'>
                              <button className='bg-green-600 hover:bg-green-500 text-white py-2 px-4 mx-3 rounded-lg' onClick={() => handleSubjectRoute(subjectTodo)}> View </button>
                              <Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4 cursor-pointer" onClick={() => deleteSubjectTodo(subjectTodo._id)} />
                            </td>
                          </tr>
                        ))
                      )}
                </tbody>
              </table>
            </div>}

          </>
        )}

        {/* STUDENT SECTION */}

        {activeTab === "students" && (
          <>

            <div className={`w-3/4 mx-auto mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden`}>
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
                        filterStudent.map((studentTodo, index) => (
                          <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors `} key={studentTodo._id}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{index + 1 || 'N/A'}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{studentTodo.text?.name || 'N/A'}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{studentTodo.text?.rollNum || 'N/A'}</td>
                            <td className='flex'>
                              <button className='bg-green-600 hover:bg-green-500 mt-2 text-white py-2 px-4 mx-2 rounded-lg' onClick={() => { handleStudentRoute(studentTodo) }}> View </button>
                              <button onClick={() => deleteStudent(studentTodo._id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 text-red-700">
                                <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                              </svg>
                              </button>
                            </td>
                          </tr>
                      
                        ))
                      )}
                </tbody>
              </table>
            </div>

          </>
        )}

        {/* TEACHER SECTION */}

        {activeTab === "teachers" && (
          <>
            <div className={`w-full mx-auto mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden`}>
              <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 `}>
                <thead className='bg-gray-50 dark:bg-gray-700'>
                  <tr>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>S.No</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Teacher Name</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Teacher Email</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Department</th>
                    <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Action</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                  {
                    filterTeacher.map((teacher, index) => (<>
                      <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors `} key={teacher._id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{index + 1 || 'N/A'}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{teacher.name || 'N/A'}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{teacher.email || 'N/A'}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 font-bold'>{teacher.teachSclass || 'N/A'}</td>
                        <td className='flex'>
                          <button onClick={() => handleTeacherRoute(teacher._id)} className='bg-green-700 hover:bg-green-800 mt-2 text-white py-2 px-4 mx-2 rounded-lg'> View </button>
                          <button onClick={() => handleTeacherAttendance(teacher._id)} className='bg-yellow-500 hover:bg-yellow-600 mt-2 text-black py-2 px-4 mx-2 rounded-lg'> Attendence </button>
                          <button onClick={() => deleteTeacher(teacher._id)} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 text-red-700">
                            <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                          </svg>
                          </button>
                        </td>
                      </tr>
                    </>))
                  }
                </tbody>
              </table>
            </div>

          </>
        )}

      </div>
    </>
  );
}

export default CourseInformation