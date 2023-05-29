<template>
  <div class="navigation">
    <NuxtLink 
      v-for="(item, index) in links" 
      :key="index" 
      :to="item.path"
      class="navigation__item">
      <span>
        {{ item.name }} <span v-html="item.icon" class="navigation__item-icon" />
      </span>
    </NuxtLink>
  </div>
</template>

<script setup>
const links = [
  {
    path: '/',
    name: 'home',
    icon: '&#127969;'
  },
  {
    path: '/favourite',
    name: 'favourite',
    icon: '&#128156;'
  }
]
</script>

<style lang="scss" scoped>
@import '../assets/styles/_colors.scss';

.navigation {
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 40px auto;
  background-color: $white;
  border-radius: 40px;
  box-shadow: 0px 0px 30px 0px #dfdfdf;
  margin-bottom: 40px;

  .exact-active {
    background-color: $blue;
    color: $white;
  }

  &__item {
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    text-transform: capitalize;
    color: $black;
    font-size: 20px;
    border-radius: 40px;

    &:hover {
      .navigation__item-icon {
        transform: scale(1.1);
      }
    }

    &-icon {
      font-size: 22px;
      transition: all .3s ease;
    }
  }
}

</style>