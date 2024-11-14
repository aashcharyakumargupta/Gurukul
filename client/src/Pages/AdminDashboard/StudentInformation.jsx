import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const StudentInformation = () => {
  const [activeTab, setActiveTab] = useState("details")
  const location = useLocation()
  const {courseName, studentTodo } = location.state || {}
  const handleTabChange = (tab) => setActiveTab(tab)

  return (
    <>
      <div className='bg-zinc-800 w-full'>
        <nav>
          <ul className='flex p-3 border-2 shadow shadow-black'>
            <li onClick={() => handleTabChange("details")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'details' ? 'text-blue-500' : ''}`} >DETAILS</li>
            <li onClick={() => handleTabChange("subjects")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'subjects' ? 'text-blue-500' : ''}`}>ATTENDENCE</li>
            <li onClick={() => handleTabChange("marks")} className={`mr-10 pt-1 font-semibold cursor-pointer ${activeTab === 'marks' ? 'text-blue-500' : ''}`}>MARKS</li>
          </ul>
        </nav>

        <div>
          {activeTab === "details" && (<div className='flex flex-col text-3xl my-10 mx-20 tracking-wider'>
            <span className='tracking-wide mb-4'>Course: {courseName || "N/A"}</span>
            <span className='tracking-wide mb-4'>Student Name: {studentTodo?.text.subjectName || "N/A"}</span>
            <span className='tracking-wide mb-4'>Roll Number: {studentTodo?.text.subjectCode || "N/A"}</span>
            <span className='tracking-wide mb-4'>Number of Student: {studentTodo.id || "N/A"}</span>
          </div>)}
        </div>
      </div>
    </>
  )
}

export default StudentInformation