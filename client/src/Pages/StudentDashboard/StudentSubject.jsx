import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const StudentSubject = () => {
  const [subjectTodo, setSubjectTodo] = useState([])

  const fetchSubjectData = async () => {
    // Retrieve student data from localStorage
    const studentData = localStorage.getItem("Student");
    if (!studentData) {
      toast.error("No student data found. Please log in.");
      return;
    }

    const student = JSON.parse(studentData);
    const sclassName = student.sclassName?._id;

    try {
      const response = await axios.get(`http://localhost:5000/Subject/ClassSubjects/${sclassName}`);
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((subject) => ({
          id: subject._id,
          text: {
            subjectName: subject.subName,
            subjectCode: subject.subCode,
            subjectSessions: subject.sessions,
          },
        }));
        setSubjectTodo(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error("SomeThing Wrong")
      console.error(error.response?.data?.message || "An error occurred while fetching subjects");
    }
  };


  useEffect(() => {
    fetchSubjectData()
  })

  console.log(subjectTodo)
  return (
    <>
      <div className='w-full'>
        <div className='mx-10'>
          <h1 className='text-5xl text-center mb-10 mt-10'><u>All Subject</u></h1>
          <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700`}>
            <thead className='bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>S.No</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Subject Name</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Subject Code</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Session</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
              {
                subjectTodo.map((subject, index) => (
                  <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`} key={subject.id}>
                    <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{index + 1 }</th>
                    <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{subject.text.subjectName}</th>
                    <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{subject.text.subjectCode}</th>
                    <th className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{subject.text.subjectSessions}</th>
                  </tr>
                ))
              }
            </tbody>
          </table >
        </div >
      </div>


    </>
  )
}

export default StudentSubject