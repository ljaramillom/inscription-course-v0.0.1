const fs = require('fs');
listaCursos = [];
listaEstudiantes = [];
listaCursosEstudiantes = [];

//listar curso
const listarCursos = () => {
    try {
        listaCursos = require('../files/cursos.json');
    } catch (error) {
        listaCursos = [];
    }
}

//listar estudiantes
const listarEstudiantes = () => {
    try {
        listaEstudiantes = require('../files/estudiantes.json');
    } catch (error) {
        listaEstudiantes = [];
    }
}

//listar curso por estudiantes
const listarCursosEstudiantes = () => {
    try {
        listaCursosEstudiantes = require('../files/cursos-estudiantes.json');
    } catch (error) {
        listaCursosEstudiantes = [];
    }
}

//crear curso
const crearCurso = (nombre, codigo, descripcion, modalidad, valor, estado, duracion) => {
    listarCursos();
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
}

//actualizar estado de curso
const actualizarCurso = (cod) => {
    listarCursos();
    let curso = listaCursos.find(buscar => buscar.codigo == cod);
    if (!curso) {
        return 'Curso no existe.';
    } else {
        curso.estado = 'Cerrado';
        guardarCurso();
        return 'Curso actualizado exitosamente.'
    }
}

// inscribir estudiante en curso
const inscribirEstudiante = (documento, nombre, apellido, correo, telefono, curso) => {
    listarEstudiantes();
    listarCursosEstudiantes();
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
    let duplicate = listaCursosEstudiantes.find(buscar => (buscar.curso_id == curso && buscar.estudiante_id == documento));
    if (!duplicate) {
        listaEstudiantes;
        listaEstudiantes.push(estudiante);
        inscribir();
        listaCursosEstudiantes.push(cursoest);
        inscribirCursoEst();
        return 'Inscripción realizada exitosamente.';
    } else {
        return 'El estudiante ya se encuentra matriculado en el curso.';
    }
}

// guardar curso
const guardarCurso = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('./files/cursos.json', datos, (error) => {
        if (error) throw (error);
        return;
    });
}

// inscribir estudiante
const inscribir = () => {
    let datos = JSON.stringify(listaEstudiantes);
    fs.writeFile('./files/estudiantes.json', datos, (error) => {
        if (error) throw (error);
        return;
    });
}

// guardar eliminacion de estudiante
const guardar = () => {
    let datos = JSON.stringify(listaEstudiantes);
    fs.writeFile('./files/estudiantes.json', datos, (error) => {
        if (error) throw (error);
        return;
    });
}

//inscribir curso por estudiante
const inscribirCursoEst = () => {
    let datos = JSON.stringify(listaCursosEstudiantes);
    fs.writeFile('./files/cursos-estudiantes.json', datos, (error) => {
        if (error) throw (error);
        return;
    });
}

// mostrar nombre completo de estudiante
const mostrarInfoEstudiante = (doc) => {
    listarEstudiantes();
    let est = listaEstudiantes.find(buscar => buscar.documento == doc)
    if (!est) {
        return 'Error';
    } else {
        return est.nombre + ' ' + est.apellido;
    }
}

// mostrar nombre de curso
const mostrarInfoCurso = (cod) => {
    listarCursos();
    let curso = listaCursos.find(buscar => buscar.codigo == cod)
    if (!curso) {
        return 'Error';
    } else {
        return curso.nombre;
    }
}

const eliminarEst = (doc) => {
    let index;
    listarEstudiantes();
    index = listaEstudiantes.findIndex(buscar => buscar.documento == doc);
    if (index > -1) {
        listaEstudiantes.splice(index, 1);
        guardar();
        return 'Estudiante eliminado del curso satisfactoriamente.';
    } else {
        return 'Error';
    }
}

/* const eliminarEst = (doc) => {
    listarEstudiantes();
    let nuevaListaInscritos = listaEstudiantes.filter(buscar => buscar.documento != doc);
    if (nuevaListaInscritos.length == listaEstudiantes.length) {
        return 'Error';
    } else {
        listaEstudiantes = nuevaListaInscritos;
        guardar();
    }
} */

module.exports = {
    listarCursos,
    listarEstudiantes,
    listarCursosEstudiantes,
    crearCurso,
    guardarCurso,
    actualizarCurso,
    inscribir,
    inscribirEstudiante,
    inscribirCursoEst,
    mostrarInfoEstudiante,
    mostrarInfoCurso,
    eliminarEst
}