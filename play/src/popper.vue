<template>
  <div class="wrap">
    <f-popper>
      <f-popper-trigger>
        <f-button type="primary">trigger</f-button>
      </f-popper-trigger>
      <f-popper-content effect="light">
        <span>content</span>
        <f-popper-arrow></f-popper-arrow>
      </f-popper-content>
    </f-popper>
  </div>
</template>
<script setup lang="ts">
import {
  FPopperArrow,
  FPopperContent,
  FPopperTrigger,
} from '@forward-ui/components/popper'
</script>
<style scoped lang="scss">
.wrap {
  margin-top: 20px;
  margin-left: 20px;
}
</style>
