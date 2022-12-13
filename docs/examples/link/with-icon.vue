<template>
  <FLink :icon="Edit">Edit</FLink>
  <FLink>
    Check<FIcon><IconView /></FIcon>
  </FLink>
  <FLink>
    <template v-slot:icon>
      <FIcon class="is-loading">
        <Loading />
      </FIcon>
    </template>
  </FLink>
</template>
<script setup lang="ts">
import { Edit, View as IconView, Loading } from '@element-plus/icons-vue'
</script>

<style scoped>
.f-link {
  margin-right: 8px;
}
</style>
