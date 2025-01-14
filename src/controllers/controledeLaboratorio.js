const Laboratorio = require('../models/laboratorio');

const createLaboratory = async (req, res) => {
    const { name, capacity } = req.body;

    if (!name || !capacity) {
        return res.status(400).json({ error: "Necessario nome e capacidade" });
    }

    try {
        const laboratorio = new Laboratorio({ name, capacity });
        await laboratorio.save();
        res.status(201).json({ message: 'Laboratório criado com sucesso!', laboratorio });
    } catch {
        res.status(500).json({ error: 'Erro ao criar laboratório.' });
    }
};

module.exports = { createLaboratory };
