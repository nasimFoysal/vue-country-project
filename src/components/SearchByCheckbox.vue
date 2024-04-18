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
    <div>
      <input v-model="checkboxValue" type="checkbox" name="" id="" class="mr-2">
      <label class="font-semibold">Independent</label>
    </div>
<!--    {{checkboxValue}}-->
  </div>

</template>