<template>
  <f-button plain @click="openCenter">Centered text</f-button>
</template>

<script lang="ts" setup>
import { FMessage } from 'forward-ui'

const openCenter = () => {
  FMessage({
    showClose: true,
    message: 'Centered text',
    center: true,
  })
}
</script>
