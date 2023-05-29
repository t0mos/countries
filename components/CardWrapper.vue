<template>
  <div class="card-wrapper">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/_colors.scss';

.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: $lavender;
  padding: 40px;
  border-radius: 16px;
  gap: 20px;
  margin-bottom: 80px;
  margin-left: 80px;
  margin-right: 80px;
  box-shadow: 0px 0px 4px 0px rgba(65, 51, 183, 0.25);

  @media (max-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
  }

  @media (max-width: 430px) {
    padding: 20px;
  }
}
</style>