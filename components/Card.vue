<template>
  <div 
    :id="id"
    class="card" 
    :class="favourite ? 'card-favourite' : ''">
    <span 
      v-show="favourite">&#11088;</span>
    <h2 class="card__name">{{ name }}</h2>
    <div class="card__location">
      <span class="card__location-country">{{ country }}</span>
      <span 
        v-if="stateProvince"
        class="card__location-province">, {{ stateProvince }}</span>
      <span 
        v-if="code"
        class="card__location-code">{{ code }}</span>
    </div>
    <div class="card__links">
    <a 
      v-for="(item, index) in webPages" 
      :key="index"
      :href="item"
      target="_blank">{{ item }}</a>
    </div>
    <div class="card__action">
      <button 
        v-if="favourite"
        class="card__action-remove"
        @click="removeFromFavourites(props)">Remove from favourites</button>
      <button 
        v-if="!favourite"
        class="card__action-add"
        @click="checkAndAddToFavourite(props)">Add to favourites</button>
    </div>
  </div>
</template>

<script setup>
import { useAddToFavourites, useRemoveFromFavourites } from '../composables/states';

const props = defineProps(['id', 'country', 'code', 'name', 'state-province', 'web-pages', 'favourite'])

const addToFavourites = useAddToFavourites()
const removeFromFavourites = useRemoveFromFavourites()
const favouriteItems = useFavourite()

const checkAndAddToFavourite = (props) => {
  const isAlreadyAdded = Boolean(favouriteItems.value.find(f => f.id === props.id))
  if(isAlreadyAdded) return
  
  addToFavourites(props)
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/_colors.scss';

$card-box-shadow: 0 30px 30px -25px rgba(65, 51, 183, 0.25);

.card.card-favourite {
  background-color: $thistle;

  .card__location-code {
    background-color: $rose;
    color: $white;
  }
}

.card {
  width: 17%;
  border-radius: 16px;
  background-color: $white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  box-shadow: $card-box-shadow;
  transition: all .2s ease;

  &:hover {
    background-color: $light-grey;
    box-shadow: none;
  }

  @media (max-width: 1440px) {
    width: 22%;
  }

  @media (max-width: 920px) {
    width: 45%;
  }

  @media (max-width: 840px) {
    width: 100%;
  }

  &__name {
    order: 1;
    font-weight: 600;
    font-size: 20px;

    @media (max-width: 840px) {
      margin: 0;
    }
  }

  &__location {
    order: 0;
    display: flex;
    flex-wrap: wrap;

    &-code {
      font-size: 12px;
      margin-left: auto;
      padding: 3px 6px;
      font-weight: 600;
      background-color: $light-grey;
      border-radius: 16px;
    }
  }

  &__links {
    order: 2;

    a {
      display: block;
      width: fit-content;
      color: $blue;
      word-break: break-all;

      &:not(:last-child) {
        margin-bottom: 4px;
      }
    }
  }

  &__action {
    order: 3;

    button {
      width: fit-content;
      border-radius: 6px;
      font-weight: 500;
      padding: 5px 10px;
      cursor: pointer;
      margin-top: 20px;
      transition: all .3s ease;
    }

    &-add {
      border: 2px solid $purple;
      background-color: $white;
      color: $purple;

      &:hover {
        background-color: $purple;
        color: $white;
      }
    }

    &-remove {
      border: 2px solid $rose;
      color: $white;
      background-color: $rose;

      &:hover {
        background-color: $white;
        color: $rose;
      }
    }
  }
}
</style>
