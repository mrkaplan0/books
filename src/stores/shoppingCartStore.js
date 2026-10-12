import { defineStore } from 'pinia'

export const useShoppingCartStore = defineStore('shoppingCart', {
  state: () => ({
    cart: [],
  }),
  getters: {
    items: (state) => state?.cart || [],
  },
  actions: {
    addBookToCart(book) {
      this.cart.push(book)
      console.log('shopping cart:', this.cart)
    },

    removeBookFromCart(book) {
      this.cart = this.cart.filter((element) => element.id !== book.id)
      console.log('removed shopping cart:', this.cart)
    },
  },
})
