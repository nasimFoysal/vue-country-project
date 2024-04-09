<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import {getStoredData, saveCountryIdsToLocalStorage} from "../utilities/localstorage.js";
import {useToast} from "vue-toastification";

const route = useRoute();
const router = useRouter();
const countryData = ref(null)
const toast = useToast();


onMounted(async()=>{
  const response = await axios.get(`https://restcountries.com/v3.1/alpha/${route.params.id}`)
  // console.log(response.data)

  countryData.value = response.data
})

// -----------
const handleWantToVisit =(countryId)=>{

  const getMarkAsVisited = getStoredData('markAsVisited')

  const isExistInMarkAsVisited = getMarkAsVisited.includes(countryId)
  console.log(isExistInMarkAsVisited)
  if(!isExistInMarkAsVisited){
    saveCountryIdsToLocalStorage("wantToVisit", countryId);
    toast.success("Added To Wishlist Countries")

  }else{
    toast.error("You have already visited this country!")
  }
}
const handleMarkAsVisited = (countryId)=>{
  const getWantToVisit = getStoredData("wantToVisit");
  const isExistInWantToVisit = getWantToVisit.includes(countryId);
  if(isExistInWantToVisit){
    const remainingWantToVisit = getWantToVisit.filter(id => id !== countryId);
    localStorage.setItem("wantToVisit", JSON.stringify(remainingWantToVisit));
  }
  saveCountryIdsToLocalStorage('markAsVisited', countryId);
  toast.success("Added To Visited Countries!")

}
// ----------

const handleCommentRoute = ()=>{
  router.push(`/country/${route.params.id}/comment`)
}
console.log(typeof  countryData.value)

</script>

<template>

  <div v-for="country in countryData" class="mt-5 border border-gray-500 p-4 rounded-xl">
    <h1 class="text-center text-3xl font-bold">{{country.name.common}}</h1>

    <div class="grid  grid-cols-1 lg:grid-cols-12 gap-4">
      <div class="col-span-4">
        <div>
          <img :src="country.flags?.png" alt="">
        </div>
        <div class="w-max-[200px] mt-4">
          <p class="font-semibold my-3">Army Emblem:</p>
          <img class="w-24" :src="country.coatOfArms?.png" alt="">
        </div>
      </div>

      <div class="col-span-5 border border-gray-600">
        detail information
      </div>

      <div class="col-span-3 flex flex-col gap-5">
        <button @click="handleMarkAsVisited(country.cca3)"  class="border border-green-700 bg-green-600 hover:bg-green-800 text-white font-semibold text-lg py-3 px-7 rounded-xl">
          Mark as Visited</button>
        <button @click="handleWantToVisit(country.cca3)" class="border border-green-700 bg-green-600 hover:bg-green-800 text-white font-semibold text-lg py-3 px-7 rounded-xl">
          Want to Visit</button>
        <button @click="handleCommentRoute"  class="border border-green-700 bg-green-600 hover:bg-green-800 text-white font-semibold text-lg py-3 px-7 rounded-xl">
          Add a Comment</button>
      </div>
    </div>


  </div>
  <!--  comment card appears here-->
  <RouterView></RouterView>
</template>