const express = require('express');
const { createLaboratory, gerarRelatorio} = require('../controllers/controledeLaboratorio');
const leiDeFDS = require("../middleware/fimDeSemana");

const router = express.Router();

router.post('/novoLab', leiDeFDS, createLaboratory);
router.get('/relatorio', leiDeFDS, gerarRelatorio)

module.exports = router;
