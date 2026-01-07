const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.post('/announcement', adminController.postAnnouncement);
router.post('/create-task', adminController.createTask);
router.post('/approve-task', adminController.approveTask);
router.post('/approve-withdrawal', adminController.approveWithdrawal);

module.exports = router;