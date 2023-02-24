<template>
  <f-button :plain="true" @click="openHTML">Use HTML String</f-button>
</template>

<script lang="ts" setup>
import { FMessage } from 'forward-ui'

const openHTML = () => {
  FMessage({
    dangerouslyUseHTMLString: true,
    message: '<strong>This is <i>HTML</i> string</strong>',
  })
}
</script>
