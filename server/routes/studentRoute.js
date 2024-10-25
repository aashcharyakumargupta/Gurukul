const router = require('express').Router();
const { studentRegister, studentLogIn, getStudents, getStudentDetail, deleteStudents, deleteStudent, updateStudent, studentAttendance, studentAttendances, deleteStudentsByClass, updateExamResult, clearAllStudentsAttendanceBySubject, clearAllStudentsAttendance, removeStudentAttendanceBySubject, removeStudentAttendance } = require('../controllers/student-controller.js');

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn);
router.get("/Students/", getStudents);
router.get("/Student/:id", getStudentDetail);
router.delete("/Students/", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);
router.put("/Student/:id", updateStudent);
router.put('/UpdateExamResult/:id', updateExamResult);
router.put('/StudentAttendances/', studentAttendances);
router.put('/StudentAttendance/:id', studentAttendance);
router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/', clearAllStudentsAttendance);
router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

module.exports = router;
