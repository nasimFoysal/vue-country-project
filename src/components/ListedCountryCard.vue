<script setup>
import {defineProps} from 'vue'

const props = defineProps(["country"])

</script>


<template>
  <div class="border border-red-600 mb-8">{{country}}</div>
</template>