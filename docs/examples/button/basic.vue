<template>
  <f-row class="mb-4">
    <f-button>Default</f-button>
    <f-button type="primary">Primary</f-button>
    <f-button type="success">Success</f-button>
    <f-button type="info">Info</f-button>
    <f-button type="warning">Warning</f-button>
    <f-button type="danger">Danger</f-button>
  </f-row>

  <f-row class="mb-4">
    <f-button plain>Plain</f-button>
    <f-button type="primary" plain>Primary</f-button>
    <f-button type="success" plain>Success</f-button>
    <f-button type="info" plain>Info</f-button>
    <f-button type="warning" plain>Warning</f-button>
    <f-button type="danger" plain>Danger</f-button>
  </f-row>

  <f-row class="mb-4">
    <f-button round>Round</f-button>
    <f-button type="primary" round>Primary</f-button>
    <f-button type="success" round>Success</f-button>
    <f-button type="info" round>Info</f-button>
    <f-button type="warning" round>Warning</f-button>
    <f-button type="danger" round>Danger</f-button>
  </f-row>

  <f-row>
    <f-button :icon="Search" circle />
    <f-button type="primary" :icon="Edit" circle />
    <f-button type="success" :icon="Check" circle />
    <f-button type="info" :icon="Message" circle />
    <f-button type="warning" :icon="Star" circle />
    <f-button type="danger" :icon="Delete" circle />
  </f-row>
</template>

<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
</script>
