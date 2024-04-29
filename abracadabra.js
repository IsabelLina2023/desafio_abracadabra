import express from 'express';
import path from 'path';
import usuarios from './assets/js/usuarios.js';

//const express = require('express');
const app = express();
const PORT = 5000;

const __dirname = path.resolve();

app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.send('<center><h2>✨Bienvenidos al servidor Abracadabra✨</center></h2>');
});

app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ usuarios });
});

//Middleware

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;
    const validar = usuarios
        .map((u) => u.toLowerCase())
        .includes(usuario.toLocaleLowerCase());
    if (validar) {
        next();
    } else {
        res.sendFile(__dirname + '/assets/who.jpeg');
    }
});

//Ruta:
app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/abracadabra/conejo/:n', (req, res) => {
    const numero = Math.floor(Math.random() * 4 + 1);
    const n = +req.params.n;
    if (n == numero) {
        res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
        res.sendFile(__dirname + '/assets/voldemort.jpg');
    }
});

app.get('*', (req, res) => {
    res.send(
        '<center><h2>😕Esta página no existe</center></h2>'
    );
})

app.listen(PORT, console.log(`🔥Server on 🔥 http://localhost:${PORT}`));
