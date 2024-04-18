<script setup>
import {computed, defineProps, onMounted, ref, watch} from "vue";
const props = defineProps(["storedComments", "id"]);

const numOfComments = ref(0)

// const notCommentedBefore = ref(true)
// onMounted(()=>{
  const filteredComments = computed(()=>{
    return props.storedComments.filter(data => data.countryCode === props.id);
    // if(filteredComments){
    //   notCommentedBefore.value = false;
    // }
    // return filteredComments;
  });

// })
watch(filteredComments, (newValue)=>{
  numOfComments.value = newValue[0].comments.length

}, {deep: true})


</script>


<template>
  <div>

    <h1 class="font-bold text-[20px] mb-3">{{numOfComments}} {{numOfComments <2 ? "Comment" : "Comments"}} </h1>

    <hr class="mb-5">

    <div class=""  v-for="obj in filteredComments">
      <div v-for="comment in obj.comments" class="px-4 py-6 mb-4 bg-gray-200 rounded-xl">
        <div class="flex flex-col md:flex-row justify-between">
          <div>
            <h1>Name: <span class="font-semibold">{{comment.name}}</span></h1>
            <h4>Email: <span class="font-semibold">{{comment.email}}</span></h4>
          </div>
          <p class="italic">Date: {{new Date(comment.id).toLocaleString('en')}}</p>
        </div>
        <p class="mt-5">{{comment.comment}}</p>


      </div>
    </div>
  </div>
</template>