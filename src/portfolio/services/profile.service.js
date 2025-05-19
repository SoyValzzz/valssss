import { Profile } from '../model/profile.entity';
import axios from 'axios';

const API_URL_PROFILES = 'https://my-json-server.typicode.com/SoyValzzz/Creatilink-db/profiles';
const API_URL_PROJECTS = 'https://my-json-server.typicode.com/SoyValzzz/Creatilink-db2/projects';

// Obtener perfil por ID, incluye proyectos relacionados
export async function getProfile(profileId) {
    try {
        const response = await axios.get(`${API_URL_PROFILES}?id=${profileId}`);
        const profiles = response.data;

        if (!profiles.length) {
            throw new Error('Perfil no encontrado');
        }

        const profileData = profiles[0];

        // Obtener los proyectos asociados desde la nueva URL
        const projectsRes = await axios.get(`${API_URL_PROJECTS}?profileId=${profileData.id}`);
        profileData.projects = projectsRes.data;

        return new Profile(profileData);
    } catch (err) {
        console.error('Error cargando perfil:', err);
        throw err;
    }
}

