<script setup>

import {ref, defineEmits, watch} from "vue";

const dropdownValue = ref('All');
const emit = defineEmits(['emitDropdownSelected'])

watch(dropdownValue, ()=>{
  emit('emitDropdownSelected', dropdownValue.value)
})




</script>

<template>

  <div>
    <select v-model="dropdownValue" class="select w-full max-w-xs">
<!--      <option disabled selected>Countries By Continent</option>-->
      <option value="All">All</option>
      <option value="Oceania">Australia </option>
      <option value="Africa">Africa</option>
      <option value="Antarctica">Antarctica</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="North America">North America</option>
      <option value="South America">South America</option>
    </select>
  </div>
</template>