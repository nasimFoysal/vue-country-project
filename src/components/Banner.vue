<script setup>
import BannerImg from '../assets/banner.jpg'

</script>

<template>
    <div class="h-[90vh] bg-img rounded-lg flex items-center px-4">
      <div class="text-white my-auto lg:w-[60%]">
        <h1 class="text-2xl  lg:text-5xl font-extrabold mb-6">GlobalVista: Unveiling the Globe  - Your Gateway to Global Exploration</h1>
        <p class="text-lg lg:w-[80%]">Learning about all countries fosters global understanding, empathy,  cultural
          appreciation, collaboration, and informed decision-making,
          promoting a connected and peaceful world.</p>
      </div>
<!--        <img class="h-[100%] " :src="BannerImg">-->
    </div>
</template>

<style scoped>
.bg-img{
  background-image: url("../assets/banner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>