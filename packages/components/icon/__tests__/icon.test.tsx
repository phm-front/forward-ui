import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import Icon from '../src/icon.vue'

describe('Icon.vue', () => {
  test('render', () => {
    const wrapper = mount(() => <Icon color='#000' size="18px" />)
    expect(wrapper.element.getAttribute('style')).toContain(`--color: #000`)
    expect(wrapper.element.getAttribute('style')).toContain(`font-size: 18px`)
  })
})
