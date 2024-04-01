<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="flex items-center justify-between gap-4 font-semibold py-5">
    <div>Logo</div>
    <div class="space-x-4">
      <RouterLink to="/" active-class="active">Home</RouterLink>
      <RouterLink to="/about" active-class="active">About</RouterLink>
      <RouterLink to="/contact" active-class="active">Contact Us</RouterLink>
    </div>
    <div class="space-x-2">
        <button>Login</button>
        <button>Sign up</button>
    </div>
  </div>
</template>

<style scoped>
.active {
  font-size: 18px;
  font-weight: bold;
  color: blueviolet;
}
</style>
