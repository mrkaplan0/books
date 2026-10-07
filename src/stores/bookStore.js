import { defineStore } from 'pinia'
import BookService from '@/services/BookService'
import { booklist } from '@/config/books.js'

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    loading: false,
    error: null,
  }),
  actions: {
    async searchBooks(query, searchTerms = '', filter = '') {
      {
        this.loading = true
        this.error = null
        try {
          const response = await BookService.searchBooks(query, searchTerms, filter)
          console.log('Fetched books from BookService:', response) // Log the fetched books for debugging
          this.books = response
          return this.books
        } catch (error) {
          this.error = error.message || 'An error occurred while fetching books.'
        } finally {
          this.loading = false
        }
      }
    },
    async getBookById(bookId) {
      this.loading = true
      this.error = null
      try {
        const response = await BookService.getBookById(bookId)
        return response
      } catch (error) {
        this.error = error.message || `An error occurred while fetching the book with ID ${bookId}.`
      } finally {
        this.loading = false
      }
    },

    async getBookShelf() {
      if (this.books.length > 0) {
        return this.books
      }
      this.loading = true
      this.error = null
      try {
        booklist.forEach(async (bookId) => {
          try {
            const book = await this.getBookById(bookId)
            if (book) {
              this.books.push(book)
            }
          } catch (error) {
            console.error(`Error fetching book with ID ${bookId}:`, error)
          }
        })
        return this.books
      } catch (error) {
        this.error = error.message || 'An error occurred while fetching books.'
      } finally {
        this.loading = false
      }
    },
  },
  getters: {
    bookCount: (state) => state.books.length,
  },
})
