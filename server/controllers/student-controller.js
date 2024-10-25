const bcrypt = require('bcrypt');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const Sclass = require('../models/sclassSchema.js');

const studentRegister = async (req, res) => {
    try {
        const sclassobj = await Sclass.findOne({ sclassName: req.body.course});
        if (!sclassobj) {
            return res.status(400).json({ message: 'Class not exists' });
        }
        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            sclassName: sclassobj._id,
        });
        if (existingStudent) {
            return res.status(400).send({ message: 'Roll Number already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const student = new Student({
            ...req.body,
            password: hashedPass,
            sclassName: sclassobj._id,
        });
        let result = await student.save();
        result.password = undefined;
        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const studentLogIn = async (req, res) => {
    try {
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.name });
        if (student) {
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                student = await student.populate("sclassName", "sclassName")
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                res.send(student);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudents = async (req, res) => {
    try {
        let students = await Student.find().populate("sclassName", "sclassName");
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudentDetail = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id)
            .populate("sclassName", "sclassName");
        if (student) {
            student.password = undefined;
            res.send(student);
        }
        else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({ })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateStudent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        result.password = undefined;
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.send({ message: 'Student not found' });
        }
        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );
        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push({ subName, marksObtained });
        }
        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const studentAttendance = async (req, res) => {
    const { subName, status, date } = req.body;
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.send({ message: 'Student not found' });
        }
        const subject = await Subject.findOne({subName:subName});
        const existingAttendance = student.attendance.find(
            (a) =>a.date.toDateString() === new Date(date).toDateString() && a.subName.toString() === subName
        );
        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subName
            ).length;
            if (attendedSessions >= subject.sessions) {
                return res.send({ message: 'Maximum attendance limit reached' });
            }
            student.attendance.push({ date, status, subName});
        }
        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const studentAttendances = async (req, res) => {
    try {
        const subject = await Subject.findById(req.body.subjectId);
        if (!subject) {
            return res.send({ message: 'Subject Not Exists' });
        }
        const attendances = req.body.attendanceData.map((singledata) => ({
            subName: subject.subName,
            status: singledata.status,
            date: singledata.date,
            student: singledata.studentId,
        }));
        let i = 0;
        while (attendances[i] !== undefined) {
            let student = await Student.findById(attendances[i].student);
            let status = attendances[i].status;
            let date = attendances[i].date;
            let subName = attendances[i].subName;
            const existingAttendance = student.attendance.find(
                (a) => a.date.toDateString() === new Date(date).toDateString() && a.subName.toString() === subName
            );
            if (existingAttendance) {
                existingAttendance.status = status;
            } else {
                const attendedSessions = student.attendance.filter(
                    (a) => a.subName.toString() === subName
                ).length;
                if (attendedSessions >= subject.sessions) {
                    return res.send({ message: 'Maximum attendance limit reached' });
                }
                student.attendance.push({ date, status, subName });
            }
            const result = await student.save();
            i++;
        }
        return res.send("Attendance Marked Successfully!!")
    }
    catch (error) {
        console.error("Error in studentAttendance:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const clearAllStudentsAttendanceBySubject = async (req, res) => {
    const sub = await Subject.findById( req.params.id );
    try {
        const subName = sub.subName;
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const clearAllStudentsAttendance = async (req, res) => {
    try {
        const result = await Student.updateMany(
            { $set: { attendance: [] } }
        );
        return res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    try {
        const subName = req.body.subName;
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName : subName } } }
        );
        return res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;
    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );
        return res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { studentRegister, studentLogIn, getStudents, getStudentDetail, deleteStudents, deleteStudent, updateStudent, studentAttendance, studentAttendances, deleteStudentsByClass, updateExamResult, clearAllStudentsAttendanceBySubject, clearAllStudentsAttendance, removeStudentAttendanceBySubject, removeStudentAttendance};
