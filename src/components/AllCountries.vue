<script setup>
import {computed, ref} from 'vue'
import axios from 'axios';
import CountryCard from "./CountryCard.vue";
import Search from "./Search.vue";
import SearchByCheckbox from "./SearchByCheckbox.vue";
import SearchDropdown from "./SearchDropdown.vue";

const allCountries = ref(null);
const searchtext = ref('');
const checkBoxValue = ref(false);
const dropdownSelected = ref(null)

const response =await  axios.get('https://restcountries.com/v3.1/all')
allCountries.value = response.data;

// ---------
const handleSearch = (text)=>{
  searchtext.value = text;

}
const handleCheckBoxClicked =(value)=>{
  checkBoxValue.value = value
}

const handleDropdown = (selected)=>{
  dropdownSelected.value = selected

}
// -----------------

// filter
const filterCountries = computed(()=>{
  console.log('inside computed allcountries')
  let filteredCountries = allCountries.value;
  if(searchtext.value){
    filteredCountries = filteredCountries
        .filter(country => country.name.common.toLowerCase().includes(searchtext.value.toLowerCase()));
  }
  if(checkBoxValue.value){
    filteredCountries = filteredCountries
        .filter(country => country.independent)

  }
  if(dropdownSelected.value && dropdownSelected.value !== "all"){
    filteredCountries = filteredCountries.filter(country => country.continents.includes(dropdownSelected.value))

  }

  return filteredCountries;
})

</script>

<template>
  <div class="flex items-center justify-between">
    <Search @search="handleSearch"></Search>
    {{checkBoxValue}}
    <SearchByCheckbox @checkboxclicked="handleCheckBoxClicked"></SearchByCheckbox>
    <SearchDropdown @emitDropdownSelected="handleDropdown"></SearchDropdown>


  </div>
    <div>
      <hr>
      <div>{{filterCountries.length}}</div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <CountryCard
                v-for="country in filterCountries"
                v-if="filterCountries.length>0"
                :key="country.cca3"
                :country="country" >
            </CountryCard>
          <div v-else>Not Found</div>
        </div>
    </div>
</template>