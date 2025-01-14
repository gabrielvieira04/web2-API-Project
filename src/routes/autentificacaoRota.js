const express = require('express');
const { login, register } = require('../controllers/controledeAutenticacao');

const router = express.Router();

router.post('/logar', login);
router.post('/registrar', register);

module.exports = router;
