import User from '../model/user.entity.js';

const API_URL = 'https://my-json-server.typicode.com/SoyValzzz/Creatilink-db/users';

export const authService = {
    async login(email, password) {
        const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
        const users = await res.json();

        if (users.length) {
            const user = users[0]; // Obtener el primer usuario
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user;
        } else {
            throw new Error('Email o contraseña incorrectos');
        }
    },

    async register(userData) {
        // Verificar si el correo ya está registrado
        const check = await fetch(`${API_URL}?email=${userData.email}`);
        const exists = await check.json();

        if (exists.length) throw new Error('El correo ya está registrado');

        // Aquí agregamos lógica para asignar el profileId o clientId
        let userWithId = { ...userData, id: Date.now() }; // Asignamos un id único para el usuario

        // Dependiendo del rol asignamos un profileId o clientId
        if (userData.role === 'profile') {
            userWithId = { ...userWithId, profileId: Date.now() };  // Si es profile, asignamos profileId
        } else if (userData.role === 'client') {
            userWithId = { ...userWithId, clientId: Date.now() };  // Si es client, asignamos clientId
        }

        // Enviar el nuevo usuario a la API
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userWithId)
        });

        if (!res.ok) throw new Error('Error al registrar usuario');

        return userWithId; // Devolver el nuevo usuario
    },

    logout() {
        localStorage.removeItem('currentUser');
    },

    getCurrentUser() {
        const data = localStorage.getItem('currentUser');
        return data ? JSON.parse(data) : null;
    }
};
