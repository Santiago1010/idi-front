<template>
  <q-card class="q-pa-md text-center">
    <h1 class="text-h1 text-bold">Crea tu primer proyecto de investigación</h1>
    <p class="text-body1">Los proyectos son una herramienta personalizable y flexible para planificar y realizar un seguimiento de su trabajo.</p>

    <q-btn color="info" class="q-my-md" label="nuevo proyecto" icon-right="add">
      <q-tooltip>Haz click para abrir la ventana modal que te permitirá crear un nuevo proyecto de investigación</q-tooltip>
    </q-btn>

    <NewInvestigationProject />
  </q-card>
</template>

<script setup>
  // Importar componentes
  import NewInvestigationProject from '../components/NewInvestigationProject.vue'
</script>
