<template>
  <FButton>default</FButton>
  <FButton type="primary" round>primary</FButton>
  <FButton type="success" circle>
    <FIcon>
      <Plus />
      <!-- 也可以使用字体图标 -->
    </FIcon>
  </FButton>
  <FButton type="info" plain>info</FButton>
  <FButton type="warning" disabled>warning</FButton>
  <FButton type="danger" link>danger</FButton>
  <FButton type="primary" text>text</FButton>
  <FButton type="primary" text bg>text bg</FButton>
  <FButton type="primary" size="large">large</FButton>
  <FButton type="primary" size="small">small</FButton>
  <FButton type="primary" loading>loading</FButton>
  <FButton type="primary">
    <template #icon>
      <Edit />
    </template>
    loading
  </FButton>
  <FButton @click="handleBtnClick">点击</FButton>
</template>
<script setup lang="ts">
const handleBtnClick = (evt: MouseEvent) => console.log(evt)
</script>
<style scoped lang="scss"></style>
