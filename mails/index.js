const express = require('express');
const router = express.Router();
const User = require('../db/user');

router.post('/confirmation');
router.post('/resend');
