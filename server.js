//express
const express = require('express');
const app = express();

//hbs
const hbs = require('hbs');
require('./hbs/helpers');

//bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/create-course', (req, res) => {
    res.render('create-course');
});

app.post('/view-course', (req, res) => {
    res.render('view-course', {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        modalidad: req.body.modalidad,
        valor: req.body.valor,
        estado: 'Disponible',
        duracion: req.body.duracion
    });
});

app.get('/update-course', (req, res) => {
    res.render('update-course');
});

app.post('/view-course-updated', (req, res) => {
    res.render('view-course-updated', {
        codigo: req.body.codigo,
    });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/list-students', (req, res) => {
    res.render('list-students', {
        documento: req.body.documento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        telefono: req.body.telefono,
        curso: req.body.curso
    });
});

app.post('/delete-student', (req, res) => {
    res.render('delete-student', {
        documento: req.body.documento,
    });
});

app.listen(3000, () => {
    console.log('Server on port ' + 3000);
});

app.get('*', (req, res) => {
    res.render('error');
});