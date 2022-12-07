
import '../../../packages/theme-chalk/src/index.scss'
import './styles/css-vars.scss'
import './styles/app.scss'

// @ts-ignore
import VPDemo from './components/vp-demo.vue'
import type { Component } from 'vue'

export const globals: [string, Component][] = [['Demo', VPDemo]]
