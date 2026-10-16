import { defineStore } from 'pinia'
import BookService from '@/services/BookService'

export const useSearchStore = defineStore('search', {
  state: () => ({
    isOpen: false,
    loading: false,
    query: '',
    results: [],
    error: '',
    requestId: 0,
  }),
  actions: {
    close() {
      this.isOpen = false
    },
    async search(query, type = 'books') {
      const trimmedQuery = query.trim()
      if (!trimmedQuery) return

      const requestId = ++this.requestId
      this.query = trimmedQuery
      this.results = []
      this.error = ''
      this.loading = true
      this.isOpen = true

      try {
        const results = await BookService.searchBooks(
          type === 'isbn' ? `isbn:${trimmedQuery}` : trimmedQuery,
        )
        if (requestId === this.requestId) this.results = results || []
      } catch {
        if (requestId === this.requestId) {
          this.error = 'Die Suche ist fehlgeschlagen. Bitte versuchen Sie es erneut.'
        }
      } finally {
        if (requestId === this.requestId) this.loading = false
      }
    },
  },
})
