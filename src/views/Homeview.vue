<script setup>
import AllCountries from "../components/AllCountries.vue";
import Banner from "../components/Banner.vue";


</script>



<template>
  <div>
    <Banner></Banner>

    <Suspense>
      <template #default>
        <AllCountries></AllCountries>
      </template>
      <template #fallback>
        <div>
          <h1>Loading.......</h1>
        </div>
      </template>

    </Suspense>
  </div>
</template>
