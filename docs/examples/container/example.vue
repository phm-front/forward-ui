<template>
  <f-container class="layout-container-demo" style="height: 500px">
    <f-aside width="200px">
      <f-scrollbar>
        <f-menu :default-openeds="['1', '3']">
          <f-sub-menu index="1">
            <template #title>
              <f-icon><message /></f-icon>Navigator One
            </template>
            <f-menu-item-group>
              <template #title>Group 1</template>
              <f-menu-item index="1-1">Option 1</f-menu-item>
              <f-menu-item index="1-2">Option 2</f-menu-item>
            </f-menu-item-group>
            <f-menu-item-group title="Group 2">
              <f-menu-item index="1-3">Option 3</f-menu-item>
            </f-menu-item-group>
            <f-sub-menu index="1-4">
              <template #title>Option4</template>
              <f-menu-item index="1-4-1">Option 4-1</f-menu-item>
            </f-sub-menu>
          </f-sub-menu>
          <f-sub-menu index="2">
            <template #title>
              <f-icon><icon-menu /></f-icon>Navigator Two
            </template>
            <f-menu-item-group>
              <template #title>Group 1</template>
              <f-menu-item index="2-1">Option 1</f-menu-item>
              <f-menu-item index="2-2">Option 2</f-menu-item>
            </f-menu-item-group>
            <f-menu-item-group title="Group 2">
              <f-menu-item index="2-3">Option 3</f-menu-item>
            </f-menu-item-group>
            <f-sub-menu index="2-4">
              <template #title>Option 4</template>
              <f-menu-item index="2-4-1">Option 4-1</f-menu-item>
            </f-sub-menu>
          </f-sub-menu>
          <f-sub-menu index="3">
            <template #title>
              <f-icon><setting /></f-icon>Navigator Three
            </template>
            <f-menu-item-group>
              <template #title>Group 1</template>
              <f-menu-item index="3-1">Option 1</f-menu-item>
              <f-menu-item index="3-2">Option 2</f-menu-item>
            </f-menu-item-group>
            <f-menu-item-group title="Group 2">
              <f-menu-item index="3-3">Option 3</f-menu-item>
            </f-menu-item-group>
            <f-sub-menu index="3-4">
              <template #title>Option 4</template>
              <f-menu-item index="3-4-1">Option 4-1</f-menu-item>
            </f-sub-menu>
          </f-sub-menu>
        </f-menu>
      </f-scrollbar>
    </f-aside>

    <f-container>
      <f-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <f-dropdown>
            <f-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></f-icon>
            <template #dropdown>
              <f-dropdown-menu>
                <f-dropdown-item>View</f-dropdown-item>
                <f-dropdown-item>Add</f-dropdown-item>
                <f-dropdown-item>Delete</f-dropdown-item>
              </f-dropdown-menu>
            </template>
          </f-dropdown>
          <span>Tom</span>
        </div>
      </f-header>

      <f-main>
        <f-scrollbar>
          <f-table :data="tableData">
            <f-table-column prop="date" label="Date" width="140" />
            <f-table-column prop="name" label="Name" width="120" />
            <f-table-column prop="address" label="Address" />
          </f-table>
        </f-scrollbar>
      </f-main>
    </f-container>
  </f-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .f-header {
  position: relative;
  background-color: var(--f-color-primary-light-7);
  color: var(--f-text-color-primary);
}
.layout-container-demo .f-aside {
  color: var(--f-text-color-primary);
  background: var(--f-color-primary-light-8);
}
.layout-container-demo .f-menu {
  border-right: none;
}
.layout-container-demo .f-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
