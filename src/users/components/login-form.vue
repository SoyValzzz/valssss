<template>
  <div class="form-container">
    <h2 style="color: black;">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="field">
        <label for="email">{{ t('login.emailLabel') }}</label>
        <InputText
            id="email"
            v-model="credentials.email"
            :class="{ 'p-invalid': submitted && !validEmail(credentials.email) }"
        />
        <small v-if="submitted && !validEmail(credentials.email)" class="p-error">
          {{ t('login.errors.invalidEmail') }}
        </small>
      </div>

      <div class="field">
        <label for="password">{{ t('login.passwordLabel') }}</label>
        <Password
            id="password"
            v-model="credentials.password"
            toggleMask
            :feedback="false"
            :class="{ 'p-invalid': submitted && !credentials.password }"
        />
        <small v-if="submitted && !credentials.password" class="p-error">
          {{ t('login.errors.passwordRequired') }}
        </small>
      </div>

      <div class="field remember-me">
        <input type="checkbox" id="rememberMe" v-model="rememberMe" />
        <label for="rememberMe">{{ t('Remember Me') }}</label>
      </div>

      <div class="button-container">
        <Button
            :label="t('login.button')"
            type="submit"
            class="login-button"
        />
      </div>

      <Message v-if="success" severity="success" class="mt-3">
        {{ t('login.successMessage') }}
      </Message>

      <Message v-if="errorMessage" severity="error" class="mt-3">
        {{ errorMessage }}
      </Message>
    </form>

    <div class="alternative-login">
      <p>{{ t('or Use Your Account') }}</p>
      <div class="social-icons">
        <button aria-label="Login with Facebook" @click="loginWith('facebook')" class="social-btn facebook">
          <i class="pi pi-facebook"></i>
        </button>
        <button aria-label="Login with Google" @click="loginWith('google')" class="social-btn google">
          <i class="pi pi-google"></i>
        </button>
        <button aria-label="Login with LinkedIn" @click="loginWith('linkedin')" class="social-btn linkedin">
          <i class="pi pi-linkedin"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { authService } from '../services/auth.service.js' // ✅ Nuevo servicio
// import { useUserSession } from '../services/user-session.store.js' // ❌ Opcional, si no usas más setUser()

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const { t } = useI18n()
const router = useRouter()
// const { setUser } = useUserSession() // ❌ si ya no se usa

const credentials = ref({
  email: '',
  password: ''
})

const rememberMe = ref(false)
const submitted = ref(false)
const success = ref(false)
const errorMessage = ref('')

function validEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

async function handleLogin() {
  submitted.value = true
  errorMessage.value = ''
  success.value = false

  if (validEmail(credentials.value.email) && credentials.value.password) {
    try {
      const user = await authService.login(credentials.value.email, credentials.value.password)

      if (user) {
        // ✅ Ya se guarda en localStorage dentro de authService
        success.value = true
        submitted.value = false

        setTimeout(() => {
          if (user.role === 'cliente' || user.role === 'disenador') {
            router.push('/home')
          } else {
            router.push('/dashboard')
          }
        }, 1500)
      }
    } catch (error) {
      errorMessage.value = t('login.errors.invalidCredentials')
    }
  }
}

function loginWith(provider) {
  alert(`Login with ${provider} clicked`)
}
</script>


<style scoped>

.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.field {
  margin-bottom: 1rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.login-button {
  border-radius: 25px !important;
  padding: 0.5rem 2.5rem !important;
  font-weight: bold;
}

.alternative-login {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.social-icons {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: #666;
  transition: color 0.3s ease;
}

.social-btn.facebook:hover {
  color: #3b5998;
}

.social-btn.google:hover {
  color: #db4437;
}

.social-btn.linkedin:hover {
  color: #0077b5;
}


label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
  color: #333;
}

.p-error {
  font-size: 0.75rem;
}

h2 {
  font-size: 2.5rem; /* o el tamaño que prefieras */
  font-weight: 700;
  margin-bottom: 1.5rem;
}

</style>
