import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner'

const AdminSubject = () => {

  const [subjectTodo, setSubjectTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubjectData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/Subject/AllSubjects');
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
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubjectTodo = (id) => {
    const updatedSubjectTodo = subjectTodo.filter(subject => subject.id !== id);
    setSubjectTodo(updatedSubjectTodo);
    toast.success("Subject deleted successfully!");
  };

  useEffect(() => {
    fetchSubjectData()
  }, [])
  console.log("subjectTodo", subjectTodo)

  return (
    <>
      <div className=''>
        <h1 className='text-5xl text-center mb-10 mt-10'>All Subject</h1>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
          <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 `}>
            <thead className='bg-gray-50 dark:bg-gray-700'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>S.No</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Subject Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Subject Code</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Session</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Action</th>
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
                    subjectTodo.map((subject, index) => (
                      <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`} key={subject.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{index + 1}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{subject.text.subjectName}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{subject.text.subjectCode}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{subject.text.subjectSessions}</td>
                        <td>
                          <button className=" text-white  mx-2 py-2 px-3 rounded-lg">
                            <Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" onClick={() => deleteSubjectTodo(subject.id)} />
                          </button></td>
                      </tr>
                    ))
                )}
            </tbody>
          </table >
        </div>
      </div >
    </>
  )
}
export default AdminSubject



// import React, { useEffect, useState } from 'react';
// import { Trash2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { ColorRing } from 'react-loader-spinner';

// const AdminSubject = () => {
//   const [subjectTodo, setSubjectTodo] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchSubjectData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:5000/Subject/AllSubjects');
//       if (Array.isArray(response.data)) {
//         const formattedSubjects = response.data.map((subject) => ({
//           id: subject._id,
//           text: {
//             subjectName: subject.subName,
//             subjectCode: subject.subCode,
//             subjectSessions: subject.sessions,
//             department: subject.department,
//           },
//         }));
//         setSubjectTodo(formattedSubjects);
//       } else {
//         toast.info(response.data.message);
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Failed to fetch subjects.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteSubjectTodo = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/Subject/${id}`);
//       const updatedSubjectTodo = subjectTodo.filter((subject) => subject.id !== id);
//       setSubjectTodo(updatedSubjectTodo);
//       toast.success("Subject deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete subject.");
//     }
//   };

//   useEffect(() => {
//     fetchSubjectData();
//   }, []);

//   return (
//     <>
//       <div>
//         <h1 className="text-5xl text-center mb-10 mt-10">All Subjects</h1>
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">S.No</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject Code</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sessions</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center">
//                     <div className="flex justify-center items-center h-96">
//                       <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
//                     </div>
//                   </td>
//                 </tr>
//               ) : error ? (
//                 <tr>
//                   <td colSpan="5" className="text-center text-red-500">{error}</td>
//                 </tr>
//               ) : (
//                 subjectTodo.map((subject, index) => (
//                   <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" key={subject.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200">{index + 1}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200">{subject.text.subjectName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200">{subject.text.subjectCode}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200">{subject.text.subjectSessions}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         className="text-white mx-2 py-2 px-3 rounded-lg"
//                         onClick={() => deleteSubjectTodo(subject.id)}
//                       >
//                         <Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminSubject;
