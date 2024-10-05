const router = require('express').Router();
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects } = require('../controllers/subject-controller.js');

router.post('/SubjectCreate', subjectCreate);
router.get('/AllSubjects', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);
router.delete("/Subject/:id", deleteSubject);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);

module.exports = router;