<template>
  <router-view/>
</template>

<script setup>
import { useLocaleSwitcher } from './composable/use-locale-switcher.js';

const localeSwitcher = useLocaleSwitcher();
localeSwitcher.loadLastState();
</script>
