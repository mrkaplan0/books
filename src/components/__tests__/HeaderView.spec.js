import { afterEach, describe, it, expect, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { nextTick } from 'vue'
import HeaderView from '../HeaderView.vue'
import SearchBar from '../SearchBar.vue'

const originalWidth = window.innerWidth
const wrappers = []

function renderHeader(width) {
  window.innerWidth = width
  const wrapper = mount(HeaderView, {
    global: { stubs: { RouterLink: RouterLinkStub } },
  })
  wrappers.push(wrapper)
  return wrapper
}

afterEach(() => {
  wrappers.forEach((wrapper) => wrapper.unmount())
  wrappers.length = 0
  window.innerWidth = originalWidth
  vi.restoreAllMocks()
})

describe('HeaderView', () => {
  it('shows search and navigation on desktop', () => {
    const wrapper = renderHeader(1024)
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true)
    expect(wrapper.findAllComponents(RouterLinkStub).map((link) => link.props('to'))).toEqual([
      '/books',
      '/cart',
      '/profile',
    ])
    expect(wrapper.find('.search-bar-item > button').exists()).toBe(false)
  })

  it('opens and closes search on mobile, hiding navigation while searching', async () => {
    const wrapper = renderHeader(375)
    expect(wrapper.findComponent(SearchBar).exists()).toBe(false)
    expect(wrapper.findAllComponents(RouterLinkStub)).toHaveLength(3)
    await wrapper.get('nav li').trigger('click')
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true)
    expect(wrapper.findAllComponents(RouterLinkStub)).toHaveLength(0)
    await wrapper.get('.search-bar-item > button').trigger('click')
    expect(wrapper.findComponent(SearchBar).exists()).toBe(false)
    expect(wrapper.findAllComponents(RouterLinkStub)).toHaveLength(3)
  })

  it('switches layouts on resize at the 768px breakpoint', async () => {
    const wrapper = renderHeader(768)
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true)
    window.innerWidth = 767
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(wrapper.findComponent(SearchBar).exists()).toBe(false)
    window.innerWidth = 768
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true)
  })

  it('removes its resize listener when unmounted', () => {
    const addListener = vi.spyOn(window, 'addEventListener')
    const removeListener = vi.spyOn(window, 'removeEventListener')
    const wrapper = renderHeader(1024)
    const resizeCall = addListener.mock.calls.find(([event]) => event === 'resize')
    expect(resizeCall).toBeDefined()
    wrapper.unmount()
    wrappers.length = 0
    expect(removeListener).toHaveBeenCalledWith('resize', resizeCall[1])
  })
})

