<template>
  <f-button :plain="true" @click="open">Show message</f-button>
  <f-button :plain="true" @click="openVn">VNode</f-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { FMessage } from 'forward-ui'

const open = () => {
  FMessage('this is a message.')
}

const openVn = () => {
  FMessage({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}
</script>
