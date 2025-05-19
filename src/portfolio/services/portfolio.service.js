import axios from 'axios';

export async function getProjects(profileId) {
    try {
        const response = await axios.get('https://my-json-server.typicode.com/SoyValzzz/Creatilink-db2/projects'); // Obtener todos los proyectos
        // Filtrar los proyectos por el profileId correspondiente
        const profileProjects = response.data.filter(project => project.profileId === profileId);

        return profileProjects; // Devuelves los proyectos filtrados para el perfil
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        return []; // En caso de error, devuelves un array vacío
    }
}
