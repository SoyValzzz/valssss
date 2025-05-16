// project.service.js

export async function getProjects() {
    const json = {
        "projects": [
            {
                "id": 1,
                "title": "La Última Resistencia",
                "url": "#",
                "image": "https://m.media-amazon.com/images/M/MV5BNjM4YWRmYmMtODdhNS00YzM4LWFiZDktYjJkN2U5MGQ4NmUwXkEyXkFqcGc@._V1_.jpg",
                "likes": "13.4k",
                "comments": "1k",
                "description": "Afiche cinematográfico que refleja la tensión y el drama de la saga 'Attack on Titan', usando contrastes extremos y una atmósfera sombría.",
                "technologies": [
                    "Photoshop",
                    "Composición digital",
                    "Corrección de color",
                    "Ilustración"
                ]
            },
            {
                "id": 2,
                "title": "Kuromi - El Mundo Oscuro",
                "url": "#",
                "image": "https://i.pinimg.com/736x/d0/82/50/d0825037c7fd5eeabf462fb09991cdf8.jpg",
                "likes": "9.4k",
                "comments": "1.2k",
                "description": "Kuromi es un personaje único con una actitud rebelde. Su mundo oscuro y su estilo punk la hacen inolvidable.",
                "technologies": [
                    "Procreate",
                    "Estilo punk",
                    "Ilustración digital",
                    "Paleta oscura"
                ]
            },
            {
                "id": 3,
                "title": "Amanecer en la Cosecha",
                "url": "#",
                "image": "https://imagenes.elpais.com/resizer/v2/GXGGOITRWJG55JTGBCWWJW5UKE.png?auth=a3b4a3e2c702d4d4696597d7007aae7deab4881de372c9c1cd704df45171ed7e&width=1200",
                "likes": "43.6k",
                "comments": "13k",
                "description": "Portada conceptual que simboliza la esperanza en 'Los Juegos del Hambre' con una ilustración impactante de fuego y ave.",
                "technologies": [
                    "Photoshop",
                    "Matte painting",
                    "Concept art",
                    "Manipulación de imagen"
                ]
            },
            {
                "id": 4,
                "title": "Belleza Maldita",
                "url": "#",
                "image": "https://preview.redd.it/tjto828t13251.png?auto=webp&s=98660b3a30ed7edd37dc394e283efe14e662b604",
                "likes": "62k",
                "comments": "11k",
                "description": "Ilustración de 'Tomie' que fusiona belleza y horror, usando entintado clásico japonés y una paleta minimalista.",
                "technologies": [
                    "Tinta japonesa",
                    "Illustrator",
                    "Diseño minimalista",
                    "Blanco y negro"
                ]
            },
            {
                "id": 5,
                "title": "Dragon Ball Z - La Batalla Final",
                "url": "#",
                "image": "https://i.pinimg.com/736x/78/d0/09/78d00969745cbcff1bd7b06c99cc1630.jpg",
                "likes": "25.2k",
                "comments": "2.5k",
                "description": "Una de las peleas más épicas de la saga Z, donde Goku enfrenta a Freezer en una batalla que definirá el destino de Namek.",
                "technologies": [
                    "Clip Studio Paint",
                    "Fan art",
                    "Color dinámico",
                    "Arte digital anime"
                ]
            },
            {
                "id": 6,
                "title": "Thunderbolts: La Furia de los Héroes",
                "url": "#",
                "image": "https://i.pinimg.com/736x/3d/ce/a7/3dcea7615a3bb5d2f614b61a0ecb6010.jpg",
                "likes": "18.3k",
                "comments": "1.3k",
                "description": "Los Thunderbolts, un equipo de héroes inusuales, enfrentan amenazas que desafían todo lo que conocemos.",
                "technologies": [
                    "Photoshop",
                    "Ilustración de cómic",
                    "Sombras dramáticas",
                    "Color de alto contraste"
                ]
            },

            {
                "id": 7,
                "title": "El Nuevo Superman: El Renacer de Krypton",
                "url": "#",
                "image": "https://cadenapolitica.com/wp-content/uploads/2024/12/teaser-superman-legacy-james-gunn-fecha-estreno-mexico-2025.webp",
                "likes": "30.1k",
                "comments": "3k",
                "description": "Con el regreso de Superman, el hombre de acero enfrenta nuevas amenazas que desafían no solo su fuerza, sino su moralidad.",
                "technologies": [
                    "Photoshop",
                    "Estilo cinematográfico",
                    "Diseño de póster",
                    "Luz y sombra"
                ]
            },
            {
                "id": 8,
                "title": "Tatuajes de la Vieja Escuela",
                "url": "#",
                "image": "https://i.pinimg.com/474x/bd/09/29/bd09299805e93880b2b405bec22e3738.jpg",
                "likes": "14.5k",
                "comments": "1k",
                "description": "El arte de los tatuajes de la vieja escuela, con líneas gruesas y colores sólidos.",
                "technologies": [
                    "Tinta tradicional",
                    "Illustrator",
                    "Estilo old school",
                    "Líneas gruesas"
                ]
            },
            {
                "id": 9,
                "title": "Chainsaw Man - La Lucha por la Libertad",
                "url": "#",
                "image": "https://images6.alphacoders.com/125/1259119.jpg",
                "likes": "35.7k",
                "comments": "4.2k",
                "description": "Denji enfrenta su destino mientras lucha contra demonios. Con su motosierra demoníaca, busca la libertad.",
                "technologies": [
                    "Clip Studio Paint",
                    "Ilustración manga",
                    "Sombras intensas",
                    "Estilo oscuro"
                ]
            }
        ]
    };



    return json.projects;
}
