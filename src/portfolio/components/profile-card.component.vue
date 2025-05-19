<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <div class="profile-card">
    <div class="header">
      <div class="header-left">
        <div class="icon-container">
          <img :src="profile.icon || '/images/default-icon.jpg'" alt="Profile Icon" class="profile-icon" />
          <label class="camera-icon-icon">
            <i class="fas fa-camera"></i>
            <input type="file" @change="onIconChange" accept="image/*" class="upload-input-hidden" />
          </label>
        </div>
        <div>
          <h1>{{ profile.name }}</h1>
          <p class="location">📍 {{ profile.location }}</p>
        </div>
      </div>

      <div class="header-right">
        <button class="btn edit" @click="openEditModal">{{ $t('profile.editProfile') }}</button>
        <div class="bottom-buttons">
          <button class="btn message">{{ $t('profile.message') }}</button>
          <button class="btn follow">{{ $t('profile.follow') }}</button>
        </div>
      </div>
    </div>

    <div class="body">
      <div class="left-section">
        <div class="nav-buttons">
          <button class="btn-tab" @click="activeTab = 'about'">{{ $t('profile.aboutMe') }}</button>
          <button class="btn-tab" @click="activeTab = 'portfolio'">{{ $t('profile.portfolio') }}</button>
        </div>

        <div class="bio" v-if="activeTab === 'about'">
          <p>{{ profile.bio }}</p>
          <ul>
            <li v-for="(item, index) in profile.experience" :key="index">{{ item }}</li>
          </ul>
        </div>

        <PortfolioSection
            v-if="activeTab === 'portfolio'"
            :projects="profile.projects"
        />
      </div>

      <div class="right-section">
        <div class="profile-img-container" v-if="activeTab === 'about'">
          <img :src="profile.image || 'https://i.pravatar.cc/300?img=3'" alt="Profile Photo" class="profile-img" />
          <label class="camera-icon">
            <i class="fas fa-camera"></i>
            <input type="file" @change="onImageChange" accept="image/*" class="upload-input-hidden" />
          </label>
        </div>

        <!-- Íconos con tooltip -->
        <div class="social-icons-inline" v-if="activeTab === 'about'">
          <a :href="profile.social.instagram" target="_blank" class="icon instagram">
            <div class="tooltip">Instagram</div>
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a :href="profile.social.facebook" target="_blank" class="icon facebook">
            <div class="tooltip">Facebook</div>
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a :href="profile.social.x" target="_blank" class="icon x">
            <div class="tooltip">X</div>
            <i class="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      </div>
    </div>



    <!-- Modal Edición -->
    <div class="modal edit-modal" v-if="showEditModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeEditModal">{{ $t('profile.close') }}</button>
        <h2>{{ $t('profile.editProfile') }}</h2>
        <form @submit.prevent="saveProfileChanges">
          <label>{{ $t('profile.name') }}</label>
          <input v-model="editableProfile.name" type="text" />

          <label>{{ $t('profile.location') }}</label>
          <input v-model="editableProfile.location" type="text" />

          <label>{{ $t('profile.bio') }}</label>
          <textarea v-model="editableProfile.bio"></textarea>

          <label>{{ $t('profile.experience') }}</label>
          <textarea v-model="experienceText"></textarea>

          <label>{{ $t('profile.instagram') }}</label>
          <input v-model="editableProfile.social.instagram" type="text" />

          <label>{{ $t('profile.facebook') }}</label>
          <input v-model="editableProfile.social.facebook" type="text" />

          <label>{{ $t('profile.x') }}</label>
          <input v-model="editableProfile.social.x" type="text" />

          <button type="submit" class="btn edit">{{ $t('profile.save') }}</button>
        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import PortfolioSection from '../pages/portfolio.component.vue';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getProfile } from '../services/profile.service.js'

const activeTab = ref('about') // 'about' será la sección activa por defecto

const profile = ref({
  name: '',
  location: '',
  bio: '',
  image: '',
  icon: '',
  experience: [],
  social: {
    instagram: '',
    facebook: '',
    x: ''
  },
  projects: [] // Agregamos proyectos aquí
});

const showSocialMedia = ref(false)
const showEditModal = ref(false)
const editableProfile = ref({})
const experienceText = ref('')

