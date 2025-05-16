<script>
import { ref, computed, onMounted } from 'vue'
import LanguageSwitcher from "./public/components/language-switcher.component.vue"
import { useUserSession } from "./users/services/user-session.store.js"
import Menu from 'primevue/menu'
import { useRouter } from 'vue-router'
import ClientBalanceBox from './payments/components/client-balance-box.component.vue'

export default {
  name: 'app',
  components: {
    LanguageSwitcher,
    ClientBalanceBox,
    'pv-menu': Menu
  },
  setup() {
    const { currentUser, clearUser } = useUserSession()
    const router = useRouter()

    const drawer = ref(false)
    const menu = ref(null)

    const toolbarItems = computed(() => {
      const role = currentUser.value?.role
      if (role === 'cliente') {
        return [
          { labelKey: 'toolbar.home', to: '/home', icon: 'pi pi-home' },
          { labelKey: 'toolbar.findDesigner', to: '/find-designer', icon: 'pi pi-search' },
          { labelKey: 'toolbar.message', to: '/message', icon: 'pi pi-comment' }
        ]
      } else if (role === 'disenador') {
        return [
          { labelKey: 'toolbar.home', to: '/home', icon: 'pi pi-home' },
          { labelKey: 'toolbar.profile', to: '/profile', icon: 'pi pi-user' },
          { labelKey: 'toolbar.portfolio', to: '/portfolio', icon: 'pi pi-briefcase' },
          { labelKey: 'toolbar.payments', to: '/payments', icon: 'pi pi-credit-card' },
          { labelKey: 'toolbar.qualifications', to: '/qualifications', icon: 'pi pi-graduation-cap' },
          { labelKey: 'toolbar.message', to: '/message', icon: 'pi pi-comment' }

        ]
      }
      return []
    })

    const menuItems = computed(() => [
      {
        label: currentUser.value?.name || 'Usuario',
        icon: 'pi pi-user'
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          clearUser()
          router.push('/login')
        }
      }
    ])

    const onUserButtonClick = (event) => {
      if (menu.value) {
        menu.value.toggle(event)
      }
    }

    // 🚨 Redirección automática al login si no hay usuario
    onMounted(() => {
      if (!currentUser.value) {
        router.push('/login')
      }
    })

    return {
      drawer,
      currentUser,
      toolbarItems,
      menuItems,
      menu,
      onUserButtonClick
    }
  }
}
</script>

<template>
  <pv-toast />
  <pv-confirm-dialog />
  <header>
    <pv-toolbar class="dark-toolbar">
      <template #start>
        <pv-button class="toolbar-icon" icon="pi pi-bars" id="bars-icon" @click="drawer = !drawer" />
        <img src="../public/creatilink-logo.png" class="creatilink-logo">
        <h3 class="title-color">CreatiLink</h3>
      </template>

      <template #center>
        <div v-if="toolbarItems.length > 0" class="flex-column">
          <router-link v-for="item in toolbarItems"
                       :key="item.labelKey"
                       v-slot="{ navigate, href }"
                       :to="item.to" custom>
            <pv-button class="p-button-text no-border" :href="href" @click="navigate">
              <i :class="item.icon"></i> {{ $t(item.labelKey) }}
            </pv-button>
          </router-link>
        </div>
      </template>

      <template #end>
        <div class="user-menu-wrapper">
          <template v-if="currentUser">
            <pv-button
                class="toolbar-icon"
                id="user-icon"
                icon="pi pi-user"
                @click="onUserButtonClick"
                aria-haspopup="true"
                aria-controls="user-menu"
            />
            <pv-menu ref="menu" :model="menuItems" popup id="user-menu" />
          </template>

          <router-link v-else to="/login" custom v-slot="{ navigate, href }">
            <pv-button class="toolbar-icon" id="user-icon" :href="href" @click="navigate">
              <i class="pi pi-user"></i>
            </pv-button>
          </router-link>
        </div>
        <template v-if="currentUser?.role === 'cliente'">
          <client-balance-box />
        </template>
        <language-switcher class="language-switcher" />
      </template>
    </pv-toolbar>

    <pv-drawer class="drawer-creatilink" v-model:visible="drawer">
      <template #header>
        <div class="drawer-title">
          <img src="../public/creatilink-logo.png" class="creatilink-logo">
          <h3>CreatiLink</h3>
        </div>
      </template>
      <div class="drawer-content">
        <router-link v-for="item in toolbarItems"
                     :key="item.labelKey"
                     v-slot="{ navigate, href }"
                     :to="item.to" custom>
          <pv-button class="drawer-button" :href="href" @click="navigate">
            <a :class="item.icon"></a> {{ $t(item.labelKey) }}
          </pv-button>
        </router-link>
      </div>
    </pv-drawer>
  </header>

  <main>
    <router-view />
  </main>
</template>


<style scoped>
* {
  font-family: 'Inter', sans-serif;
}
.language-switcher {
  margin-left: 1rem;
}

.dark-toolbar {
  background-color: #00A295;
  color: white;
}

.no-border {
  border: none;
  background: none;
  color: white;
}

.toolbar-icon {
  margin-right: 1rem;
}

#bars-icon {
  background-color: transparent;
  border: none;
}

#user-icon {
  background-color: black;
  border: none;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  color: white;
}

/* Drawer */
.drawer-title {
  color: white;
  display: flex;
  justify-content: center;
}

.drawer-content {
  display: flex;
  flex-direction: column;
}

.drawer-button {
  margin: 1rem;
  background-color: black;
  border-color: black;
  text-align: left;
  color: white;
  display: flex;
  justify-content: left;
}

.drawer-button:hover {
  background-color: black !important;
  border-color: #00A295 !important;
  color: #00A295 !important;
}
</style>
