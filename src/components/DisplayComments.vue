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

    <h1>{{numOfComments}} {{numOfComments <2 ? "Comment" : "Comments"}} </h1>

    <hr>

    <div  v-for="obj in filteredComments">
      <div v-for="comment in obj.comments" class="p-4 mb-4 border border-gray-500 rounded-xl">
        <h1>Name: {{comment.name}}</h1>
        <h4>Email: {{comment.email}}</h4>
        <p>{{comment.comment}}</p>
        <p>{{comment.id}}</p>
        <p>Date: {{new Date(comment.id).toLocaleString('en')}}</p>
      </div>
    </div>
  </div>
</template>