<template>
  <!-- <f-scrollbar height="400px" :min-size="300"> -->
  <f-scrollbar height="400px">
    <div style="display: flex;flex-direction: column;">
      <p v-for="item in 16" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </div>
  </f-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--f-color-primary-light-9);
  color: var(--f-color-primary);
}
</style>
