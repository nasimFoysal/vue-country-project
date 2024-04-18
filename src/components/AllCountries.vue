<script setup>
import {computed, ref, watch} from 'vue'
import axios from 'axios';
import CountryCard from "./CountryCard.vue";
import Search from "./Search.vue";
import SearchByCheckbox from "./SearchByCheckbox.vue";
import SearchDropdown from "./SearchDropdown.vue";
import SortOptions from "./SortOptions.vue";

const allCountries = ref(null);
const searchtext = ref('');
const checkBoxValue = ref(false);
const dropdownSelected = ref('All');
const showSearchResultHtml = ref(false);
const sortCategory = ref("Sort By")

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

const handleSort =(sortValue)=>{
  sortCategory.value = sortValue

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
  if(dropdownSelected.value && dropdownSelected.value !== "All"){
    filteredCountries = filteredCountries.filter(country => country.continents.includes(dropdownSelected.value))

  }
  if(sortCategory.value && sortCategory.value === "populationAscending"){
    filteredCountries = filteredCountries.sort((a,b)=> a.population - b.population)
  } else if(sortCategory.value && sortCategory.value === "populationDescending"){
    filteredCountries = filteredCountries.sort((a,b)=> b.population - a.population)
  } else if(sortCategory.value && sortCategory.value === "areaAscending"){
    filteredCountries = filteredCountries.sort((a,b)=> a.area - b.area)
  } else if(sortCategory.value && sortCategory.value === "areaDescending"){
    filteredCountries = filteredCountries.sort((a,b)=> b.area - a.area)
  }

  return filteredCountries;
})
// ------------
watch(filterCountries, ()=>{
  showSearchResultHtml.value =true;
})


</script>

<template>
  <h1 class="font-bold text-2xl lg:text-4xl text-center mt-24">Explore the Globe</h1>
  <div class="flex items-center justify-between bg-gray-300 mt-5 px-5 rounded-lg mb-5">
    <Search @search="handleSearch"></Search>
<!--    {{checkBoxValue}}-->

    <SearchByCheckbox @checkboxclicked="handleCheckBoxClicked"></SearchByCheckbox>
    <SortOptions @emitSortValue="handleSort"></SortOptions>
    <SearchDropdown @emitDropdownSelected="handleDropdown"></SearchDropdown>


  </div>
    <div>
      <hr class="mb-5">
      <div v-if="showSearchResultHtml" class="text-2xl font-semibold my-4">Search Result:
        <span class="italic">{{filterCountries.length}}</span>
        <span v-if="filterCountries.length<2" class="italic">Country </span>
        <span v-else class="italic">Countries </span> found
        <hr class="mb-5 mt-4">
      </div>
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