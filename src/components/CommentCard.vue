<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {getStoredData} from "../utilities/localstorage.js";
import DisplayComments from "./DisplayComments.vue";

const route = useRoute()
const storedComments = ref([]);

onMounted(()=>{
  storedComments.value = getStoredData('allComments');
})

const formData = ref({
  name: '',
  email: '',
  comment: ''
})

const handleCommentFormData = ()=>{
  const obj = {
    countryCode: route.params.id,
    commentDetails: {
      id: Date.now(),
      name: formData.value.name,
      email: formData.value.email,
      comment: formData.value.comment
    }
  }
  console.log('formmmm')
//   -----------------------------------------
  let allStoredComments = storedComments.value;
  // console.log(allStoredComments);
  if (allStoredComments.length>0) {
    // console.log('inside');
    const hasCommentedBefore = allStoredComments.find(
        (storedComment) => storedComment.countryCode === obj.countryCode
    );
    //     country code ache
    if (hasCommentedBefore) {
      hasCommentedBefore.comments.push({...obj.commentDetails});
      const idx = allStoredComments.findIndex(c => c.countryCode ===    obj.countryCode);
      allStoredComments.splice(idx, 1, hasCommentedBefore);
    } else {
      //     country code nai
      allStoredComments.push({countryCode : obj.countryCode, comments : [{...obj.commentDetails}]});
    }
  } else {
    allStoredComments.push({countryCode : obj.countryCode, comments : [{...obj.commentDetails}]});

  }
  storedComments.value = allStoredComments;


//   -----------------------------------------
  formData.value.name = '';
  formData.value.email = '';
  formData.value.comment = '';
}

watch(storedComments, (newValue)=>{
  localStorage.setItem("allComments", JSON.stringify(newValue))
}, {deep: true})

</script>


<template>
  <div class="grid grid-cols-1 lg:grid-cols-10   gap-6 mt-16">

    <div class="col-span-6">
      <DisplayComments :storedComments="storedComments" :id="route.params.id"></DisplayComments>
    </div>

    <div class="col-span-4 flex  items-start justify-end">
      <form  class="space-y-3 w-[100%] flex flex-col items-center justify-center mt-10">
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
            class="textarea textarea-bordered  min-h-[200px] w-full"
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