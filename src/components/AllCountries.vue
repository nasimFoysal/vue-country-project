<script setup>
import {ref} from 'vue'
import axios from 'axios';
import CountryCard from "./CountryCard.vue";

const allCountries = ref(null);

const response =await  axios.get('https://restcountries.com/v3.1/all')
allCountries.value = response.data;
// console.log(allCountries.value)

</script>

<template>
    <div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <CountryCard
                v-for="country in allCountries"
                :key="country.cca3"
                :country="country" >

            </CountryCard>
        </div>
    </div>
</template>