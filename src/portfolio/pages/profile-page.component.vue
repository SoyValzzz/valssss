<script setup>
import { ref, onMounted } from 'vue';
import { getProfile } from '../services/profile.service';
import ProfileCard from '../components/profile-card.component.vue';

const profile = ref(null);

onMounted(async () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.profileId) {
      console.error('Usuario no autenticado');
      return;
    }

    profile.value = await getProfile(currentUser.profileId);
  } catch (err) {
    console.error('Error cargando perfil:', err);
  }
});


</script>

<template>
  <section class="profile-page">
    <ProfileCard v-if="profile" :profile="profile" />
  </section>
</template>

<style scoped>
.profile-page {
  padding: 2rem;
}

</style>
