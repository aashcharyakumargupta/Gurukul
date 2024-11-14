import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.jpg";
import dams from "../../assets/dams.jpg";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Asterisk } from 'lucide-react';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/Teacher/TeacherLogin", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log("Login data: ", response.data)
      if (response.data && response.data._id) {
        const user = {
          name: response.data.name,
          rollNum: response.data.rollNum,
          sclassName: response.data.sclassName,
          role: response.data.role,
          _id: response.data._id,
        };
        localStorage.setItem("Teacher", JSON.stringify(user));
        toast.success(`Login successful.`);
        navigate("/teacher");
      } else {
        toast.error(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        console.log(error.response)
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const onError = (errors) => {
    Object.values(errors).forEach(error => toast.error(error.message));
  };
  return (
    <>
      <div className='main flex flex-col md:h-screen h-screen bg-blue-600 w-full md:flex-row text-sm'>
        <div className='image bg-green-700 w-full md:h-screen'>
          <img className='h-full w-full md:h-screen object-fit' src={dams} alt="dams college" />
        </div>
        <div className='bg-white w-full h-full md:w-3/4 md:h-screen'>
          <div className='logo'>
            <img className='rounded-full mx-auto w-3/4 h-40 object-cover filter-inverted' src={logo} alt="dams logo" />
          </div>
          <h1 className='text-center text-3xl'>Teacher Login</h1>
          <form onSubmit={handleSubmit(handleOnSubmit, onError)} className='px-10 md:p-10 mx-auto'>
            <div className='mx-auto flex flex-col'>
              <label htmlFor="name" className='text-black text-xl flex'>
                Teacher Name <span><Asterisk color="#ff0000" className='size-4' /></span>
              </label>
              <input
                {...register('name', {
                  required: "Name is required",
                  minLength: { value: 2, message: "Teacher Name must be at least 2 characters long" }
                })}
                type="text"
                name='name'
                id='name'
                placeholder='Teacher Name'
                className='outline-none p-4 shadow-lg border-2 mb-4 border-zinc-400 text-black shadow-red-500/50'
              />
              <label htmlFor="email" className='text-black text-xl flex'>
              Teacher Email <span><Asterisk color="#ff0000" className='size-4' /></span>
              </label>
              <input
                {...register('email', {
                  required: "Email is required",
                })}
                type="email"
                name='email'
                id='email'
                placeholder='Enter Your Email'
                className='outline-none p-4 mb-6 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50'
              />
              <label htmlFor="password" className='text-black text-xl flex'>
                Password <span><Asterisk color="#ff0000" className='size-4' /></span>
              </label>
              <input
                {...register('password', {
                  required: "Password is required",
                  pattern: { value: 8, message: "Invalid Password" }
                })}
                type="text"
                name='password'
                id='password'
                placeholder='Enter Your Password'
                className='outline-none p-4 mb-6 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50'
              />
            </div>
            <button className='bg-cyan-500 hover:bg-cyan-700 text-white mt-5 py-4 font-bold w-full mb-1'>Login</button>
            <Link to="/teacherRegister" className='text-xl italic font-light'>
              Don't have an account? <u className='font-sans'>Register yourself</u>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default TeacherLogin;
