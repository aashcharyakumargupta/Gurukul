const router = require('express').Router();
const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/sclass-controller.js');

router.post('/SclassCreate', sclassCreate);
router.get('/SclassList/', sclassList);
router.get("/Sclass/:id", getSclassDetail);
router.get("/Sclass/Students/:id", getSclassStudents);
router.delete("/Sclasses/", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

module.exports = router;