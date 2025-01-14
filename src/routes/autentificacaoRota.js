const express = require('express');
const { login } = require('../controllers/controledeAutenticacao');

const router = express.Router();

router.post('/logar', login);

module.exports = router;
