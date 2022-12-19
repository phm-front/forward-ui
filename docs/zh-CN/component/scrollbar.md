---
title: scrollbar
lang: zh-CN
---

# Scrollbar 滚动条

用于替换浏览器原生滚动条。

## 基础用法

:::demo 通过 height 属性设置滚动条高度，若不设置则根据父容器高度自适应。

scrollbar/basic-usage

:::

## 横向滚动

:::demo 当元素宽度大于滚动条宽度时，会显示横向滚动条

scrollbar/horizontal-scroll

:::

## 最大高度

:::demo 当元素高度超过最大高度，才会显示滚动条。

scrollbar/max-height

:::

## API

### Attributes

| Name       | Description                                                                                                                     | Type                                                                | Default |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------- |
| height     | height of scrollbar                                                                                                             | string / number                                               | —       |
| max-height | max height of scrollbar                                                                                                         | string / number                                               | —       |
| native     | whether to use the native scrollbar style                                                                                       | boolean                                                          | false   |
| wrap-style | style of wrap container                                                                                                         | string / object:`CSSProperties \| CSSProperties[] \| string[]` | —       |
| wrap-class | class of wrap container                                                                                                         | string                                                           | —       |
| view-style | style of view                                                                                                                   | string / object:`CSSProperties \| CSSProperties[] \| string[]` | —       |
| view-class | class of view                                                                                                                   | string                                                           | —       |                                                                                           | string                                                           | div     |
| always     | always show scrollbar                                                                                                           | boolean                                                          | false   |
| min-size   | minimum size of scrollbar                                                                                                       | number                                                           | 20      |

### Events

| Name   | Description                                           | Type                                                             |
| ------ | ----------------------------------------------------- | ---------------------------------------------------------------- |
| scroll | triggers when scrolling, return distance of scrolling | functiion`({ scrollLeft: number, scrollTop: number }) => void` |

### Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | customize default content |

### Exposes

| Name          | Description                                | Type                                                                       |
| ------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| handleScroll  | handle scroll event                        | functiion`() => void`                                                    |
| scrollTo      | scrolls to a particular set of coordinates | functiion`(options: ScrollToOptions \| number, yCoord?: number) => void` |
| setScrollTop  | Set distance to scroll top                 | functiion`(scrollTop: number) => void`                                   |
| setScrollLeft | Set distance to scroll left                | functiion`(scrollLeft: number) => void`                                  |
| update        | update scrollbar state manually            | functiion`() => void`                                                    |
| wrapRef       | scrollbar wrap ref                         | object:`Ref<HTMLDivElement>`                                             |

