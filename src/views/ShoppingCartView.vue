<script setup>
import { useShoppingCartStore } from '@/stores/shoppingCartStore'
import { BadgeEuro, Trash } from '@lucide/vue'

const shoppingCartStore = useShoppingCartStore()
</script>

<template>
  <section class="cart-view" aria-labelledby="cart-title">
    <header class="cart-header">
      <div>
        <h1 id="cart-title">Warenkorb</h1>
        <p class="intro">Deine Bücher und verfügbaren Leseformate auf einen Blick.</p>
      </div>
      <span class="item-count" aria-live="polite">
        {{ shoppingCartStore.items.length }}
        {{ shoppingCartStore.items.length === 1 ? 'Buch' : 'Bücher' }}
      </span>
    </header>

    <div v-if="shoppingCartStore.items.length" class="table-card">
      <div class="table-scroll" tabindex="0" role="region" aria-label="Bücher im Warenkorb">
        <table>
          <caption class="sr-only">
            Ausgewählte Bücher und verfügbare Formate
          </caption>
          <thead>
            <tr>
              <th scope="col">Buch</th>
              <th scope="col">Typ</th>
              <th scope="col">Veröffentlicht</th>
              <th scope="col">EPUB</th>
              <th scope="col">PDF</th>
              <th scope="col"><span class="sr-only">Aktionen</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in shoppingCartStore.items" :key="`${book.id}-${index}`">
              <th scope="row" class="book-cell">
                <div class="book-info">
                  <div class="cover">
                    <img
                      v-if="book.volumeInfo?.imageLinks?.thumbnail"
                      :src="book.volumeInfo.imageLinks.thumbnail"
                      alt=""
                      loading="lazy"
                    />
                    <span v-else class="cover-placeholder" aria-label="Kein Cover verfügbar">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 3H20v19H6.5A2.5 2.5 0 0 1 4 19.5v-14A2.5 2.5 0 0 1 6.5 3Z"
                        />
                        <path d="M8 7h8M8 11h5" />
                      </svg>
                    </span>
                  </div>
                  <div class="book-copy">
                    <span class="book-title">{{
                      book.volumeInfo?.title || 'Unbekannter Titel'
                    }}</span>
                    <span class="book-author">{{
                      book.volumeInfo?.authors?.join(', ') || 'Autor unbekannt'
                    }}</span>
                  </div>
                </div>
              </th>
              <td class="metadata" data-label="Typ">{{ book.volumeInfo?.printType || '—' }}</td>
              <td class="metadata" data-label="Veröffentlicht">
                {{ book.volumeInfo?.publishedDate || '—' }}
              </td>
              <td data-label="EPUB">
                <span
                  class="format-badge"
                  :class="{ available: book.accessInfo?.epub?.isAvailable }"
                >
                  {{ book.accessInfo?.epub?.isAvailable ? 'Verfügbar' : 'Nicht verfügbar' }}
                </span>
              </td>
              <td data-label="PDF">
                <span class="format-badge" :class="{ available: book.accessInfo.pdf.isAvailable }">
                  {{ book.accessInfo?.pdf?.isAvailable ? 'Verfügbar' : 'Nicht verfügbar' }}
                </span>
              </td>
              <td class="action-cell">
                <a
                  class="buy-link"
                  :aria-label="`${book.volumeInfo?.title || 'Buch'} einkaufen`"
                  :href="book.accessInfo.webReaderLink"
                  target="blank"
                >
                  <BadgeEuro size="12" />
                  Einkaufen
                </a>

                <button
                  type="button"
                  class="remove-button"
                  :aria-label="`${book.volumeInfo?.title || 'Buch'} aus dem Warenkorb entfernen`"
                  @click="shoppingCartStore.removeBookFromCart(book)"
                >
                  <Trash size="12" /> Entfernen
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="empty-state">
      <span class="empty-icon" aria-hidden="true">📚</span>
      <h2>Dein Warenkorb ist noch leer</h2>
      <p>Entdecke neue Bücher und füge deine Favoriten hinzu.</p>
      <RouterLink :to="{ name: 'books' }" class="browse-link">Bücher entdecken</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.cart-view {
  width: 90%;
  max-width: 1200px;
  margin: 40px auto;
  color: #24334b;
}
.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;
}

