const hbs = require('hbs');
const fs = require('fs');
// const data = fs.readFileSync('./files/cursos.json');
listaCursos = [];
listaEstudiantes = [];
listaCursosEstudiantes = [];

// ============ Cursos ============ //

// tabla listar cursos
hbs.registerHelper('listarCur', () => {
    listaCursos = require('../files/cursos.json');
    let texto = " <table class='table table-bordered'> \ <thead> \ <th> Nombre </th> \ <th> Id </th> \ <th> Descripción </th> \ <th> Modalidad </th> \ <th> Valor </th> \ <th> Estado </th> \ <th> Duración (Horas) </th> \ </thead> \ <tbody>";
    listaCursos.forEach(curso => {
        texto = texto +
            "<tr>" + "<td>" + curso.codigo + "</td>" +
            "<td>" + curso.nombre + "</td>" +
            "<td>" + curso.descripcion + "</td>" +
            "<td>" + curso.modalidad + "</td>" +
            "<td>" + curso.valor + "</td>" +
            "<td>" + curso.estado + "</td>" +
            "<td>" + curso.duracion + "</td>" + "</tr>"
    });
    texto = texto + "</tbody> </table>"
    return texto;
});

// select listar cursos
hbs.registerHelper('listarSelect', () => {
    listaCursos = require('../files/cursos.json');
    let texto = "<select class='form-control' name='curso'>";
    listaCursos.forEach(curso => {
        texto = texto +
            "<option>" + "<td>" + curso.nombre + "</option>"
    });
    texto = texto + "</select>"
    return texto;
});

// crear curso
hbs.registerHelper('crearCurso', (nombre, codigo, descripcion, modalidad, valor, estado, duracion) => {
    listaCursos = require('../files/cursos.json');
    let curso = {
        nombre: nombre,
        codigo: codigo,
        descripcion: descripcion,
        modalidad: modalidad,
        valor: valor,
        estado: estado,
        duracion: duracion
    };
    let duplicate = listaCursos.find(buscar => buscar.codigo == codigo)
    if (!duplicate) {
        listaCursos;
        listaCursos.push(curso);
        guardar();
        return 'Curso creado exitosamente.';
    } else {
        return 'Ya existe un curso con el mismo ID ingresado.';
    }
});

//collapse cursos
hbs.registerHelper('mostrarCursos', () => {
    listarCursos();
    let texto = "<div class='accordion' id='accordionCursos'>";
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
    texto = texto + "</div>"
    return texto;
});

//listadoCursos
function listarCursos() {
    try {
        listaCursos = require('../files/cursos.json');
    } catch (error) {
        listaCursos = [];
    }
}

//guardar cursos
function guardar() {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('./files/cursos.json', datos, (error) => {
        if (error) throw (error);
        return;
    });
}

// ============ Estudiantes ============ //

//tabla listar estudiantes
hbs.registerHelper('mostrarEst', () => {
    listaEstudiantes = require('../files/estudiantes.json');
    let texto = " <table class='table table-bordered'> \ <thead> \ <th> Documento de Identidad </th> \ <th> Nombre </th> \ <th> Apellido </th> \ <th> Correo Electrónico </th> \ <th> Teléfono </th> \ <th> Curso (Id) </th> \ </thead> \ <tbody>";
    listaEstudiantes.forEach(est => {
        texto = texto +
            "<tr>" + "<td>" + est.documento + "</td>" +
            "<td>" + est.nombre + "</td>" +
            "<td>" + est.apellido + "</td>" +
            "<td>" + est.correo + "</td>" +
            "<td>" + est.telefono + "</td>" +
            "<td>" + est.curso + "</td>" + "</tr>"
    });
    texto = texto + "</tbody> </table>"
    return texto;
});

//collapse cursos con estudiantes
hbs.registerHelper('mostrarCursosEst', () => {
    listaCursos = require('../files/cursos.json');
    let texto = "<div class=col-md-12>";
    let estudiante;
    listaCursos.forEach(curso => {
        estudiante = agregarEstCurso(curso.codigo);
        console.log('estudiante', estudiante);
        texto = texto +
            `<p> ${curso.nombre} </p>
            ${estudiante}
            `
    });
    texto = texto + "</div>"
    return texto;
});

function agregarEstCurso(cod) {
    console.log('codigo ingresado', cod);
    listaCursosEstudiantes = require('../files/cursos-estudiantes.json');
    listaCursosEstudiantes.forEach(est => {
        if (est.curso_id == cod) {
            console.log(est.estudiante_id);
            mostrarInfoEstudiante(est.estudiante_id);
            console.log(mostrarInfoEstudiante(est.estudiante_id));
            return mostrarInfoEstudiante(est.estudiante_id);
        }
    });
}

//listadoEstudiantes
function listarEstudiantes() {
    try {
        listaCursos = require('../files/estudiantes.json');
    } catch (error) {
        listaCursos = [];
    }
}

//listadoCursosEstudiantes
function listarCursosEstudiantes() {
    try {
        listaCursosEstudiantes = require('../files/cursos-estudiantes.json');
    } catch (error) {
        listaCursosEstudiantes = [];
    }
}

function mostrarInfoEstudiante(doc) {
    listaEstudiantes = require('../files/estudiantes.json');
    let est = listaEstudiantes.find(buscar => buscar.documento == doc)
    if (!est) {
        return 'Estudiante no existe.';
    } else {
        return est.nombre;
    }
}

function mostrarInfoCurso(cod) {
    listaCursos = require('../files/cursos.json');
    let curso = listarCursos.find(buscar => buscar.codigo == cod)
    if (!curso) {
        return 'Estudiante no existe.';
    } else {
        return curso.nombre;
    }
}