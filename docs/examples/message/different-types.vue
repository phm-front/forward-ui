<template>
  <f-button :plain="true" @click="open2">success</f-button>
  <f-button :plain="true" @click="open3">warning</f-button>
  <f-button :plain="true" @click="open1">message</f-button>
  <f-button :plain="true" @click="open4">error</f-button>
</template>

<script lang="ts" setup>
import { FMessage } from 'forward-ui'

const open1 = () => {
  FMessage('this is a message.')
}
const open2 = () => {
  FMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
const open3 = () => {
  FMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
  })
}
const open4 = () => {
  FMessage.error('Oops, this is a error message.')
}
</script>
