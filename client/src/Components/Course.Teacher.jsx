import React, { useState } from 'react'
import courseModel from "./courseModel.png"


const Teacher = () => {
    const [teacherTodo, setTeacherTodo] = useState([])
    const [teacherName, setTeacherName] = useState("")
    const [teacherSubject, setTeacherSubject] = useState("")
    const [teacherEmail, setTeacherEmail] = useState("")
    const [teacherDepartment, setTeacherDepartment] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

     // Add Teacher Data
  const addTeacherData = () => {
    const addTeacherData = [...teacherTodo, { id: Date.now(), courseId: courseId, text: { teacherName: teacherName, teacherSubject: teacherSubject, teacherEmail: teacherEmail, teacherDepartment: teacherDepartment } }]
    setTeacherTodo(addTeacherData)
    localStorage.setItem("teacherTodo", JSON.stringify(addTeacherData))
    setTeacherEmail("")
    setTeacherName("")
    setTeacherSubject("")
    setTeacherDepartment("")
  }

  // Delete the teacher data
  const deleteTeacherData = (id) => {
    const deleteTeacherData = teacherTodo.filter((teacher) => teacher.id !== id)
    setTeacherTodo(deleteTeacherData)
    localStorage.setItem('teacherTodo', JSON.stringify(deleteTeacherData))
  }

  // filter teacher according to the course
  const filterTeacher = teacherTodo.filter((teacher) => teacher.courseId === courseId)
    return (
        <>
            <div className={`modal backdrop-blur-3xl text-black flex flex-col justify-around  border-black-900 shadow-2xl shadow-black-900 mx-auto w-96 mt-6  md:px-0 `}>
                <div className={`${isModalOpen ? "hidden" : "block"} px-10 -mt-3 border-2 border-gray-300 flex flex-col justify-center mx-auto `}>
                    <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />
                    <label htmlFor="teacherEmail">Teacher Email*</label>
                    <input required type="text" name='teacherEmail' id='teacherEmail' placeholder='Teacher Email*' value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} className={`rounded-lg font-5xl mt-1 mb-3 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                    <label htmlFor="teacherName">Teacher Name*</label>
                    <input required type="text" name='teacherName' id='teacherName' placeholder='Teacher Name*' value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className={`rounded-lg font-5xl mt-1 mb-3 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                    <label htmlFor="teacherSubject">Teacher Subject*</label>
                    <input required type="text" name='teacherSubject' id='teacherSubject' placeholder='Teacher Subject*' value={teacherSubject} onChange={(e) => setTeacherSubject(e.target.value)} className={`rounded-lg font-5xl mb-3 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                    <label htmlFor="teacherDepartment">Department*</label>
                    <input required type="text" name='teacherDepartment' id='teacherDepartment' placeholder='Teacher Deparment*' value={teacherDepartment} onChange={(e) => setTeacherDepartment(e.target.value)} className={`rounded-lg font-5xl mb-3 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-0 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-0 mb-3 cursor-pointer`} onClick={() => { if (teacherName && teacherEmail) { addTeacherData(); setIsModalOpen(true); } else { alert("First enter the Subject name and Subject Code") } }} disabled={!teacherEmail || !teacherName || !teacherSubject} >Create Teacher</button>
                </div>
            </div>

            <div className={` ${isModalOpen ? "block" : "hidden"} text-black  mx-5 px-10 `}>
                <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Teacher</button>
                <h1 className='text-3xl mb-2'>Teacher List :</h1>
                <div className='bg-black text-white px-5 py-5 pr-20 flex justify-between '>
                    <span>Teacher Name</span>
                    <span>Teacher Subject</span>
                    <span>Teacher Email</span>
                    <span>Department</span>
                    <span>Action</span>
                </div>
                <ul className={`text-black`}>
                    {
                        filterTeacher.map((teacherTodo) => (<>
                            <li className={`flex justify-between text-center mx-auto mt-3 px-7`} key={teacherTodo.id}>
                                <span className=''>{teacherTodo.text.teacherName}</span>
                                <span className=''>{teacherTodo.text.teacherSubject}</span>
                                <span className=''>{teacherTodo.text.teacherEmail}</span>
                                <span className=''>{teacherTodo.text.teacherDepartment}</span>
                                <div className='flex'>
                                    <button onClick={() => deleteTeacherData(teacherTodo.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 text-red-700 -mx-20">
                                        <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                                    </svg>
                                    </button>
                                </div>
                            </li>
                        </>))
                    }
                </ul>
            </div>
        </>
    )
}

export default Teacher