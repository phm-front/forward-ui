import { withInstall } from '@forward-ui/utils'
import container from './src/container.vue'
import header from './src/header.vue'
import footer from './src/footer.vue'
import main from './src/main.vue'
import aside from './src/aside.vue'

export const FContainer = withInstall(container)
export const FHeader = withInstall(header)
export const FFooter = withInstall(footer)
export const FMain = withInstall(main)
export const FAside = withInstall(aside)
export default FContainer

export type ContainerInstance = InstanceType<typeof container>
export type AsideInstance = InstanceType<typeof aside>
export type FooterInstance = InstanceType<typeof footer>
export type HeaderInstance = InstanceType<typeof header>
export type MainInstance = InstanceType<typeof main>
