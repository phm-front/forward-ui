<template>
  <FIcon color="green" :size="32">
    <Edit />
    <!-- 也可以使用字体图标 -->
  </FIcon>
  <div>
    <FButton>default</FButton>
    <FButton type="primary" round>primary</FButton>
    <FButton type="success" circle>
      <FIcon>
        <GreatSvg />
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
  </div>
</template>

<script setup lang="ts">
import GreatSvg from './src/components/svgComponents/Great.vue';

const handleBtnClick = (evt: MouseEvent) => console.log(evt)
</script>
