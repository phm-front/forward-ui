<template>
  <f-row>
    <f-button size="large">Large</f-button>
    <f-button>Default</f-button>
    <f-button size="small">Small</f-button>
    <f-button size="large" :icon="Search">Search</f-button>
    <f-button :icon="Search">Search</f-button>
    <f-button size="small" :icon="Search">Search</f-button>
  </f-row>
  <f-row class="my-4">
    <f-button size="large" round>Large</f-button>
    <f-button round>Default</f-button>
    <f-button size="small" round>Small</f-button>
    <f-button size="large" :icon="Search" round>Search</f-button>
    <f-button :icon="Search" round>Search</f-button>
    <f-button size="small" :icon="Search" round>Search</f-button>
  </f-row>
  <f-row>
    <f-button :icon="Search" size="large" circle />
    <f-button :icon="Search" circle />
    <f-button :icon="Search" size="small" circle />
  </f-row>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>
