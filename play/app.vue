<template>
  <FIcon color="green" :size="32">
    <GreatSvg />
    <!-- 也可以使用字体图标 -->
  </FIcon>
  <div>
    <FButton>default</FButton>
    <FButton type="primary">primary</FButton>
    <FButton type="success">primary</FButton>
    <FButton type="info">primary</FButton>
    <FButton type="warning">primary</FButton>
    <FButton type="danger">primary</FButton>
  </div>
</template>

<script setup lang="ts">
import GreatSvg from './src/components/svgComponents/Great.vue';
</script>