h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 36px);
  letter-spacing: -0.035em;
}
.intro {
  margin: 10px 0 0;
  color: #64748b;
  line-height: 1.6;
}
.item-count {
  flex-shrink: 0;
  padding: 9px 16px;
  border: 1px solid #dbe7f6;
  border-radius: 24px;
  background: #eff6ff;
  color: #0056b3;
  font-size: 14px;
  font-weight: 600;
}
.table-card {
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 30px rgb(30 58 95 / 6%);
}
.table-scroll {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
thead {
  background: #f7f9fc;
}
thead th {
  padding: 17px 20px;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
tbody th,
td {
  padding: 20px;
  border-top: 1px solid #e9eef5;
  vertical-align: middle;
}
tbody tr:hover {
  background: #fafcff;
}
.book-cell {
  width: 44%;
  min-width: 260px;
}
.book-info {
  display: flex;
  align-items: center;
  gap: 16px;
}
.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 52px;
  height: 74px;
  overflow: hidden;
  border-radius: 5px;
  background: #edf2f8;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.cover-placeholder svg {
  display: block;
  width: 26px;
  height: 26px;
  color: #8397b2;
}
.book-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-wrap: anywhere;
}
.book-title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
}
.book-author {
  color: #64748b;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.5;
}
.metadata {
  color: #52627a;
  font-size: 13px;
  white-space: nowrap;
}
.format-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 20px;
  background: #f1f4f8;
  color: #64748b;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
.format-badge.available {
  background: #eaf7ef;
  color: #237346;
}
.format-badge::before {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  content: '';
}
.action-cell {
  text-align: right;
}

.action-cell a {
  height: 40px;
  border: 1px solid rgba(128, 128, 128, 0.315);
  color: #0056b3;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
}

.action-cell button,
a {
  font-size: 12px;
  color: #64748b;
  margin: 5px 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 130px;
}

.remove-button:hover {
  border-color: #fecaca;
  background: #fff1f2;
  color: #b42338;
}
.buy-link {
  background: #b4d7ff;
}
.buy-link:hover {
  border-color: #6eb4ff;
  background: #b4d7ff;
  color: #0056b3;
}
.buy-link:disabled {
  background: #f1f4f8;
  border-color: #e2e8f0;
  color: #64748b;
  cursor: not-allowed;
  opacity: 0.6;
}
.table-scroll:focus-visible,
.buy-link:focus-visible,
.remove-button:focus-visible,
.browse-link:focus-visible {
  outline: 3px solid #0056b3;
  outline-offset: -3px;
}

.empty-state {
  padding: 56px 24px;
  border: 1px dashed #cbd5e1;
  border-radius: 16px;
  background: #f8fafc;
  text-align: center;
}
.empty-icon {
  font-size: 40px;
}
.empty-state h2 {
  margin: 20px 0 8px;
  font-size: 22px;
}
.empty-state p {
  color: #64748b;
  line-height: 1.6;
}
.browse-link {
  display: inline-block;
  margin-top: 12px;
  padding: 12px 20px;
  border-radius: 8px;
  background: #0056b3;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.browse-link:hover {
  background: #00448e;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (max-width: 768px) {
  .cart-view {
    margin-top: 24px;
  }
  .cart-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
  table,
  tbody {
    display: block;
  }
  thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  tbody tr {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
  tbody tr + tr {
    border-top: 1px solid #e2e8f0;
  }
  tbody th,
  td {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    padding: 12px 0;
  }
  .book-cell {
    border-top: 0;
    padding: 0 0 16px;
  }
  td[data-label] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px 16px;
    white-space: normal;
    overflow-wrap: anywhere;
  }
  td[data-label]::before {
    content: attr(data-label);
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
  }
  .action-cell {
    padding-bottom: 0;
  }
  .action-cell button {
    width: 100%;
  }
}
</style>
