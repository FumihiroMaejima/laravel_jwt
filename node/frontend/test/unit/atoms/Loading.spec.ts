import { shallowMount } from '@vue/test-utils'
import { localInstance } from '../../localVue'
import Loading from '~/components/atoms/Loading.vue'

const localVue = localInstance()

describe('Loading.vue', () => {
  test('Loading instance', () => {
    const props = {
      color: 'green',
      open: true,
      size: 80
    }

    const wrapper = shallowMount(Loading, {
      localVue,
      propsData: props
    })
    // expect((wrapper.vm as any).test).toBeTruthy()
    expect(wrapper.props('open')).toBe(props.open)
  })
})
