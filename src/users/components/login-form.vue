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

      <Button :label="t('login.button')" type="submit" class="mt-3" />

      <Message v-if="success" severity="success" class="mt-3">
        {{ t('login.successMessage') }}
      </Message>

      <Message v-if="errorMessage" severity="error" class="mt-3">
        {{ errorMessage }}
      </Message>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loginUser } from '../services/user-service.js'
import { useUserSession } from '../services/user-session.store.js'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const { t } = useI18n()
const router = useRouter()
const { setUser } = useUserSession()

const credentials = ref({
  email: '',
  password: ''
})

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
      const user = await loginUser(credentials.value.email, credentials.value.password)

      if (user) {
        setUser(user) // Guardar en localStorage
        success.value = true
        submitted.value = false

        setTimeout(() => {
          if (user.role === 'cliente') {
            router.push('/home')
          } else if (user.role === 'disenador') {
            router.push('/home')
          } else {
            router.push('/dashboard')
          }
        }, 1500)
      } else {
        errorMessage.value = t('login.errors.invalidCredentials')
      }
    } catch (error) {
      errorMessage.value = t('login.errors.invalidCredentials')
    }
  }
}
</script>


<style scoped>
.login-form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f9f9f9;
  font-family: 'Inter', sans-serif;
}

.login-form-card {
  width: 100%;
  max-width: 420px;
  background-color: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #4da6a0;
  font-weight: 600;
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
</style>
