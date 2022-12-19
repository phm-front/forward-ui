---
title: Container
lang: zh-CN
---

# Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<el-container>`：外层容器。 当子元素中包含 `<el-header>` 或 `<el-footer>` 时，全部子元素会垂直上下排列， 否则会水平左右排列。

`<el-header>`：顶栏容器。

`<el-aside>`：侧边栏容器。

`<el-main>`：主要区域容器。

`<el-footer>`：底栏容器。

:::tip

以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。 此外， `<el-container>`的直接子元素必须是后四个组件中的一个或多个。 后四个组件的亲元素必须是一个 `<el-container>`

:::

<style lang="scss">
@use '../../examples/container/common-layout.scss';
</style>


:::demo

container/layout-hm

:::

:::demo

container/layout-hmf

:::

:::demo

container/layout-am

:::

:::demo

container/layout-ham

:::

:::demo

container/layout-hamf

:::

:::demo

container/layout-ahm

:::

:::demo

container/layout-ahmf

:::

## Container API

### Container Attributes

| Name      | Description                         | Type                                  | Default                                                                    |
| --------- | ----------------------------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| direction | layout direction for child elements | `'horizontal' \| 'vertical'` | vertical when nested with `el-header` or `el-footer`; horizontal otherwise |
