const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Ambos os campos são obrigatorios" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "Registro realizado", user: { email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "Usuário incorreto"});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(501).json({ error: "Senha ou email incorreto" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.status(200).json({ token });
    } catch {
        res.status(500).json({ error:"Erro interno" });
    }
};

module.exports = { login, register };
