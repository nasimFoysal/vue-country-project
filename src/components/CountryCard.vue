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
      <div>
        <img class="rounded-xl max-h-[150px]" :src="country.flags?.png" alt="">
      </div>
      <div>
        <h1>Name: <span>{{country.name.common}}</span></h1>
        <h2>Capital:
          <span v-for="(capitalCity, idx) in country.capital" :key="idx">{{capitalCity}}</span>
        </h2>
        <p>Region: <span>{{country.region}}</span></p>
        <p>Area: <span>{{country.area}}</span></p>
        <p>Population: <span>{{country.population}}</span></p>
        <p>Independent: <span>{{country.independent}}</span></p>

      </div>

    </div>
</template>