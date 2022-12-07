import { head, mdPlugin, nav, sidebar, socialLinks } from './config'
import type { UserConfig } from 'vitepress'

const languages = ['zh-CN']
const locales = {}
languages.forEach((lang) => {
  locales[`/${lang}`] = {
    label: lang,
    lang,
  }
})

export const config: UserConfig = {
  head,
  themeConfig: {
    siteTitle: 'Forward',
    logo: '/logo.svg',
    nav,
    sidebar,
    socialLinks,
    langs: languages,
  },
  locales,

  markdown: {
    config: (md) => mdPlugin(md),
  },
}

export default config
