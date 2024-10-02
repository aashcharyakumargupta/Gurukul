const router = require('express').Router();
const { adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');


router.post('/AdminLogin', adminLogIn);
router.get("/Admin/:id", getAdminDetail);
router.delete("/Admin/:id", deleteAdmin);
router.put("/Admin/:id", updateAdmin);

module.exports = router;