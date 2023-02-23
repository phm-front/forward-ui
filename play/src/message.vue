<template>
  <f-button @click="open">Show message</f-button>
  <f-button @click="open1">Show message</f-button>
  <f-divider />
  <f-button @click="open2">Show message</f-button>
  <f-button @click="open3">Show message</f-button>
  <f-button @click="open4">Show message</f-button>
  <f-divider />
  <f-button @click="open5">Show message</f-button>
  <f-divider />
  <f-button @click="open6">Show message</f-button>
  <f-divider />
  <f-button @click="open7">Show message</f-button>
  <f-divider />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { FMessage } from 'forward-ui'

const open = () => {
  FMessage('this is a message.')
}

const open1 = () => {
  FMessage({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}

const open2 = () => {
  FMessage({
    message: 'this is a message.',
    type: 'success',
  })
}
const open3 = () => {
  FMessage({
    message: 'this is a message.',
    type: 'warning',
  })
}
const open4 = () => {
  FMessage.error('error')
}

const open5 = () => {
  FMessage({
    showClose: true,
    message: 'This is a message.',
    center: true,
  })
}

const open6 = () => {
  FMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  })
}

const open7 = () => {
  FMessage({
    message: 'this is a message.',
    grouping: true,
    type: 'success',
  })
}
</script>
