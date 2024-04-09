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
  <div>
    <button @click="displayingVisitedCountries = true" class="mr-4">Visited Countries</button>
    <button @click="displayingVisitedCountries = false">Wishlist Countries</button>
  </div>
<!--  <div v-for="country in filteredCountries">{{country}}</div>-->
  <ListedCountryCard v-for="country in filteredCountries" :country="country"></ListedCountryCard>
</template>