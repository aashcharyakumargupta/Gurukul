import React, { useEffect, useState } from 'react'
import courseModel from "./courseModel.png"
import { Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from "axios"

const Notice = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [noticeTodo, setNoticeTodo] = useState([])

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm()

    const onError = (errors) => {
        Object.values(errors).forEach(error => {
            toast.error(error.message)
        })
    }

    // Notice Creation complete
    const handleSubmitNotice = async (data) => {
        try {
            const response = await axios.post("http://localhost:5000/Notice/NoticeCreate", {
                title: data.title,
                details: data.details,
                date: data.date
            })
            console.log("response: ", response.data)
            if (response.data) {
                const { title, details, date, _id } = response.data;
                const addNoticeData = [...noticeTodo, { _id: _id, text: { noticeTitle: title, noticeDetail: details, noticeDate: date } }]
                setNoticeTodo(addNoticeData)
                localStorage.setItem('noticeTodo', JSON.stringify(addNoticeData))
                toast.success("Notice added successfully")
                reset();
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    // Fetching all the notices from the database
    const fetchNoticeData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Notice/NoticeList');
            if (Array.isArray(response.data)) {
                const formattedNotices = response.data.map((notice) => ({
                    _id: notice._id,
                    text: {
                        noticeTitle: notice.title,
                        noticeDetail: notice.details,
                        noticeDate: notice.date ? new Date(notice.date.$date || notice.date).toLocaleDateString() : 'No date',
                    }
                }));
                setNoticeTodo(formattedNotices);
                
            } else {
                toast.info(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        } 
    };

    // Delete notice from the queue via id
    const deleteNoticeTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/Notice/Notice/${id}`)
            if (response.status === 200) {
                setNoticeTodo((notices) => notices.filter(notice => notice._id !== id))
                toast.success("Notice deleted successfully")
            }
        } catch (error) {
            toast.error(error)
        }
    };

    useEffect(() => {
      
        fetchNoticeData();
    }, []);



    return (
        <>
            <div className=' w-full '>
                <form onSubmit={handleSubmit(handleSubmitNotice, onError)} className={`modal backdrop-blur-3xl text-black flex flex-col justify-around  border-black-900 shadow-2xl shadow-black-900 mx-auto w-96 bg-white  md:px-0  mt-14`}>
                    <div className={`${isModalOpen ? "hidden" : "block"} px-10  border-2 border-gray-300 flex flex-col justify-center mx-auto `}>
                        <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />

                        <label htmlFor="title" className='text-xl'>Title</label>
                        <input
                            {...register("title", { required: "Title is required", minLength: { value: 2, message: "Minimum 2 character is required" } })}
                            type="text"
                            name='title'
                            id='title'
                            placeholder='Notice title*'
                            className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`}
                        />

                        <label htmlFor="noticeDetail" className='text-xl'>Detail</label>
                        <input
                            {...register('details', { required: "Detail is missing", minLength: { value: 2, message: "Minimum 2 character is required" } })}
                            type="text"
                            name='details'
                            id='details'
                            placeholder='Notice detail*'
                            className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`}
                        />

                        <label htmlFor="date" className='text-xl'>Date</label>
                        <input
                            {...register('date', { required: "Notice Date is required" })}
                            type="date"
                            name='date'
                            id='date'
                            className={`rounded-lg font-5xl outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`}
                        />

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-5 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                        <button type='submit' className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-6 mb-3 cursor-pointer`} >Create Notice</button>
                    </div>
                </form>

                <h1  className={`${isModalOpen ? "block" : "hidden"} text-5xl font-bold text-center mb-10 `}><u>Notices</u></h1>
                {isModalOpen && (<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
                    <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700`}>
                        <thead className='bg-gray-50 dark:bg-gray-700'>
                            <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>S.No</td>
                            <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Title</td>
                            <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Detail</td>
                            <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'> Date</td>
                            <td className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>Action</td>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800'>
                            {
                                noticeTodo.map((noticeTodos, index) => (
                                    <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`} key={noticeTodos.id}>
                                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{index + 1 || "N/A"}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{noticeTodos.text.noticeTitle}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{noticeTodos.text.noticeDetail}.</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{noticeTodos.text.noticeDate}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'> <Trash2 color="#ff0000" className="cursor-pointer" onClick={() => deleteNoticeTodo(noticeTodos._id)} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>)}
                <button className={`px-3 py-2 bg-purple-500 rounded-lg mt-10 mb-5 relative left-96 mx-36 right-20 ${isModalOpen ? "block" : "hidden"}`} onClick={() => setIsModalOpen(false)}>Add Notices</button>
            </div>
        </>
    )
}

export default Notice