const openSocialMediaModal = () => showSocialMedia.value = true
const closeSocialMediaModal = () => showSocialMedia.value = false

const openEditModal = () => {
  editableProfile.value = JSON.parse(JSON.stringify(profile.value))
  experienceText.value = editableProfile.value.experience.join('\n')
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const saveProfileChanges = async () => {
  editableProfile.value.experience = experienceText.value.split('\n').map(e => e.trim()).filter(Boolean)

  try {
    const response = await fetch(`https://my-json-server.typicode.com/SoyValzzz/Creatilink-db/profiles/${editableProfile.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editableProfile.value)
    })


    if (!response.ok) throw new Error('Error al guardar en el servidor')

    const updated = await response.json()
    profile.value = updated
    closeEditModal()
  } catch (error) {
    alert('Error al guardar los cambios: ' + error.message)
  }
}


// Carga el perfil y los proyectos
// Carga el perfil y los proyectos
onMounted(async () => {
  try {
    // Obtén el profileId desde localStorage (o desde la ruta si es un SPA con vue-router)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Si no hay profileId, muestra un error y termina
    if (!currentUser || !currentUser.profileId) {
      console.error('No se encontró profileId en el usuario');
      return;
    }

    // Llamada para obtener el perfil por ID (usando profileId)
    const res = await fetch(`https://my-json-server.typicode.com/SoyValzzz/Creatilink-db/profiles?id=${currentUser.profileId}`);
    if (!res.ok) {
      throw new Error('No se pudo cargar el perfil');
    }
    const data = await res.json();

    // Si no se encuentra el perfil, muestra un error
    if (!data || data.length === 0) {
      console.error('Perfil no encontrado');
      return;
    }

    // Asigna el perfil al estado
    profile.value = data[0]; // Suponiendo que el servidor retorna un array con un solo perfil

    // Luego de cargar el perfil, carga los proyectos del perfil
    const projectsRes = await fetch(`https://my-json-server.typicode.com/SoyValzzz/Creatilink-db/projects?profileId=${profile.value.id}`);
    if (!projectsRes.ok) {
      throw new Error('No se pudo cargar los proyectos');
    }
    const projectsData = await projectsRes.json();
    profile.value.projects = projectsData; // Asociamos los proyectos al perfil

  } catch (err) {
    console.error('Error cargando perfil:', err);
  }
});


const updateProfileField = async (field, value) => {
  try {
    const updatedProfile = {...profile.value, [field]: value}

    const response = await fetch(`https://my-json-server.typicode.com/SoyValzzz/Creatilink-db/profiles/${updatedProfile.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProfile)
    })


    if (!response.ok) throw new Error('Error al actualizar el perfil')

    const updated = await response.json()
    profile.value = updated

    if (showEditModal.value) {
      editableProfile.value = JSON.parse(JSON.stringify(updated))
      experienceText.value = editableProfile.value.experience.join('\n')
    }
  } catch (err) {
    alert('Error al actualizar: ' + err.message)

  }

}

const onImageChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    updateProfileField('image', reader.result)
  }
  reader.readAsDataURL(file)
}

const onIconChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    updateProfileField('icon', reader.result)
  }
  reader.readAsDataURL(file)
}

const router = useRouter()
const goToPortfolio = () => {
  router.push('/portfolio')
}
</script>


<style scoped>

.camera-icon-icon {
  position: absolute;
  top: 0px;           /* Ajusta para que se coloque en la posición que deseas sobre la imagen */
  right: 10px;         /* Ajusta para que se coloque a la derecha de la imagen */
  background-color: rgba(255, 255, 255, 0.6);  /* Fondo semi-transparente */
  color: #000000;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.camera-icon-icon:hover {
  background-color: rgba(255, 255, 255, 0.8);  /* Cambio de color al pasar el mouse */
}

.icon-container {
  position: relative; /* Esto es necesario para que el ícono se posicione sobre la imagen */
}




.profile-icon {
  width: 150px; /* Ajusta el tamaño según lo necesites */
  height: 150px; /* Ajusta el tamaño según lo necesites */
  border-radius: 5px; /* Ajusta este valor para obtener bordes más o menos redondeados */
  object-fit: cover; /* Mantiene la proporción sin distorsionar la imagen */

}

.profile-img-container {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.camera-icon {
  position: absolute;
  bottom: 15px;
  right: 15px; /* Cambia a 'center' si quieres centrar */
  background-color: rgba(255, 255, 255, 0.6);
  color: #000000;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.camera-icon:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.upload-input-hidden {
  display: none;
}

.profile-card {
  font-family: 'Segoe UI', sans-serif;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* SECCIÓN ROJA */
.header {
  background: linear-gradient(to right, #7a1c2f, #9d2d44);
  color: #000000;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  width: 100px;
  height: 100px;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}

.btn {
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  font-weight: 600;
  cursor: pointer;
}

.edit {
  background-color: #00A295;
  color: #fff;
  margin-bottom: 1rem;
}

.bottom-buttons {
  display: flex;
  gap: 0.5rem;
}

.message,
.follow {
  background-color: white;
  color: #000000;
}

.body {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Para que se adapte a pantallas pequeñas */
  padding: 2rem;
  gap: 2rem;
  color: #000;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden; /* Prevenir el desbordamiento */
}

.left-section {
  flex: 1 1 60%; /* Que ocupe el 60% y se reduzca si es necesario */
  min-width: 300px;
  box-sizing: border-box;
}




.nav-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn-tab {
  border: none;
  background-color: #00A295;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

@media (max-width: 768px) {
  .left-section,
  .right-section {
    flex: 1 1 100%; /* Ocupan todo el ancho en pantallas pequeñas */
  }
}

.profile-img {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  object-fit: cover;
  box-sizing: border-box;
}

/* --- MODAL SOCIAL MEDIA --- */
.modal.social-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal.social-modal .modal-content {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  position: relative;
  text-align: center;
  width: 90%;
  max-width: 400px;
  max-height: 210px; /* límite de altura para que no sea muy alto */

  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}



.modal.social-modal .close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
  background-color: red;
  border-radius: 50%;
}

.modal.social-modal .close-btn:hover {
  background-color: darkred;
}

.social-photos {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
}

.social-photos a {
  display: inline-block;
  cursor: pointer;
}

.social-photos img {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

/* --- MODAL EDITAR PERFIL --- */
.modal.edit-modal {
  position: fixed; /* ← importante: evita que el fondo se mueva */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  z-index: 1000;
}

.modal.edit-modal .modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  text-align: left;
  width: 90%;
  max-width: 600px;
  max-height: 90vh; /* ← límite vertical */
  overflow-y: auto; /* ← hace scroll dentro del modal */
  color: #000;
}


.modal.edit-modal .close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
  background-color: #ff0000;
  border-radius: 50%;
}

.modal.edit-modal .close-btn:hover {
  background-color: #ff8080;
}

form label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

form input,
form textarea {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 6px;
}

form textarea {
  height: 120px;
  resize: vertical;
}

form button {
  background-color: #00A295;
  color: #fff;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

form button:hover {
  background-color: #9d2d44;
}


.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 3px;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  text-decoration: none;
  color: inherit;
}

.icon .tooltip {
  position: absolute;
  top: -15px;
  background: #333;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
  transition: 0.3s;
  white-space: nowrap;
}

.icon:hover .tooltip {
  opacity: 1;
  transform: translateY(0);
}

.icon i {
  font-size: 40px;
}

.icon.instagram i {
  color: #E1306C; /* rosa característico Instagram */
}

.icon.facebook i {
  color: #1877F2; /* azul Facebook */
}

.icon.x i {
  color: #000000; /* azul Twitter (X) */
}
.icon.instagram .tooltip {
  background: #E1306C; /* color rosa Instagram */
}

.icon.facebook .tooltip {
  background: #1877F2; /* azul Facebook */
}

.icon.x .tooltip {
  background: #000000; /* azul X (Twitter) */
}



.social-icons-inline {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 0px;
}

.social-icons-inline .icon {
  font-size: 20px;
  color: #555;
  transition: color 0.3s;
}

.social-icons-inline .icon:hover {
  color: #e1306c; /* Instagram */
}

.social-icons-inline .facebook:hover {
  color: #3b5998;
}

.social-icons-inline .x:hover {
  color: #000;
}


</style>