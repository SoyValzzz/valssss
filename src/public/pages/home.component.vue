<template>
  <div>
    <div class="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <h1 class="text-8xl font-bold text-white animate-fade-in">{{ $t('home.welcome') }}</h1>
      <p class="text-4xl text-white mt-4 animate-slide-up">{{ $t('home.to') }}</p>

      <!-- Botón EMPEZAR -->

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { locale } = useI18n();

const changeLanguage = (lang) => {
  locale.value = lang;
};

const goToDashboard = () => {
  router.push('/dashboard');
};
</script>


<style scoped>

.custom-red-button {
  background-color: #00A295; /* rojo intenso */
  color: white;
  padding: 1rem 3rem; /* más grande: 16px vertical, 48px horizontal */
  font-size: 1.5rem; /* texto más grande */
  font-weight: bold;
  border: none; /* quitar borde */
  border-radius: 0.5rem; /* esquinas redondeadas */
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-red-button:hover {
  background-color: #56f6ef; /* rojo más oscuro al hacer hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}


@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 2s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 2s ease-in-out;
}

.bg-white {
  background-color: white;
}

.min-h-screen {
  min-height: 100vh;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.text-8xl {
  font-size: 6rem;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.text-4xl {
  font-size: 2.25rem;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.font-bold {
  font-weight: bold;
}

.text-black {
  color: black;
}

.p-button-raised {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.p-button-raised:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.text-purple-600 {
  color: #000000;
}
</style>
