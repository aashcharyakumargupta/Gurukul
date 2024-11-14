import React, { useEffect, useState } from 'react';
import './admin.css';
import courseModel from './courseModel.png';
import { Trash2, Plus, X } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AdminCourses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseTodo, setCourseTodo] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onError = (errors) => {
    Object.values(errors).forEach((error) => toast.error(error.message));
  };

  const handleCourseButton = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInformationRoute = (course) => {
    navigate('/admin/courses/information', {
      state: {
        courseId: course._id,
        courseName: course.text,
      },
    });
  };

  const handleOnSubmitCourse = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/Sclass/SclassCreate', {
        sclassName: data.courseName,
      });
      if (response.data) {
        const { sclassName, _id } = response.data;
        const courseTodoData = [...courseTodo, { _id, text: sclassName }];
        setCourseTodo(courseTodoData);
        localStorage.setItem('courseTodo', JSON.stringify(courseTodoData));
        reset();
        toast.success('Course added successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Sclass/SclassList');
      if (Array.isArray(response.data)) {
        const formattedCourse = response.data.map((course) => ({
          _id: course._id,
          text: course.sclassName,
        }));
        setCourseTodo(formattedCourse);
        localStorage.setItem('courseTodo', JSON.stringify(formattedCourse));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/Sclass/Sclass/${id}`);
      if (response.status === 200) {
        const updateCourseTodo = setCourseTodo((courses) => courses.filter((course) => course._id !== id));
        localStorage.setItem('courseTodo', JSON.stringify(updateCourseTodo));
        toast.success('Course deleted successfully');
      }
    } catch (error) {
      toast.error(`Error: ${error.response.data.message || 'Failed to delete course'}`);
    }
  };

  useEffect(() => {
    const savedCourses = localStorage.getItem('courseTodo');
    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);
        setCourseTodo(parsedCourses);
      } catch (error) {
        setCourseTodo([]);
      }
    } else {
      setCourseTodo([]);
    }
    fetchCourses();
  }, []);

  return (
    <>
      <div className="bg-gray-900 w-full text-gray-100 min-h-screen p-5">
        <div className="courses">
          {isModalOpen && (
            <div className="modal-container absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70 z-50">
              <div className="addCoursesData bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                <span className="cursor-pointer absolute right-3 top-3 text-gray-400 hover:text-gray-200" onClick={handleCourseButton}><X /></span>
                <img className="mx-auto h-40 mb-6" src={courseModel} alt="Add course" />
                <form onSubmit={handleSubmit(handleOnSubmitCourse, onError)} className="flex flex-col">
                  <label htmlFor="courseName" className="text-lg mb-2">Course Name</label>
                  <input
                    {...register("courseName", {
                      required: "Course Name is Required",
                      minLength: { value: 2, message: "Minimum Two Characters Required" }
                    })}
                    type="text"
                    name="courseName"
                    id="courseName"
                    placeholder="Enter course name"
                    className="mb-5 outline-none border border-gray-700 py-3 px-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                  <div className="flex justify-between gap-4">
                    <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 py-3 rounded-lg">Create Course</button>
                    <button type="button" onClick={handleCourseButton} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className={`courseTodo ${isModalOpen ? 'hidden' : 'block'} mt-5`}>
            <h1 className="text-4xl font-bold text-center mb-10 underline">Courses</h1>
            <ul className="space-y-5">
              {courseTodo.map((todo) => (
                <li key={todo._id} className="p-5 flex justify-between items-center bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
                  <span className="text-2xl text-gray-300">{todo.text}</span>
                  <div className="flex space-x-3">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 py-2 px-3 rounded-lg"
                      onClick={() => handleInformationRoute(todo)}
                    >
                      View
                    </button>
                    <button className="bg-green-500 hover:bg-green-400 text-gray-900 py-2 px-3 rounded-lg">
                      <Plus className="w-5 h-5" />
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-lg"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-10">
              <button
                onClick={handleCourseButton}
                className="bg-purple-700 hover:bg-purple-600 py-3 px-6 rounded-lg text-white font-semibold transition-all shadow-md shadow-purple-500"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminCourses;
