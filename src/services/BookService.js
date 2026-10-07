import api from '@/services/api'
import { GOOGLE_BOOKS_API_KEY } from '@/config/apiConfig'

export default {
  async searchBooks(query, searchTerms = '', filter = '') {
    try {
      const params = {
        q: [query.trim(), searchTerms.trim()].filter(Boolean).join(' '),
        key: GOOGLE_BOOKS_API_KEY,
        maxResults: 5,
      }

      if (filter.trim()) {
        params.filter = filter.trim()
      }

      const response = await api.get('/volumes', {
        params: params,
      })
      console.log('api call path: ', response.config.url) // Log the API call path for debugging
      console.log('BookService response:', response.data) // Log the response for debugging
      return response.data.items || []
    } catch (error) {
      console.error('Error searching books:', error)
      throw error
    }
  },

  async getBookById(bookId) {
    try {
      const response = await api.get(`/volumes/${bookId}`, {
        params: {
          key: GOOGLE_BOOKS_API_KEY,
        },
      })
      console.log('BookService getBookById response:', response.data) // Log the response for debugging
      return response.data
    } catch (error) {
      console.error(`Error fetching book with ID ${bookId}:`, error)
      throw error
    }
  },
}
