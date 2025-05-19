<template>
  <div class="form-container">
    <h2>{{ t('register.title') }}</h2>
    <form @submit.prevent="handleRegister">
      <!-- Email -->
      <div class="field">
        <label for="email">{{ t('register.emailLabel') }}</label>
        <InputText id="email" v-model="user.email" :class="{'p-invalid': submitted && !validEmail(user.email)}" />
        <small v-if="submitted && !validEmail(user.email)" class="p-error">{{ t('register.errors.invalidEmail') }}</small>
      </div>

      <!-- Password -->
      <div class="field">
        <label for="password">{{ t('register.passwordLabel') }}</label>
        <Password
            id="password"
            v-model="user.password"
            toggleMask
            :feedback="false"
            :class="{'p-invalid': submitted && !user.password}"
        />
        <small v-if="submitted && !user.password" class="p-error">{{ t('register.errors.passwordRequired') }}</small>
      </div>

      <!-- Rol -->
      <div class="field">
        <label for="role">{{ t('register.roleLabel') || 'Rol' }}</label>
        <select id="role" v-model="user.role" required :class="{'p-invalid': submitted && !user.role}">
          <option disabled value="">{{ t('register.selectRole') || 'Selecciona un rol' }}</option>
          <option value="profile">{{ t('register.roles.profile') || 'Perfil (Diseñador)' }}</option>
          <option value="client">{{ t('register.roles.client') || 'Cliente' }}</option>
        </select>
        <small v-if="submitted && !user.role" class="p-error">Selecciona un rol</small>
      </div>

      <!-- Botón y mensajes -->
      <Button :label="t('register.button')" type="submit" class="mt-3" />
      <Message v-if="success" severity="success" class="mt-3">
        {{ t('register.successMessage') }}
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
import { authService } from '../services/auth.service.js' // ✅ Nuevo servicio

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const { t } = useI18n()
const router = useRouter()

const user = ref({
  email: '',
  password: '',
  role: ''
})

const submitted = ref(false)
const success = ref(false)
const errorMessage = ref('')

function validEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

async function handleRegister() {
  submitted.value = true
  errorMessage.value = ''

  if (validEmail(user.value.email) && user.value.password) {
    try {
      await authService.register(user.value)
      success.value = true
      submitted.value = false
      user.value = { email: '', password: '', role: '' }
      setTimeout(() => router.push('/login'), 1500)
    } catch (error) {
      errorMessage.value = error.message || t('register.errors.registrationFailed')
    }
  }
}
</script>



<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background-color: #fff;
}
.field {
  margin-bottom: 1.5rem;
}
h2{
  color: #4da6a0;
}
label{
  color: black;
  padding-right: 50px;
}
</style>
