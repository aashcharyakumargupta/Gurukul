import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'


const AdminTeacher = () => {

  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Navigate to the detail of the teacher
  const handleTeacherRoute = (teacherId) => {
    navigate('/admin/teacherAttendanceDetail', { state: { teacherId } })
  }

  // Fetch data from the database
  const fetchTeacherData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://gurukul-vw9n.onrender.com/Teacher/Teachers');
      console.log("Response data fetch teacher: ", response.data);
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((teacher) => ({
          _id: teacher._id,
          name: teacher.name,
          email: teacher.email,
          teachSclass: teacher.teachSclass.sclassName
        }));
        console.log("formattedSubjects: ", formattedSubjects)
        setTeacherData(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while fetching subjects");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchTeacherData()
  }, []);

  return (
    <>
      <div className={`modal backdrop-blur-3xl text-black flex flex-col py-20  mx-auto md:px-0 w-full`}>
        <h1 className={`text-5xl text-center mb-10 text-white font-bold`}> <u>All Teachers</u> </h1>
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden `}>
          <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
            <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>S.No</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Teacher Name</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Teacher Email</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Subject</th>
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
                    teacherData.map((teacher, index) => (
                      <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`} key={teacher._id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{index + 1 || "N/A"} </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{teacher.name || "N/A"} </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{teacher.email || "N/A"}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>{teacher.teachSclass || "N/A"}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 flex'>
                          <button onClick={() => handleTeacherRoute(teacher._id)} className='bg-green-600 hover:bg-green-500 text-white py-2 px-4 mx-3 rounded-lg'>View</button>
                          <Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4 cursor-pointer" />
                        </td>
                      </tr>
                    ))
                  )}
            </tbody>
          </table>
        </div >
      </div>
    </>
  )
}
export default AdminTeacher



