<script setup>
import {defineProps} from 'vue'
import {useRouter} from "vue-router";

const {country} = defineProps(["country"])
const router = useRouter();

const handleDetailsRoute = ()=>{
  router.push(`/country/${country.cca3}`)
}
// console.log(country)

</script>


<template>
    <div @click="handleDetailsRoute" class="border border-gray-400 rounded-xl p-4 hover:cursor-pointer">
      <div class="bg-gray-300 py-4 flex justify-center rounded-xl">
        <img class="rounded-xl max-h-[150px]" :src="country.flags?.png" alt="">
      </div>
      <div class="mt-4 country-card-text space-y-2">
        <h1>Name: <span>{{country.name.common}}</span></h1>
        <h2>Capital:
          <span v-for="(capitalCity, idx) in country.capital" :key="idx">{{capitalCity}}</span>
        </h2>
        <p>Region: <span>{{country.region}}</span></p>
        <p>Area: <span>{{country.area}} sq km</span></p>
        <p>Population: <span>{{country.population}}</span></p>
        <p>Independent: <span>{{country.independent ? "Yes":"No"}}</span></p>

      </div>
      <div class="flex justify-center">
        <button class="py-2 mt-4 bg-blue-400 text-white font-bold rounded-lg w-[75%]">View Details</button>
      </div>

    </div>
</template>

<style>
.country-card-text span{
  font-weight: 500;

}
</style>