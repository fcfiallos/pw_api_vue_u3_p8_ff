import axios from "axios";

const consultarTodosEstudiantes = async () => {
    const response = axios.get("http://localhost:8081/api/matricula/v1/estudiantes").then(resp => resp.data);
    return response;
}

const consultarEstudiantePorId = async (id) => {
    const response = axios.get(`http://localhost:8081/api/matricula/v1/estudiantes/${id}`).then(resp => resp.data);
    return response;
}

const obtenerEstudiantePorId = async(id)=>{
    const data = await consultarEstudiantePorId(id);
    const estudiante = {
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento
    };
    return estudiante;
}

export const obtenerEstudiantesFachada = async () => {
    return await consultarTodosEstudiantes();
}

export const obtenerEstudiantePorIdFachada = async (id) => {
    return await obtenerEstudiantePorId(id);
}