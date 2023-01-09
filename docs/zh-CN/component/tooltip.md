---
title: switch
lang: zh-CN
---

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

:::demo 使用 content 属性来决定 hover 时的提示信息。 由 placement 属性决定展示效果： placement属性值为：[方向]-[对齐位置]；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。 如 placement="left-end"，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

tooltip/basic

:::

## 主题

Tooltip 组件内置了两个主题：dark和light。

:::tip

要使用自定义主题，您必须知道您的工具提示在哪里渲染， 如果您的工具提示被呈现为根元素，您将需要全局设置css规则。

建议您使用自定义主题并同时显示箭头时不使用线性渐变背景颜色。 因为弹出箭头和内容是两个不同的元素， 弹出箭头的样式需要单独设置， 当它到渐变背景颜色时，会看起来很奇怪。

:::

:::demo 通过设置 effect 来修改主题，默认值为 dark.

tooltip/theme

:::

## 更多文字内容的提示

展示多行文本或者是设置文本内容的格式

:::demo 用具名 slot content，替代tooltip中的content属性。

tooltip/rich-content

:::

## 高级属性

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

transition 属性可以定制显隐的动画效果，默认为fade-in-linear。

如果需要关闭 tooltip 功能，disabled 属性可以满足这个需求， 你只需要将其设置为 true。

事实上，Tooltip 是一个基于 FPopper 的扩展，您可以使用 FPopper 中允许的任何属性。

:::demo

tooltip/advanced-usage

:::

:::tip

Tooltip 内不支持 router-link 组件，请使用 vm.$router.push 代替。

tooltip 内不支持 disabled form 元素，参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter). 请在 disabled form 元素外层添加一层包裹元素。

:::

## 显示HTML内容

内容属性可以设置为 HTML 字符串。

:::warning

content 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting).  因此在 raw-content 打开的情况下，请确保 content 的内容是可信的，永远不要将用户提交的内容赋值给 content 属性。

:::

:::demo

tooltip/html-content

:::

## 虚拟触发

有时候我们想把 tooltip 的触发元素放在别的地方，而不需要写在一起，这时候就可以使用虚拟触发。

:::tip

需要注意的是，虚拟触发的 tooltip 是受控组件，因此你必须自己去控制 tooltip 是否显示，你将无法通过点击空白处来关闭 tooltip。

:::

:::demo

tooltip/virtual-trigger

:::

## 单例模式

Tooltip 可以作为单例，也就是是说你可以同时有多个触发同一个 tooltip 的触发元素，这个功能是在 虚拟触发 的基础上开发的。

:::tip

已知问题：当使用单例模式时，tooltip 的触发元素发生改变的时候可能会发生弹跳。

:::

:::demo

tooltip/singleton

:::

## 受控模式

Tooltip 可以通过父组件使用 :visible 来控制它的显示与关闭。

:::demo

tooltip/controlled

:::
