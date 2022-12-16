---
title: Button
lang: zh-CN
---

# Button 按钮

常用的操作按钮。

## 基础用法

:::demo 使用 type、plain、round 和 circle 来定义按钮的样式。
button/basic
:::

## 禁用状态

你可以使用 disabled 属性来定义按钮是否被禁用。

:::demo 使用 disabled 属性来控制按钮是否为禁用状态。 该属性接受一个 Boolean 类型的值。
button/disabled
:::

## 链接按钮

:::demo
button/link
:::

## 文字按钮

:::demo 没有边框和背景色的按钮
button/text
:::

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

:::demo 使用 icon 属性来为按钮添加图标。 您可以在我们的 Icon 组件中找到所需图标。 通过向右方添加<i>标签来添加图标， 你也可以使用自定义图标。
button/icon
:::

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

:::demo 通过设置 loading 属性为 true 来显示加载中状态。
button/load
:::

## 调整尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

:::demo 使用 size 属性额外配置尺寸，可使用 large 和 small 两种值。
button/size
:::

# Button API

## Button 属性

| Name                               | Description                                                             | Type                                                                     | Default |
| ---------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| size                               | button size                                                             | `'large'\| 'default'\| 'small'`                                          | —       |
| type                               | button type                                                             | `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'\| 'text'(delete)` | —       |
| plain                              | determine whether it's a plain button                                   | boolean                                                                  | false   |
| text<VersionTag version="2.2.0" /> | determine whether it's a text button                                    | boolean                                                                  | false   |
| bg<VersionTag version="2.2.0" />   | determine whether the text button background color is always on         | boolean                                                                  | false   |
| link<VersionTag version="2.2.1" /> | determine whether it's a link button                                    | boolean                                                                  | false   |
| round                              | determine whether it's a round button                                   | boolean                                                                  | false   |
| circle                             | determine whether it's a circle button                                  | boolean                                                                  | false   |
| loading                            | determine whether it's loading                                          | boolean                                                                  | false   |
| loading-icon                       | customize loading icon component                                        | `Component\|string`                                                                 | Loading |
| disabled                           | disable the button                                                      | boolean                                                                  | false   |
| icon                               | icon component                                                          | `Component\|string`                                                                | —       |

## Button 插槽

| Name    | Description                 |
| ------- | --------------------------- |
| default | customize default content   |
| loading | customize loading component |
| icon    | customize icon component    |

## Button 对外暴露的方法


| Name           | Description          | Type                                                                                                           |
| -------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| ref            | button html element  | `Ref<HTMLButtonElement>`                                                                              |
| size           | button size          | `ComputedRef<'' \| 'small' \| 'default' \| 'large'>`                                                  |
| type           | button type          | `ComputedRef<'' \| 'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'danger' \| 'text'>` |
| disabled       | button disabled      | `ComputedRef<boolean>`                                                                                |
| shouldAddSpace | whether adding space | `ComputedRef<boolean>`                                                                                |
