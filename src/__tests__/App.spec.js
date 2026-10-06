import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

describe('App', () => {
  it('renders home and updates routed content while keeping the header', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: HomeView },
        { path: '/about', component: AboutView },
        { path: '/books', component: HomeView },
        { path: '/cart', component: HomeView },
        { path: '/profile', component: HomeView },
      ],
    })
    await router.push('/')
    await router.isReady()
    const wrapper = mount(App, { global: { plugins: [router] } })
    try {
      expect(wrapper.get('main').text()).toBe('Hallo')
      expect(wrapper.find('header').exists()).toBe(true)
      await router.push('/about')
      await flushPromises()
      expect(wrapper.get('main h1').text()).toBe('This is an about page')
      expect(wrapper.find('header').exists()).toBe(true)
    } finally {
      wrapper.unmount()
    }
  })
})
