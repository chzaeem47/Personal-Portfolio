const express = require('express');
const router = express.Router();
const { contactUser } = require('../controllers/email.controller');

router.post('/contact', contactUser);

module.exports = router;