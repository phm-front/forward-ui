<template>
  <FDivider />

  <FDivider content-position="left">123</FDivider>
  <FDivider>
    <FIcon>
      <StarFilled />
      <!-- 也可以使用字体图标 -->
    </FIcon>
  </FDivider>
  <FDivider content-position="right">123</FDivider>

  <FDivider border-style="none">123</FDivider>
  <FDivider border-style="dotted">123</FDivider>
  <FDivider border-style="inset">123</FDivider>
  <FDivider border-style="dashed">123</FDivider>
  <FDivider border-style="double">123</FDivider>
  <FDivider border-style="groove">123</FDivider>

  <div>
    <span>Rain</span>
    <FDivider direction="vertical" />
    <span>Home</span>
    <FDivider direction="vertical" border-style="dashed" />
    <span>Grass</span>
    <FDivider direction="vertical" border-style="double" />
    <span>Tank</span>
  </div>
</template>

<script setup lang="ts"></script>
