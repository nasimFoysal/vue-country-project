<script setup>
import {computed, onMounted, ref} from 'vue'
import {getStoredData} from "../utilities/localstorage.js";
import axios from "axios";
import ListedCountryCard from "./ListedCountryCard.vue";
// ------------
const allData =ref([]);
const visitedIds = ref([]);
const wantToVisitIds = ref([]);
const displayingVisitedCountries = ref(true);
const displayingWishlist = ref(false)

const response =await  axios.get('https://restcountries.com/v3.1/all');
allData.value = response.data;

onMounted(()=>{
  visitedIds.value = getStoredData("markAsVisited");
  wantToVisitIds.value = getStoredData("wantToVisit");

})

const filteredCountries = computed(()=>{
   if(displayingVisitedCountries.value){
     return allData.value.filter(country => visitedIds.value.includes(country.cca3))
   } else{
     return allData.value.filter(country => wantToVisitIds.value.includes(country.cca3))

   }
})

</script>


<template>
  <div class="flex justify-center items-center  font-bold text-2xl mb-5">
    <p @click="displayingVisitedCountries = true ;displayingWishlist = false"
       class="py-2 px-4 border border-[#4297A0] cursor-pointer rounded-s-lg"
       :class="displayingVisitedCountries && 'bg-[#4297A0] text-white'">
      Visited Countries</p>
    <p @click="displayingVisitedCountries = false; displayingWishlist = true"
       class="py-2 px-4 border border-[#4297A0] cursor-pointer rounded-e-lg"
       :class="displayingWishlist && 'bg-[#4297A0] text-white'"
    >Wishlist Countries</p>
  </div>
<!--  <div v-for="country in filteredCountries">{{country}}</div>-->
  <ListedCountryCard v-for="country in filteredCountries" :country="country"></ListedCountryCard>
</template>