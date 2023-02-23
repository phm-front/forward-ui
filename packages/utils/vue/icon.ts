import {
  CircleCloseFilled,
  Close,
  InfoFilled,
  SuccessFilled,
  WarningFilled,
} from '@element-plus/icons-vue'

import type { Component } from 'vue'
import { definePropType } from './props1'
export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function,
])

export const CloseComponents = {
  Close,
}

export const TypeComponents = {
  Close,
  SuccessFilled,
  InfoFilled,
  WarningFilled,
  CircleCloseFilled,
}

export const TypeComponentsMap = {
  success: SuccessFilled,
  warning: WarningFilled,
  error: CircleCloseFilled,
  info: InfoFilled,
}
