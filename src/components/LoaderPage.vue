<template>
  <q-dialog v-model="utilsStore.loader">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </q-dialog>
</template>

<script setup>
  //Importar stores de pinia
  import { useUtilsStore } from '../stores/UtilsStore.js'

  // Constantes y variables del componente.
  const utilsStore = useUtilsStore()
</script>

<style scoped>
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 100px;
    height: 100px;
    animation: animate 1s linear infinite;
    overflow: hidden;
  }

  .loader span {
    position: absolute;
    width: 50px;
    height: 50px;
    animation: rotate 1s linear infinite;
  }

  .loader span:nth-child(1) {
    top: 0;
    left: 0;
    background: #F79F1F;
  }

  .loader span:nth-child(2) {
    top: 0;
    right: 0;
    background: #12CBC4;
  }

  .loader span:nth-child(3) {
    bottom: 0;
    left: 0;
    background: #ED4C67;
  }

  .loader span:nth-child(4) {
    bottom: 0;
    right: 0;
    background: #A2CB38;
  }

  @keyframes animate {
    0% {
      width: 100px;
      height: 100px;
    }

    10% {
      width: 100px;
      height: 100px;
    }

    50% {
      width: 150px;
      height: 150px;
    }

    90% {
      width: 100px;
      height: 100px;
    }

    100% {
      width: 100px;
      height: 100px;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    10% {
      transform: rotate(0deg);
    }

    60% {
      transform: rotate(90deg);
    }

    90% {
      transform: rotate(90deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
</style>
