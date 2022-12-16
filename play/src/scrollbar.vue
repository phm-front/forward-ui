<template>
  <div style="width: 500px; height: 50vh">
    <f-scrollbar height="50%" ref="scrollRef">
      <div style="display: flex;flex-direction: column;">
        <p v-for="item in 16" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </div>
    </f-scrollbar>
  </div>
  <f-button @click="handleScrollTo">scrollTo</f-button>
  <!-- <f-scrollbar height="400px" :min-size="300"> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FScrollbar } from '@forward-ui/components';

const scrollRef = ref<InstanceType<typeof FScrollbar>>()
const handleScrollTo = () => {
  console.log(scrollRef.value?.wrapRef)
  scrollRef.value?.scrollTo(0, 200)
}
</script>

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
