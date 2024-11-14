import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.jpg";
import dams from "../../assets/dams.jpg";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Asterisk } from 'lucide-react';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const handleOnSubmit = async (data) => {

    try {
      const response = await axios.post("http://localhost:5000/Student/StudentReg", {
        name: data.name,
        rollNum: data.rollNum,
        password: data.password,
        course: data.course,
      });
      console.log(response.data)

      if (response.data) {
        toast.success('Registration successful.');
        navigate("/StudentLogin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const onError = (errors) => {
    Object.values(errors).forEach(error => toast.error(error.message));
  };

  return (
    <>
      <div className='main flex flex-col md:h-screen h-screen bg-blue-600 w-full md:flex-row  text-xs'>
        <div className='image bg-green-700 w-full md:h-screen'>
          <img className='h-full w-full md:h-screen object-fit ' src={dams} alt="dams college" />
        </div>
        <div className='bg-white w-full h-full md:w-3/4 md:h-screen'>
          <div className='logo'><img className='rounded-full mx-auto w-3/4 h-40 object-cover filter-inverted ' src={logo} alt="dams logo" /></div>
          <h1 className='text-center text-3xl'>Student Registration</h1>
          <form onSubmit={handleSubmit(handleOnSubmit, onError)} className='px-10 md:p-10 mx-auto'>
            <div className='mx-auto flex flex-col'>
              <label htmlFor="studentName" className='text-black text-xl flex'>Student Name <span><Asterisk color="#ff0000" className='size-4' /></span></label>
              <input
                {...register('name', {
                  required: "Student Name is required",
                  minLength: { value: 2, message: "Student Name must be at least 2 characters" }
                })}
                type="text"
                name='name'
                id='name'
                placeholder='Student Name'
                className='outline-none p-4 mb-3 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50' />

              <label htmlFor="rollNum" className='text-black text-xl flex'>Student Roll Number <span><Asterisk color="#ff0000" className='size-4' /></span></label>
              <input
                {...register('rollNum', {
                  required: "Roll Number is required",
                  pattern: { value: /^[0-9]+$/, message: "Invalid roll number" }
                })}
                type="text"
                name='rollNum'
                id='rollNum'
                placeholder='Enter Your Roll Number'
                className='outline-none p-4 mb-3 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50' />

              <label htmlFor="course" className='text-black text-xl flex'>Course <span><Asterisk color="#ff0000" className='size-4' /></span></label>
              <input
                {...register('course', {
                  required: "course is required",
                  minLength: { value: 2, message: "Course must be minimum 2 characters long" }
                })}
                type="text"
                name='course'
                id='course'
                placeholder='Course'
                className='outline-none p-4 mb-3 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50' />


              <label htmlFor="password" className='text-black text-xl flex'>Password <span><Asterisk color="#ff0000" className='size-4' /></span></label>
              <input
                {...register('password', {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be minimum 8 characters long" }
                })}
                type="text"
                name='password'
                id='password'
                placeholder='Password'
                className='outline-none p-4 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50' />
            </div>

            <button className='bg-cyan-500 hover:bg-cyan-700 text-white mt-5 mb-1 py-4 font-bold w-full'>Register</button>
            <Link to="/StudentLogin" className='text-xl italic font-light'>Already have an account? <u className='font-sans'>Login Here</u></Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentRegistration;
