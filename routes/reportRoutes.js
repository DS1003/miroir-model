const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.post('/report/user', reportController.reportUser);
router.post('/report/post', reportController.reportPost);
router.post('/report/comment', reportController.reportComment);
router.get('/reports', reportController.getReports);
router.post('/report/resolve', reportController.resolveReport);

module.exports = router;
