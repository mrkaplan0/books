import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'
import HomeView from '../views/home/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import { createPinia } from 'pinia'
import BooksView from '@/views/BooksView.vue'
import ShoppingCartView from '@/views/ShoppingCartView.vue'

describe('App', () => {
  beforeEach(() => {
    // jsdom does not implement browser layout observers.
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = vi.fn()
      },
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders home and updates routed content while keeping the header', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: HomeView },
        { path: '/about', component: AboutView },
        { path: '/books', component: BooksView },
        { path: '/cart', component: ShoppingCartView },
      ],
    })
    await router.push('/')
    await router.isReady()
    const wrapper = mount(App, { global: { plugins: [router, createPinia()] } })
    try {
      expect(wrapper.get('main').exists()).toBe(true)
      expect(wrapper.find('header').exists()).toBe(true)
      await router.push('/about')
      await flushPromises()
      expect(wrapper.get('main h1').text()).toBe('Über das Projekt')
      expect(wrapper.find('header').exists()).toBe(true)
    } finally {
      wrapper.unmount()
    }
  })
})
