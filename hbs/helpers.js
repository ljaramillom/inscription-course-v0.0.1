const hbs = require('hbs');
const fs = require('fs');
// const data = fs.readFileSync('./files/cursos.json');
listaCursos = [];
listaEstudiantes = [];
listaCursosEstudiantes = [];

// ============ Cursos ============ //

// tabla listar cursos
hbs.registerHelper('listarCursos', () => {
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
            `<option value=${curso.codigo}><td>${curso.nombre}</option>`
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
        guardarCurso();
        return 'Curso creado exitosamente.';
    } else {
        return 'Ya existe un curso con el mismo ID ingresado.';
    }
});

//collapse cursos
hbs.registerHelper('mostrarCursos', () => {
    listaCursos = require('../files/cursos.json');
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

//collapse cursos con button
hbs.registerHelper('mostrarCollapse', () => {
    listaCursos = require('../files/cursos.json');
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
                                    <b>Duración(hrs):</b> ${curso.duracion}<br><br>
                                    <button type="submit" value=${curso.codigo} name=codigo class="btn btn-primary">Cambiar Estado</button>
                                    </div>
                                </div>
                            </div>`
        i = i + 1;
    });
    texto = texto + "</div>"
    return texto;
});

//guardar cursos
function guardarCurso() {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('./files/cursos.json', datos, (error) => {
        if (error) throw (error);
        return;
    });
}

//actualizar estado de curso
const actualizarCurso = (cod) => {
    listaCursos = require('../files/cursos.json');
    let curso = listaCursos.find(buscar => buscar.codigo == cod);
    if (!curso) {
        return 'Curso no existe.';
    } else {
        curso.estado = 'Cerrado';
        guardarCurso();
        return 'Curso actualizado exitosamente.'
    }
}

// ============ Estudiantes ============ //

//tabla listar estudiantes
hbs.registerHelper('mostrarEst', () => {
    listaEstudiantes = require('../files/estudiantes.json');
    let texto = " <table class='table table-bordered'> \ <thead> \ <th> Documento de Identidad </th> \ <th> Nombre </th> \ <th> Apellido </th> \ <th> Correo Electrónico </th> \ <th> Teléfono </th> \ <th> Curso (Id) </th> \ </thead> \ <tbody>";
    listaEstudiantes.forEach(est => {
        let nombreCurso = mostrarInfoCurso(est.curso);
        texto = texto +
            "<tr>" + "<td>" + est.documento + "</td>" +
            "<td>" + est.nombre + "</td>" +
            "<td>" + est.apellido + "</td>" +
            "<td>" + est.correo + "</td>" +
            "<td>" + est.telefono + "</td>" +
            "<td>" + nombreCurso + "</td>" + "</tr>"
    });
    texto = texto + "</tbody> </table>"
    return texto;
});

//listado cursos con estudiantes
hbs.registerHelper('mostrarCursosEst', () => {
    listaCursosEstudiantes = require('../files/cursos-estudiantes.json');
    let texto = `<ul>`;
    let i = 1;
    listaCursosEstudiantes.forEach(curso => {
        let nombreCurso = mostrarInfoCurso(curso.curso_id);
        let agregar = agregarEstCurso(curso.curso_id);
        texto = texto + `   <dl>
                            <dt>
                            <li type="square">Curso: ${nombreCurso}</li>
                            <dd>Estudiante: ${agregar}</li></dd>
                            </dt>
                            </dl>`
    });
    i = i + 1;
    texto = texto + `</ul>`
    return texto;
});

// inscripcion
hbs.registerHelper('inscribirEstudiante', (documento, nombre, apellido, correo, telefono, curso) => {
    listaEstudiante = require('../files/estudiantes.json');
    listaCursosEstudiantes = require('../files/cursos-estudiantes.json');
    let estudiante = {
        documento: documento,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        telefono: telefono,
        curso: curso,
    };
    let cursoest = {
        estudiante_id: documento,
        curso_id: curso,
    };
    let duplicate = listaCursosEstudiantes.find(buscar => buscar.estudiante_id == documento && buscar.curso_id == curso)
    if (!duplicate) {
        listaEstudiante = listaEstudiante;
        listaEstudiante.push(estudiante);
        inscribir();
        listaCursosEstudiantes.push(cursoest);
        inscribirCursoEst();
        return 'Inscripción realizada exitosamente.';
    } else {
        listaEstudiante = listaEstudiante;
        return 'El estudiante ya se encuentra matriculado en el curso.';
    }
});

const agregarEstCurso = (cod) => {
    listaCursosEstudiantes = require('../files/cursos-estudiantes.json');
    let est = listaCursosEstudiantes.filter(buscar => buscar.curso_id == cod);
    let nombre;
    if (est.length == 0) {
        return `<span>Ningún estudiante se ha inscrito al curso.</span>`
    } else {
        est.forEach(estudiante => {
            nombre = mostrarInfoEstudiante(estudiante.estudiante_id);
            `<span>${nombre}</span>`
        });
    }
}

//guardar inscripcion
const inscribir = () => {
    let estudiante = JSON.stringify(listaEstudiantes);
    fs.writeFile('./files/estudiantes.json', estudiante, (error) => {
        if (error) throw (error);
        return;
    });
}

//guardar estudiante_id y curso_id
const inscribirCursoEst = () => {
    let cursoest = JSON.stringify(listaCursosEstudiantes);
    fs.writeFile('./files/cursos-estudiantes.json', cursoest, (error) => {
        if (error) throw (error);
        return;
    });
}

//listadoCursosEstudiantes
const listarCursosEstudiantes = () => {
    try {
        listaCursosEstudiantes = require('../files/cursos-estudiantes.json');
    } catch (error) {
        listaCursosEstudiantes = [];
    }
}

//mostrar nombre completo de estudiante
const mostrarInfoEstudiante = (doc) => {
    listaEstudiantes = require('../files/estudiantes.json');
    let est = listaEstudiantes.find(buscar => buscar.documento == doc)
    if (!est) {
        return `<span>Estudiante no existe.</span>`;
    } else {
        return `<span>${est.nombre} ${est.apellido}</span>`;
    }
}

//mostrar nombre de curso
const mostrarInfoCurso = (cod) => {
    listaCursos = require('../files/cursos.json');
    let curso = listaCursos.find(buscar => buscar.codigo == cod)
    if (!curso) {
        return `<span>Curso no existe.</span>`;
    } else {
        return `<span>${curso.nombre}</span>`;
    }
}