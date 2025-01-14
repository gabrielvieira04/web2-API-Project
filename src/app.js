const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/autentificacaoRota');

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado'))
    .catch(err => console.error('Erro conexão', err));

app.use('/auth', authRoutes);





module.exports = app;