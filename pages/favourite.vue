<template>
  <Head>
    <Title>Favourite</Title>
  </Head>

  <div 
    v-if="!favouriteItems || favouriteItems.length < 1"
    class="empty">
    <h1>Your favourite items will appear here &#128194;</h1>
  </div>

  <div 
    v-else
    class="favourite-items">
    <h1 v-if="favouriteItems && favouriteItems.length > 1">Total items: {{ favouriteItems.length }}</h1>
    <CardWrapper>
      <Card
        v-for="(item, index) in favouriteItems"
        :key="index"
        :id="item.name + item.alpha_two_code"
        :country="item.country"
        :code="item.code"
        :name="item.name"
        :state-province="item.stateProvince"
        :web-pages="item.webPages"
        :favourite="item.favourite" />
    </CardWrapper>
  </div>
</template>

<script setup>
import { getFavorites } from '../composables/states';

const favouriteItems = useFavourite()

onMounted(() => {
  getFavorites()
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/_colors.scss';

.empty {
  background-color: $mint;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 80px;
  box-shadow: 0px 0px 4px 0px rgb(221 255 252 / 16%);

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
  }

  h1 {
    text-align: center;
  }
}

.favourite-items {
  h1 {
    margin: 0 80px;
    font-weight: 400;

    @media (max-width: 768px) {
      margin: 0 20px;
    }
  }
}
</style>
