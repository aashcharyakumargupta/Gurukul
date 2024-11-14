import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import Login from './Pages/Login'
import AuthProvider, { useAuth } from './Context/authProvider.js';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Pages/Register';
import AdminDashBoard from './Pages/AdminDashboard/AdminDashBoard';
import AdminHome from './Pages/AdminDashboard/AdminHome';
import AdminCourses from './Pages/AdminDashboard/AdminCourses';
import CourseInformation from './Pages/AdminDashboard/CourseInformation';
import AdminForm from "./Pages/AdminDashboard/AdminLogin"
import Dashboard from './Pages/Dashboard';
import AdminSubject from './Pages/AdminDashboard/AdminSubject';
import SubjectInformation from './Pages/AdminDashboard/SubjectInformation';
import AdminStudent from './Pages/AdminDashboard/AdminStudent';
import Notice from './Pages/AdminDashboard/Notice';
import AdminTeacher from './Pages/AdminDashboard/AdminTeacher';
import StudentAttendence from './Pages/AdminDashboard/StudentAttendence';
import StudentDashBoard from './Pages/StudentDashboard/StudentDashBoard';
import StudentHome from './Pages/StudentDashboard/StudentHome';
import NotFound from './Components/NotFound.jsx';
import StudentLogin from './Pages/StudentDashboard/StudentLogin.jsx';
import StudentRegistration from './Pages/StudentDashboard/StudentRegistration.jsx';
import AdminProfile from './Pages/AdminDashboard/AdminProfile.jsx';
import StudentSubject from './Pages/StudentDashboard/StudentSubject.jsx';
import StudentProfile from './Pages/StudentDashboard/StudentProfile.jsx';
import StudentAttendance from './Pages/StudentDashboard/StudentAttendance.jsx';
import AdminStudents from './Pages/AdminDashboard/AdminStudents.jsx';
import CourseStudentDetail from './Pages/AdminDashboard/CourseStudentDetail.jsx';
import TeacherRegister from './Pages/TeacherDashboard/TeacherRegister.jsx';
import TeacherLogin from './Pages/TeacherDashboard/TeacherLogin.jsx';
import TeacherHome from './Pages/TeacherDashboard/TeacherHome.jsx';
import TeacherDashboard from './Pages/TeacherDashboard/TeacherDashboard.jsx';
import TeacherProfile from './Pages/TeacherDashboard/TeacherProfile.jsx';
import TeacherAttendance from './Pages/TeacherDashboard/TeacherAttendance.jsx';
import TeacherSchedule from './Pages/TeacherDashboard/TeacherSchedule.jsx';
import TaketeacherAttendance from './Pages/AdminDashboard/TaketeacherAttendance.jsx';
import TeacherAttendanceDetail from './Pages/AdminDashboard/teacherAttendanceDetail.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/adminLogin' element={<AdminForm />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path='/student/*' element={<StudentRoutes />} />
          <Route path='/studentLogin' element={<StudentLogin />} />
          <Route path='/StudentRegistration' element={<StudentRegistration />} />
          <Route path='/teacher/*' element={<TeacherRoutes />} />
          <Route path='/teacherLogin' element={<TeacherLogin />} />
          <Route path='/teacherRegister' element={<TeacherRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  )
}

// New component for admin routes
const AdminRoutes = () => {
  const {authUser} = useAuth()
  const navigate = useNavigate()

  if (!authUser) {
    navigate('/adminLogin');
    return null;
  }
  return (
    <Routes>
      <Route path="/" element={<AdminDashBoard />} >
        <Route index element={<AdminHome />} />
        <Route path='home' element={<AdminHome />} />
        <Route path='notices' element={<Notice />} />
        <Route path='/courses' element={<AdminCourses />} />
        <Route path='courses/information' element={<CourseInformation />} />
        <Route path='subjects' element={<AdminSubject />} />
        <Route path='courses/information/subjectInformation' element={<SubjectInformation />} />
        <Route path='teacherAttendance' element={<TaketeacherAttendance />} />
        <Route path='teacherAttendanceDetail' element={<TeacherAttendanceDetail />} />
        <Route path='subjectInformation/attendence' element={<StudentAttendence />} />
        <Route path='courses/information/courseStudentDetail' element={<CourseStudentDetail />} />
        <Route path='students' element={<AdminStudent />} />
        <Route path='adminStudent' element={<AdminStudents />} />
        <Route path='teachers' element={<AdminTeacher />} />
        <Route path='profile' element={<AdminProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

// New component for student routes
const StudentRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<StudentDashBoard />}>
          <Route index element={<StudentHome />} />
          <Route path='home' element={<StudentHome />} />
          <Route path='subjects' element={<StudentSubject />} />
          <Route path='profile' element={<StudentProfile />} />
          <Route path='attendance' element={<StudentAttendance />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}


// New component for teacher routes
const TeacherRoutes = () => {
  const {authTeacher} = useAuth();
  console.log('Auth Teacher:', authTeacher);
  const navigate = useNavigate()

  if (!authTeacher) {
    navigate('/teacherLogin');
    return null;
  }
  return (
    <>
        <Routes>
          <Route path='/' element={<TeacherDashboard />}>
            <Route index element={<TeacherHome />} />
            <Route path='home' element={<TeacherHome />} />
            <Route path='subjects' element={<TeacherSchedule />} />
            <Route path='profile' element={<TeacherProfile />} />
            <Route path='attendance' element={<TeacherAttendance />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </>
  )
}

export default App