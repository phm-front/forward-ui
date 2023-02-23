import { withInstallFunction } from '@forward-ui/utils'

import Message from './src/method'

export const FMessage = withInstallFunction(Message, '$message')
export default FMessage

export * from './src/message'
