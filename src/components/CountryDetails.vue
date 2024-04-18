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
// --------
// const getCurrency = (country)=>{
//   const x = country.currencies;
//   console.log(x.name)
//   return x.name
// }

</script>

<template>

  <div v-for="country in countryData" class="mt-5  rounded-xl">
  <div class="">
    <h1 class="text-center text-4xl font-bold mb-5 bg-gray-600 text-white py-5 rounded-xl px-16">{{country.name.common}}</h1>
  </div>
    <div class="grid  grid-cols-1 lg:grid-cols-12 gap-4">
      <div class="col-span-4 flex flex-col items-center justify-center bg-gray-300 rounded-xl">
        <div class="p-3">
          <img :src="country.flags?.png" alt="Flag image" class="rounded-xl">
        </div>
        <div v-if="country.coatOfArms.png" class="w-max-[200px] mt-4">
          <p class="font-semibold my-3">Army Emblem:</p>
          <img class="w-24" :src="country.coatOfArms?.png" alt="">
        </div>
      </div>

      <div class="col-span-5 middle-grid space-y-4 bg-gray-500 text-white ps-6 py-4 rounded-xl">
        <p>Official Name: <span>{{country.name.official || "Not Found"}}</span></p>
        <p >Capital City: <span v-for="c in country.capital">{{c|| "Not Found"}}</span></p>
        <p>Independent: <span>{{country.independent ? "Yes":"No"}}</span></p>
        <p>Area: <span>{{country.area || "Not Found"}} sq km</span></p>
        <p>Population: <span>{{country.population || "Not Found"}} </span></p>
        <p>Continent:   <span v-for="c in country.continents">{{c || "Not Found"}}</span></p>
        <p>Subregion: <span>{{country.subregion || "Not Found"}}</span></p>
        <p>Timezone: <span v-for="timezone in country.timezones[0]">{{timezone || "Not Found"}}</span></p>
<!--        <p>Currency: <span>{{getCurrency(country)}}</span></p>-->
        <p>Language

          :
          <span v-for="language in Object.values(country.languages)">{{language}}
            <span v-if="Object.values(country.languages).indexOf(language)< Object.values(country.languages).length-1">,</span>
          </span> </p>
        <p>Borders: <span v-for="border in country.borders">{{border}}
          <span v-if="country.borders.indexOf(border)< country.borders.length-1">,</span> </span></p>
        <p>Start of Week: <span>{{country.startOfWeek[0].toUpperCase() + country.startOfWeek.slice(1)}}</span></p>





      </div>

      <div class="col-span-3 flex flex-col gap-5 bg-gray-300 rounded-xl p-3">
        <button @click="handleMarkAsVisited(country.cca3)"
                class="border border-green-700 bg-green-600 hover:bg-green-800
                 text-white font-semibold text-lg py-3 px-7 rounded-xl">
          Mark as Visited</button>
        <button @click="handleWantToVisit(country.cca3)"
                class="border border-green-700 bg-green-600 hover:bg-green-800
                 text-white font-semibold text-lg py-3 px-7 rounded-xl">
          Want to Visit</button>
        <button @click="handleCommentRoute"
                class="border border-green-700 bg-green-600 hover:bg-green-800
                 text-white font-semibold text-lg py-3 px-7 rounded-xl">
          Add a Comment</button>
      </div>
    </div>


  </div>
  <!--  comment card appears here-->
  <RouterView></RouterView>
</template>



<style scoped>
.middle-grid{
  font-weight: 500;
}
.middle-grid span{
  font-weight: bold;
}
</style>