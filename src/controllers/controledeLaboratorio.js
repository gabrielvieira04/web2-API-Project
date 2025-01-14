const Laboratorio = require('../models/laboratorio');
const PDFDocument = require ("pdfkit");

const createLaboratory = async (req, res) => {
    const { name, capacity } = req.body;

    if (!name || !capacity) {
        return res.status(400).json({ error: "Necessario nome e capacidade" });
    }

    try {
        const laboratorio = new Laboratorio({ name, capacity });
        await laboratorio.save();
        res.status(201).json({ message: "Laboratório criado com sucesso!", laboratorio });
    } catch {
        res.status(500).json({ error: "Erro ao criar laboratório." });
    }
};

const gerarRelatorio = async (req, res) => {
    try {
        const laboratories = await Laboratorio.find();

        if (!laboratories || laboratories.length === 0) {
            return res.status(404).json({ error: "Nenhum laboratório encontrado." });
        }

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="laboratorio_relatorio.pdf"');

        const doc = new PDFDocument();

        doc.pipe(res);

        doc.fontSize(14).text("Relatório de Laboratórios", { align: "center" });
        doc.moveDown();

        laboratories.forEach((lab, index) => {
            doc.fontSize(12).text(`Laboratório ${index + 1}:`);
            doc.text(`Nome: ${lab.name}`);
            doc.text(`Capacidade: ${lab.capacity}`);
            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ error: "Erro ao gerar relatório.", details: error.message });
    }
};

module.exports = { createLaboratory, gerarRelatorio };
