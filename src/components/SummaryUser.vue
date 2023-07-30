<template>
  <q-avatar size="300px">
    <img :src="avatar ?? 'https://cdn.quasar.dev/img/avatar.png'">
  </q-avatar>

  <h2 class="text-h2 text-bold">{{ fullName }}</h2>
  <h3 class="text-h3">{{ code }}</h3>
</template>

<script setup>
  const props = defineProps(['code', 'fullName', 'avatar'])
</script>
