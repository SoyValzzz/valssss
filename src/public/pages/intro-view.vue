<template>
  <div class="intro" @click="handleIntroClick">
    <audio ref="introSound" src="/intro-sound.mp3" />
    <img
        ref="logo"
        src="/c1.png"
        alt="Logo Creatilink"
        class="logo"
    />
  </div>
</template>

<script>
export default {
  name: "IntroView",
  methods: {
    handleIntroClick() {
      const sound = this.$refs.introSound;
      const logo = this.$refs.logo;

      sound.volume = 1.0;
      sound.play().catch(() => {
        console.warn("No se pudo reproducir el sonido.");
      });

      logo.classList.add("show");

      setTimeout(() => {
        this.$router.push("/login");
      }, 4500);
    },
  },
};
</script>

<style scoped>
.intro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  cursor: pointer;
}

.logo {
  width: 500px;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 1.5s ease, transform 1.5s ease;
}

.logo.show {
  opacity: 1;
  transform: scale(1.9); /* Aumenta el tamaño del logo al 150% */
}

</style>
