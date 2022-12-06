import fs from 'fs'
import path from 'path'
import { vpRoot } from '@forward-ui/build-utils'

import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
  ['script', {}, fs.readFileSync(path.resolve(vpRoot, 'lang.js'), 'utf-8')],
]
