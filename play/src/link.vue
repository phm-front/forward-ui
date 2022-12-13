<template>
  <div>
    <FLink href="https://www.baidu.com/" target="_blank">default</FLink>
    <FLink type="primary">primary</FLink>
    <FLink type="success">success</FLink>
    <FLink type="warning">warning</FLink>
    <FLink type="danger">danger</FLink>
    <FLink type="info">info</FLink>
  </div>

  <div>
    <FLink disabled>default</FLink>
    <FLink type="primary" disabled>primary</FLink>
    <FLink type="success" disabled>success</FLink>
    <FLink type="warning" disabled>warning</FLink>
    <FLink type="danger" disabled>danger</FLink>
    <FLink type="info" disabled>info</FLink>
  </div>

  <div>
    <FLink :underline="false">Without Underline</FLink>
    <FLink>With Underline</FLink>
  </div>

  <div>
    <FLink :icon="Edit">Edit</FLink>
    <FLink>
      Check<FIcon class="el-icon--right"><icon-view /></FIcon>
    </FLink>
    <FLink>
      <template v-slot:icon>123</template>
    </FLink>
  </div>
</template>
<script setup lang="ts">
import { Edit, View as IconView } from '@element-plus/icons-vue'
</script>

<style scoped>
.f-link {
  margin-right: 8px;
}
</style>
