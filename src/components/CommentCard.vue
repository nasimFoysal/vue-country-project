<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import {saveCommentsToLocalStorage} from "../utilities/localstorage.js";

const formData = ref({
  name: '',
  email: '',
  comment: ''
})

const route = useRoute()
console.log(route.params.id)


const handleCommentFormData = ()=>{
  const localStorageCommentObj = {
    countryCode: route.params.id,
    commentDetails: {
      id: Date.now(),
      name: formData.value.name,
      email: formData.value.email,
      comment: formData.value.comment


    }
  }
  saveCommentsToLocalStorage(localStorageCommentObj)
  console.log('formmmm')
}

// console.log(formData.value.name)



</script>


<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

    <div class="col-span-1">
      <h1>12 Comments</h1>
    </div>

    <div class="col-span-1 border border-red-600">
      <form  class="space-y-3 w-[80%] flex flex-col items-center justify-center">
        <input
            v-model="formData.name"
            type="text"
            placeholder="Name"
            class="input input-bordered w-full "
        />

        <input
            v-model="formData.email"
            type="text"
            placeholder="Email"
            class="input input-bordered w-full "
        />
        <textarea
            v-model="formData.comment"
            class="textarea textarea-bordered  textarea-lg w-full"
            placeholder="Your comment">
        </textarea>
        <button type="submit"
                @click.prevent="handleCommentFormData"
                class="text-white bg-[#7764A6] py-3 px-6 rounded-2xl font-semibold w-full">
          Add a Comment
        </button>
      </form>
    </div>
  </div>
</template>