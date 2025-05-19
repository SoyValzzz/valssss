// src/entities/Project.js
export class Project {
    constructor({
                    id,
                    profileId, // Vinculamos el proyecto al perfil
                    title,
                    image,
                    likes = '0',
                    comments = '0',
                    description = '',
                    technologies = [] // Lista de tecnologías usadas en el proyecto
                }) {
        this.id = id;
        this.profileId = profileId; // Esto es clave para asociar el proyecto con un perfil específico
        this.title = title;
        this.image = image;
        this.likes = likes;
        this.comments = comments;
        this.description = description;
        this.technologies = technologies; // Tecnologías asociadas al proyecto
    }
}
