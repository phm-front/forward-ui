<script setup lang="ts">
import { useClipboard, useToggle } from '@vueuse/core'
import { computed } from 'vue'

import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'

const props = defineProps<{
  demos: object
  source: string
  path: string
  rawSource: string
  description?: string
}>()

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible, toggleSourceVisible] = useToggle()

const formatPathDemos = computed(() => {
  const demos = {}

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('../../examples/', '').replace('.vue', '')] =
      props.demos[key].default
  })

  return demos
})

const decodedDescription = computed(() =>
  decodeURIComponent(props.description!)
)

const copyCode = async () => {
  // TODO:使用message进行提示
  if (!isSupported) {
    console.error('copy is not Supported')
  }
  try {
    await copy()
    console.log('copy success')
  } catch (e: any) {
    console.error(e.message)
  }
}
</script>

<template>
  <ClientOnly>
    <p text="sm" v-html="decodedDescription" />

    <div class="example">
      <Example :file="path" :demo="formatPathDemos[path]" />

      <!-- TODO:Divider组件 -->
      <div class="divider"></div>

      <!-- TODO:Tooltip组件 -->
      <div class="op-btns">
        <CopyDocument
          class="op-btn icon"
          :width="16"
          :height="16"
          @click="copyCode"
        />
        <More
          class="op-btn icon"
          :width="16"
          :height="16"
          @click="toggleSourceVisible()"
        />
      </div>
    </div>

    <SourceCode v-show="sourceVisible" :source="source" />
  </ClientOnly>
</template>

<style scoped lang="scss">
.example {
  border: 1px solid var(--vp-c-divider-light);
  border-radius: var(--el-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .icon {
      &:hover {
        color: var(--text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: var(--vp-c-divider-light);
    margin: 0;
  }
}
</style>
