<script setup>
import {ref, defineEmits, watch} from "vue";

const checkboxValue = ref(false);
const emit = defineEmits(["checkboxclicked"]);

watch(checkboxValue, ()=>{
  emit('checkboxclicked', checkboxValue.value)
})

</script>

<template >
  <div>
    <input v-model="checkboxValue" type="checkbox" name="" id="" >
    <label>Independent</label>
    {{checkboxValue}}
  </div>

</template>