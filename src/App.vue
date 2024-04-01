<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';


</script>

<template>
  <div class="container mx-auto px-6 mb-[400px]">
    <Navbar></Navbar>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>

</style>
