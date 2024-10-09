const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');

const subjectCreate = async (req, res) => {
    try {
        const {subName,subCode,sessions} =req.body;
        const existingSubjectBySubCode = await Subject.findOne({subCode});
        if (existingSubjectBySubCode) {
            res.send({ message: 'Sorry this subcode must be unique as it already exists' });
        } else {
            const newSubject = new Subject({subName,subCode,sessions,sclassName:req.params.id});
            const result = await newSubject.save();
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const allSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({})
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const classSubjects = async (req, res) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id })
        if (subjects.length > 0) {
            res.send(subjects)
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const freeSubjectList = async (req, res) => {
    try {
        let subjects = await Subject.find({ sclassName: req.params.id, teacher: { $exists: false } });
        if (subjects.length > 0) {
            res.send(subjects);
        } else {
            res.send({ message: "No subjects found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSubjectDetail = async (req, res) => {
    try {
        let subject = await Subject.findById(req.params.id);
        if (subject) {
            subject = await subject.populate("sclassName", "sclassName")
            subject = await subject.populate("teacher", "name")
            res.send(subject);
        }
        else {
            res.send({ message: "No subject found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteSubject = async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
        await Teacher.updateOne(
            { teachSubject: deletedSubject._id },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );
        await Student.updateMany(
            {},
            { $pull: { examResult: { subName: deletedSubject._id } } }
        );
        await Student.updateMany(
            {},
            { $pull: { attendance: { subName: deletedSubject._id } } }
        );
        res.send(deletedSubject);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteSubjectsByClass = async (req, res) => {
    try {
        const deletionResult = await Subject.deleteMany({ sclassName: req.params.id });
        const deletedSubjects = await Teacher.find({ teachSclass: req.params.id });
        await Teacher.updateMany(
            { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
            { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
        );
        await Student.updateMany(
            {},
            { $set: { examResult: null, attendance: null } }
        );
        res.send(deletionResult);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { subjectCreate, freeSubjectList, classSubjects, getSubjectDetail, deleteSubjectsByClass, deleteSubject, allSubjects };