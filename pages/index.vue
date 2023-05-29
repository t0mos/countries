<template>
  <Head>
    <Title>Home</Title>
  </Head>

  <div class="filter">
    <div class="filter__country">
      <label for="countries">Select country &#127757;</label>
      <select 
        id="countries"
        name="countries" 
        v-model="selectedCountry">
        <option value="all">All</option>
        <option 
          v-for="(item, index) in countriesSelect"
          :key="index"
          :value="item.alpha_two_code">{{ item.country }}</option>
      </select>
    </div>

    <div class="filter__name">
      <label for="search">Filter by university name &#128270;</label>
      <input 
        id="search" 
        type="search" 
        placeholder="Search university"
        v-model="searchName" />
    </div>

    <button 
      class="filter__reset"
      @click="resetFilters">Reset filters</button>
  </div>

  <CardWrapper v-if="filteredUniversities.length">
    <Card
      v-for="(item, index) in filteredUniversities" 
      :key="index"
      :id="item.name + item.alpha_two_code"
      :country="item.country"
      :code="item.alpha_two_code"
      :name="item.name"
      :state-province="item['state-province']"
      :web-pages="item.web_pages"
      :favourite="item.favourite" />
  </CardWrapper>

  <NothingFound v-else />
</template>

<script setup>
import { getFavorites } from '../composables/states';

const url = 'http://universities.hipolabs.com/search'
const selectedCountry = ref('all')
const searchName = ref('')
const favouriteItems = useFavourite()

async function fetchUniversities() {
  console.time('API call to fetch universities responded in: ')
  return useFetch(url, {
    async onResponse({ request, response, options }) {
      console.timeEnd('API call to fetch universities responded in: ')
      console.log(`Response code: ${response.status}`)
    }
  }).then(r => {
    return toRaw(r.data.value)
  })
}

// only keep unique countries
function getCountriesListFromUniversities(_universities) {
  const countriesUnique = {}
  _universities.forEach(u => {
    if(countriesUnique[u.alpha_two_code]) return
    countriesUnique[u.alpha_two_code] = {
      country: u.country,
      alpha_two_code: u.alpha_two_code
    }
  })

  return Object.values(countriesUnique)
}

const universities = await fetchUniversities()
const countriesSelect = getCountriesListFromUniversities(universities)

// filter universities based on selected country
const filteredUniversities = computed(() => {

  // filter by country
  let filtered = selectedCountry.value === 'all' ?
    universities :
    universities.filter(item => item.alpha_two_code === selectedCountry.value)

  // filter by search phrase
  if (searchName.value !== '') { // Return all universities if the search input is empty
    filtered = filtered.filter(u => u.name.toLowerCase().includes(searchName.value.toLowerCase()))
  }
  
  return filtered.map(u => {
    const foundFavourite = favouriteItems.value?.find(f => f.name === u.name)
    const isFavourite = foundFavourite?.favourite || false
    return {
      ...u,
      favourite: isFavourite
    }
  })
})

// reset select to Canada and empty search field
const resetFilters = () => {
  searchName.value = ''
  selectedCountry.value = 'CA'
}

onMounted(() => {
  getFavorites()
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/_colors.scss';

.filter {
  display: flex;
  margin-bottom: 40px;
  margin-left: 80px;
  margin-right: 80px;

  @media (max-width: 1055px) {
    row-gap: 15px;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
  }

  &__country,
  &__name {
    label {
      font-size: 16px;
      font-weight: 600;
      display: block;
      width: fit-content;
    }
  }

  &__country {
    margin-right: 15px;

    @media (max-width: 1055px) {
      margin-right: 0;
      width: 100%;
    }
  }

  &__name {
    width: 30%;
    margin-right: 15px;

    @media (max-width: 1055px) {
      width: 100%;
      margin-right: 0;
    }
  }

  select,
  input {
    height: 35px;
    font-size: 16px;
    border-radius: 16px;
    border: 2px solid $lavender;
    padding: 0 15px;

    @media (max-width: 1055px) {
      width: 100%;
    }
  }

  input {
    width: 100%;
  }

  &__reset {
    cursor: pointer;
    border: none;
    background-color: $lavender;
    color: $black;
    font-weight: 600;
    padding: 10px;
    border-radius: 16px;
    align-self: flex-end;

    @media (max-width: 1055px) {
      align-self: flex-start;
    }
  }
}
</style>