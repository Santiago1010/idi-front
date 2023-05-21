<template>
  <div>
    <q-toolbar>
      <span class="text-body2">&copy; {{ new Date().getFullYear() }} IDI, Tim.</span>

      <q-separator dark vertical class="q-mx-sm" />

      <router-link class="text-body2 text-white" to="/privacity">Privacidad</router-link>

      <q-separator dark vertical class="q-mx-sm" />

      <router-link class="text-body2 text-white" to="/privacity">Términos</router-link>

      <q-separator dark vertical class="q-mx-sm" />

      <router-link class="text-body2 text-white" to="/privacity">Mapa del sitio</router-link>

      <q-separator dark vertical class="q-mx-sm" />

      <router-link class="text-body2 text-white" to="/privacity">Datos de la empresa</router-link>

      <q-space />

      <q-btn flat icon-right="expand_less" @click="dialogFooter = true">asistencia y recursos</q-btn>
    </q-toolbar>

    <q-dialog v-model="dialogFooter" position="bottom">
      <q-card class="footer-card">
        <q-icon class="icon_close" name="close" @click="dialogFooter = false" />

        <div class="row q-mx-xl">
          <col-12 class="col-md-3 q-px-xs">
            <h6 class="text-bold footer-titles">Asistencia</h6>

            <ul>
              <li v-for="(assitance, index) in assitances" :key="index" class="q-my-md">
                <router-link :to="assitance.to">{{ assitance.label }}</router-link>
              </li>
            </ul>
          </col-12>

          <col-12 class="col-md-3 q-px-xs">
            <h6 class="text-bold footer-titles">Comunidad</h6>

            <ul>
              <li v-for="(assitance, index) in assitances" :key="index" class="q-my-md">
                <router-link :to="assitance.to">{{ assitance.label }}</router-link>
              </li>
            </ul>
          </col-12>

          <col-12 class="col-md-3 q-px-xs">
            <h6 class="text-bold footer-titles">Acerca de la plataforma</h6>

            <ul>
              <li v-for="(assitance, index) in assitances" :key="index" class="q-my-md">
                <router-link :to="assitance.to">{{ assitance.label }}</router-link>
              </li>
            </ul>
          </col-12>

          <col-12 class="col-md-3 q-px-xs">
            <h6 class="text-bold footer-titles">IDI</h6>

            <ul>
              <li v-for="(assitance, index) in assitances" :key="index" class="q-my-md">
                <router-link :to="assitance.to">{{ assitance.label }}</router-link>
              </li>
            </ul>
          </col-12>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>


<script setup>
  // Importar internos de vue
  import { ref } from 'vue'

  // Variables y constantes del componente
  const dialogFooter = ref(false)

  const assitances = ref([
    {
      to: '/',
      label: 'Centro de ayuda'
    },
    {
      to: '/',
      label: 'Apoyo a las personas con discapacidad'
    },
    {
      to: '/',
      label: 'Opciones de cancelación'
    },
    {
      to: '/',
      label: 'Denunciar algún fraude'
    }
  ])
</script>

<style scoped>
  .footer-titles {
    font-size: 1.8rem;
    margin-bottom: -1%;
    font-family: 'Work Sans';
  }

  ul {
    list-style: none;
    padding: 0;
    font-size: 1.4rem;
  }

  ul li {
    margin-left: 2%;
  }

  .icon_close {
    position: absolute;
    top: 3%;
    left: 0.8%;
    cursor: pointer;
    font-size: 2rem;
  }

  .footer-card {
    position: absolute;
    min-width: 98.5vw;
    min-height: 50vh;
    bottom: 0%;
  }
</style>
