<script setup>

import {ref, watch} from "vue";

const searchText = ref('');
const emit = defineEmits(["search"]);

watch(searchText, ()=>{
  emit("search", searchText.value)
})

</script>

<template>
  <div class="my-5">
<!--    search by name-->
    <input v-model="searchText" type="text" placeholder="Search by name" class="input input-bordered w-full max-w-xs" />
  </div>
<!--  <div>{{searchText}}</div>-->
</template>