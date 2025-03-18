import React, { useEffect, useState } from 'react';
import courseModel from "./courseModel.png";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const TaketeacherAttendance = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attendanceTodo, setAttendanceTodo] = useState([]);

    const location = useLocation();
    const { teacherId } = location.state || {};

    console.log("teacherId: ", teacherId)

    const { handleSubmit, register } = useForm();
    const onError = (errors) => {
        Object.values(errors).forEach(error => {
            toast.error(error.message);
        });
    };

    const handleOnSubmitAttendance = async (data) => {
        try {
            const response = await axios.post(`https://gurukul-vw9n.onrender.com/Teacher/TeacherAttendance/${teacherId}`, {
                status: data.status,
                date: data.date
            });
            if (response.data) {
                setAttendanceTodo(prevAttendance => [...prevAttendance, response.data]);
                toast.success("Attendance Marked Successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while marking attendance");
        }
    };

    console.log("attendanceTodo", attendanceTodo)
    return (
        <>
            <div className="w-full">
                <div className="modal backdrop-blur-3xl flex flex-col justify-around border-black-900 mx-auto w-96 md:px-0">
                    <h1 className="text-center text-3xl -mx-20 mt-10">
                        <b>Teacher Name</b> 
                    </h1>
                    <form onSubmit={handleSubmit(handleOnSubmitAttendance, onError)} className={`${isModalOpen ? "hidden" : "block"} px-10 py-4 bg-white text-black border-2 flex flex-col justify-center mt-5`}>
                        <img className="mx-auto h-full object-cover" src={courseModel} alt="add course data" />
                        <label htmlFor="status">Attendance status*</label>
                        <select {...register("status", { required: "Attendance status is Required" })} id="status" className="rounded-lg border-2 border-gray-900 py-2 px-4 mb-3">
                            <option value="">Mark Attendance</option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>

                        <label htmlFor="date">Attendance Date*</label>
                        <input {...register("date", { required: "Date is Required" })} type="date" className="rounded-lg font-5xl mt-1 mb-3 outline-none border-2 border-gray-900 py-3 px-4" />

                        <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-0 mb-3 cursor-pointer">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TaketeacherAttendance;
