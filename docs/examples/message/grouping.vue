<template>
  <f-button :plain="true" @click="open">Show message</f-button>
</template>

<script lang="ts" setup>
import { FMessage } from 'forward-ui'

const open = () => {
  FMessage({
    message: 'this is a message.',
    grouping: true,
    type: 'success',
  })
}
</script>
