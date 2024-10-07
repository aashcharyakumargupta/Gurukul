const router = require('express').Router();
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');

router.post('/NoticeCreate/', noticeCreate);
router.get('/NoticeList/', noticeList);
router.delete("/Notices/", deleteNotices);
router.delete("/Notice/:id", deleteNotice);
router.put("/Notice/:id", updateNotice);

module.exports = router;