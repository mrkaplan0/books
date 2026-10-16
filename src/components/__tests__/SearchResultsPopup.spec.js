import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import SearchBar from '../SearchBar.vue'
import SearchResultsPopup from '../SearchResultsPopup.vue'
import { useSearchStore } from '@/stores/searchStore'
import BookService from '@/services/BookService'

vi.mock('@/services/BookService', () => ({ default: { searchBooks: vi.fn() } }))

afterEach(() => {
  vi.restoreAllMocks()
  document.body.innerHTML = ''
})

describe('global search results', () => {
  it('opens from SearchBar, shows results, and navigates to a book', async () => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value() { this.open = true },
    })
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true,
      value() { this.open = false },
    })
    const pinia = createPinia()
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: '<div />' } },
        { path: '/books/:id', name: 'book-detail', component: { template: '<div />' } },
      ],
    })
    await router.push('/')
    const wrapper = mount({ components: { SearchBar, SearchResultsPopup }, template: '<SearchBar /><SearchResultsPopup />' }, {
      attachTo: document.body,
      global: { plugins: [pinia, router] },
    })
    try {
      let resolveSearch
      BookService.searchBooks.mockImplementationOnce(() => new Promise((resolve) => { resolveSearch = resolve }))
      await wrapper.get('input').setValue('Vue')
      await wrapper.get('input').trigger('keydown', { key: 'Enter' })
      expect(document.querySelector('dialog').open).toBe(true)
      expect(document.body.textContent).toContain('Bücher werden gesucht')
      resolveSearch([{ id: 'vue-book', volumeInfo: { title: 'Vue Guide', authors: ['Ada'] } }])
      await flushPromises()
      expect(document.body.textContent).toContain('Vue Guide')
      expect(document.body.textContent).toContain('Ada')
      document.querySelector('.results a').click()
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/books/vue-book')
      expect(document.querySelector('dialog').open).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })

  it('handles empty queries, ISBN searches, no results, and errors', async () => {
    setActivePinia(createPinia())
    const store = useSearchStore()
    await store.search('   ')
    expect(store.isOpen).toBe(false)
    BookService.searchBooks.mockResolvedValueOnce([])
    await store.search(' 978123 ', 'isbn')
    expect(BookService.searchBooks).toHaveBeenLastCalledWith('isbn:978123')
    expect(store.results).toEqual([])
    expect(store.loading).toBe(false)
    BookService.searchBooks.mockRejectedValueOnce(new Error('Network'))
    await store.search('Vue')
    expect(store.error).toContain('fehlgeschlagen')
    expect(store.loading).toBe(false)
  })

  it('keeps the latest results when requests finish out of order', async () => {
    setActivePinia(createPinia())
    const store = useSearchStore()
    let resolveFirst
    BookService.searchBooks.mockImplementationOnce(() => new Promise((resolve) => { resolveFirst = resolve }))
    const first = store.search('old')
    BookService.searchBooks.mockResolvedValueOnce([{ id: 'new' }])
    await store.search('new')
    resolveFirst([{ id: 'old' }])
    await first
    expect(store.results).toEqual([{ id: 'new' }])
  })
})
