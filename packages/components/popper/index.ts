import { withInstall } from '@forward-ui/utils'
import Popper from './src/popper.vue'

import FPopperArrow from './src/arrow.vue'
import FPopperTrigger from './src/trigger.vue'
import FPopperContent from './src/content.vue'

export { FPopperArrow, FPopperTrigger, FPopperContent }

export const FPopper = withInstall(Popper)
export default FPopper

export * from './src/popper'
export * from './src/trigger'
export * from './src/content'
export * from './src/arrow'

export type { Placement, Options } from '@popperjs/core'
