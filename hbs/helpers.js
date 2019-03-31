const hbs = require('hbs');
const fs = require('fs');
const funciones = require('./funciones');

// ============ Cursos ============ //

// crear curso
hbs.registerHelper('crearCurso', (nombre, codigo, descripcion, modalidad, valor, estado, duracion) => {
    return funciones.crearCurso(nombre, codigo, descripcion, modalidad, valor, estado, duracion);
});

// actualizar estado de curso
hbs.registerHelper('actualizarCurso', (cod) => {
    return funciones.actualizarCurso(cod);
});

// eliminar estudiante
hbs.registerHelper('eliminarEstudiante', (doc) => {
    return funciones.eliminarEst(doc);
});

// tabla para listar todos los cursos
hbs.registerHelper('listarCursos', () => {
    listaCursos = require('../files/cursos.json');
    let texto = `<table class='table table-bordered'> \ <thead> \ <th> Id </th> \ <th> Nombre </th> \ <th> Descripción </th> \ <th> Modalidad </th> \ <th> Valor </th> \ <th> Estado </th> \ <th> Duración (Horas) </th> \ </thead> \ <tbody>`
    listaCursos.forEach(curso => {
        texto = texto +
            `<tr>   <td>${curso.codigo}</td>
                    <td>${curso.nombre}</td>
                    <td>${curso.descripcion}</td>
                    <td>${curso.modalidad}</td>
                    <td>${curso.valor}</td>
                    <td>${curso.estado}</td>
                    <td>${curso.duracion}</td></tr>`
    });
    texto = texto + `</tbody> </table>`
    return texto;
});

// select listar cursos
hbs.registerHelper('listarSelect', () => {
    listaCursos = require('../files/cursos.json');
    let texto = `<select class='form-control' name='curso'>`
    listaCursos.forEach(curso => {
        if (curso.estado == 'Disponible') {
            texto = texto +
                `<option value=${curso.codigo}><td>${curso.nombre}</option>`
        }
    });
    texto = texto + "</select>"
    return texto;
});

// collapse cursos
hbs.registerHelper('mostrarCursos', () => {
    listaCursos = require('../files/cursos.json');
    let texto = `<div class='accordion' id='accordionCursos'>`
    let i = 1;
    listaCursos.forEach(curso => {
        texto = texto + `   <div class="card">
                                <div class="card-header" id="heading${i}">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                            Curso: ${curso.nombre} 
                                        </button>
                                    </h5>
                                </div>
                            
                                <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                                    <div class="card-body">
                                    <b>Id:</b> ${curso.codigo}<br> 
                                    <b>Descripción:</b> ${curso.descripcion}<br> 
                                    <b>Modalidad:</b> ${curso.modalidad}<br>
                                    <b>Valor:</b> ${curso.valor}<br>
                                    <b>Estado:</b> ${curso.estado}<br>
                                    <b>Duración(hrs):</b> ${curso.duracion}<br>
                                    </div>
                                </div>
                            </div>`
        i = i + 1;
    });
    texto = texto + `</div>`
    return texto;
});

// collapse cursos con button
hbs.registerHelper('mostrarCollapse', () => {
    listaCursos = require('../files/cursos.json');
    let texto = `<div class='accordion' id='accordionCursos'>`
    let i = 1;
    listaCursos.forEach(curso => {
        if (curso.estado == 'Disponible') {
            texto = texto + `   <div class="card">
            <div class="card-header" id="heading${i}">
                <h5 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        Curso: ${curso.nombre} 
                    </button>
                </h5>
            </div>
        
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                <div class="card-body">
                <b>Id:</b> ${curso.codigo}<br> 
                <b>Descripción:</b> ${curso.descripcion}<br> 
                <b>Modalidad:</b> ${curso.modalidad}<br>
                <b>Valor:</b> ${curso.valor}<br>
                <b>Estado:</b> ${curso.estado}<br>
                <b>Duración(hrs):</b> ${curso.duracion}<br><br>
                <button type="submit" value=${curso.codigo} name=codigo class="btn btn-primary">Cerrado</button>
                </div>
            </div>
        </div>`
            i = i + 1;
        }
    });
    texto = texto + `</div>`
    return texto;
});

// ============ Estudiantes ============ //

// tabla listar estudiantes
hbs.registerHelper('mostrarEst', () => {
    listaEstudiantes = require('../files/estudiantes.json');
    let texto = ` <form action='/delete-student' method='POST'>
    <table class='table table-bordered'> \ <thead> \ <th> Documento de Identidad </th> \ <th> Nombre </th> \ <th> Apellido </th> \ <th> Correo Electrónico </th> \ <th> Teléfono </th> \ <th> Curso </th> \ <th> Acciones </th> \ </thead> \ <tbody>`
    listaEstudiantes.forEach(est => {
        let nombreCurso = funciones.mostrarInfoCurso(est.curso);
        texto = texto +
            `<tr><td>${est.documento}</td>
            <td> ${est.nombre}</td>
            <td>${est.apellido}</td>
            <td> ${est.correo}</td>
            <td> ${est.telefono}</td>
            <td> ${nombreCurso}</td>
            <td><button type="submit" name="documento" value=${est.documento} class="btn btn-danger">Eliminar</button></td></tr></tr>`
    });
    texto = texto + `</tbody> </table>`
    return texto;
});


// tabla listar estudiantes actuales
hbs.registerHelper('mostrarEstAct', () => {
    listaEstudiantes = require('../files/estudiantes.json');
    let texto = `<table class='table table-bordered'> \ <thead> \ <th> Documento de Identidad </th> \ <th> Nombre </th> \ <th> Apellido </th> \ <th> Correo Electrónico </th> \ <th> Teléfono </th> \ <th> Curso </th> \ </thead> \ <tbody>`
    listaEstudiantes.forEach(est => {
        let nombreCurso = funciones.mostrarInfoCurso(est.curso);
        texto = texto +
            `<tr><td>${est.documento}</td>
            <td> ${est.nombre}</td>
            <td>${est.apellido}</td>
            <td> ${est.correo}</td>
            <td> ${est.telefono}</td>
            <td> ${nombreCurso}</td></tr>`
    });
    texto = texto + `</tbody> </table>`
    return texto;
});

// inscripcion
hbs.registerHelper('inscribirEstudiante', (documento, nombre, apellido, correo, telefono, curso) => {
    return funciones.inscribirEstudiante(documento, nombre, apellido, correo, telefono, curso);
});