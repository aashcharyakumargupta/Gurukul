import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { ColorRing } from 'react-loader-spinner'

const AdminStudents = () => {
    const [studentTodo, setStudentTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleView = (student) => {
        navigate("/admin/students", {
            state: {
                showStudentData: student,
                subjectData: { text: { sessions: 10, subName: "Subject Name" } },
            },
        });
    };

    const fetchAllStudent = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://gurukul-vw9n.onrender.com/Student/Students`);
            if (Array.isArray(response.data)) {
                const formattedData = response.data.map((student) => ({
                    _id: student._id || "N/A",
                    name: student.name || "Unknown",
                    rollNum: student.rollNum || "N/A",
                    attendance: student.attendance,
                }));
                setStudentTodo(formattedData);
            } else {
                toast.error("Failed to fetch students.");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching students.");
        } finally {
            setLoading(false)
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`https://gurukul-vw9n.onrender.com/Student/Student/${id}`);
            setStudentTodo((prev) => prev.filter((student) => student._id !== id));
            toast.success("Student deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the student.");
        }
    };

    useEffect(() => {
        fetchAllStudent();
    }, []);

    return (
        <div className="w-3/4 mx-auto">
            <h1 className="tracking-wide mt-10 text-center text-5xl mb-10 font-semibold text-gray-800 dark:text-gray-200">Student List</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">S.No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Roll Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
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
                        studentTodo.map((student, index) => (
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200" key={student._id}>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{index + 1 || "N/A"}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{student.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{student.rollNum}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
                                            onClick={() => handleView(student)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-lg"
                                            onClick={() => deleteStudent(student._id)}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStudents;
