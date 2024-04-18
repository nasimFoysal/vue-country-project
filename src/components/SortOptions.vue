<script setup>

import {ref, defineEmits, watch} from "vue";

const sortValue = ref('Sort By');
const emit = defineEmits(['emitSortValue'])

watch(sortValue, ()=>{
  emit("emitSortValue", sortValue.value)
})
</script>

<template>
  <div>
    <select v-model="sortValue" class="select w-full max-w-xs">
      <option value="sort By">Sort By</option>
      <option value="populationAscending">Sort By Population Ascending</option>
      <option value="populationDescending">Sort By Population Descending</option>
      <option value="areaAscending">Sort By Area Ascending</option>
      <option value="areaDescending">Sort By Area descending</option>
    </select>
    {{sortValue}}
  </div>
</template>