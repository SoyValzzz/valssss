// src/entities/Profile.js
export class Profile {
    constructor({
                    id, // Agregamos un id para el perfil
                    name,
                    location,
                    bio,
                    image,
                    icon, // Nueva propiedad para el ícono
                    experience,
                    social // Redes sociales
                }) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.bio = bio;
        this.image = image;
        this.icon = icon || ''; // Aseguramos que icon tenga un valor por defecto vacío si no se pasa uno
        this.experience = experience;
        this.social = social || {}; // Aseguramos que social no sea undefined
    }
}
