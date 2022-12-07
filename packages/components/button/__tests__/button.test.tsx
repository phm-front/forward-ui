// import { markRaw, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
// import { Loading, Search } from '@element-plus/icons-vue'

import Button from '../src/button.vue'

// const AXIOM = 'Rem is the best girl'

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Button type="primary" />)

    expect(wrapper.classes()).toContain('f-button--primary')
  })

  // it('icon', () => {
  //   const wrapper = mount(() => <Button icon={markRaw(Search)} />)

  //   expect(wrapper.findComponent(Search).exists()).toBeTruthy()
  // })

  // it('nativeType', () => {
  //   const wrapper = mount(() => <Button nativeType="submit" />)

  //   expect(wrapper.attributes('type')).toBe('submit')
  // })

  // it('loading', () => {
  //   const wrapper = mount(() => <Button loading />)

  //   expect(wrapper.classes()).toContain('is-loading')
  //   expect(wrapper.findComponent(Loading).exists()).toBeTruthy()
  // })

  // it('size', () => {
  //   const wrapper = mount(() => <Button size="large" />)

  //   expect(wrapper.classes()).toContain('el-button--large')
  // })

  // it('plain', () => {
  //   const wrapper = mount(() => <Button plain />)

  //   expect(wrapper.classes()).toContain('is-plain')
  // })

  // it('round', () => {
  //   const wrapper = mount(() => <Button round />)
  //   expect(wrapper.classes()).toContain('is-round')
  // })

  // it('circle', () => {
  //   const wrapper = mount(() => <Button circle />)

  //   expect(wrapper.classes()).toContain('is-circle')
  // })

  // it('text', async () => {
  //   const bg = ref(false)

  //   const wrapper = mount(() => <Button text bg={bg.value} />)

  //   expect(wrapper.classes()).toContain('is-text')

  //   bg.value = true

  //   await nextTick()

  //   expect(wrapper.classes()).toContain('is-has-bg')
  // })

  // it('link', async () => {
  //   const wrapper = mount(() => <Button link />)

  //   expect(wrapper.classes()).toContain('is-link')
  // })

  // test('render text', () => {
  //   const wrapper = mount(() => (
  //     <Button
  //       v-slots={{
  //         default: () => AXIOM,
  //       }}
  //     />
  //   ))

  //   expect(wrapper.text()).toEqual(AXIOM)
  // })

  // test('handle click', async () => {
  //   const wrapper = mount(() => (
  //     <Button
  //       v-slots={{
  //         default: () => AXIOM,
  //       }}
  //     />
  //   ))

  //   await wrapper.trigger('click')
  //   expect(wrapper.emitted()).toBeDefined()
  // })

  // test('handle click inside', async () => {
  //   const wrapper = mount(() => (
  //     <Button
  //       v-slots={{
  //         default: () => <span class="inner-slot"></span>,
  //       }}
  //     />
  //   ))

  //   wrapper.find('.inner-slot').trigger('click')
  //   expect(wrapper.emitted()).toBeDefined()
  // })

  // test('loading implies disabled', async () => {
  //   const wrapper = mount(() => (
  //     <Button
  //       v-slots={{
  //         default: () => AXIOM,
  //       }}
  //       loading
  //     />
  //   ))

  //   await wrapper.trigger('click')
  //   expect(wrapper.emitted('click')).toBeUndefined()
  // })

  // it('disabled', async () => {
  //   const wrapper = mount(() => <Button disabled />)

  //   expect(wrapper.classes()).toContain('is-disabled')
  //   await wrapper.trigger('click')
  //   expect(wrapper.emitted('click')).toBeUndefined()
  // })

  // it('loading icon', () => {
  //   const wrapper = mount(() => (
  //     <Button loadingIcon={markRaw(Search)} loading />
  //   ))

  //   expect(wrapper.findComponent(Search).exists()).toBeTruthy()
  // })

  // it('loading slot', () => {
  //   const wrapper = mount({
  //     setup: () => () =>
  //       (
  //         <Button
  //           v-slots={{ loading: () => <span class="custom-loading">111</span> }}
  //           loading={true}
  //         >
  //           Loading
  //         </Button>
  //       ),
  //   })

  //   expect(wrapper.find('.custom-loading').exists()).toBeTruthy()
  // })
})
