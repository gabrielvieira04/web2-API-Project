const express = require('express');
const { createLaboratory } = require('../controllers/controledeLaboratorio');

const router = express.Router();

router.post('/novoLab', createLaboratory);

module.exports = router;
