<script setup>
import ListedCountries from "../components/ListedCountries.vue";

</script>



<template>

  <Suspense>
    <template #default>
      <ListedCountries ></ListedCountries>
    </template>
    <template #fallback>
      <div>
        <h1>Loading.....</h1>
      </div>
    </template>
  </Suspense>

</template>


<style scoped>

</style>