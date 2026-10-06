import { afterEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'
import CustomSelect from '../CustomSelect.vue'

afterEach(() => vi.restoreAllMocks())

describe('SearchBar', () => {
  it('starts with an empty query and the products search type', () => {
    const wrapper = mount(SearchBar)
    expect(wrapper.get('input').element.value).toBe('')
    expect(wrapper.get('select').element.value).toBe('Produkte')
    expect(wrapper.findAll('option')).toHaveLength(3)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('accepts and clears a search query', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = mount(SearchBar)
    await wrapper.get('input').setValue('Vue books')
    expect(wrapper.get('input').element.value).toBe('Vue books')
    await wrapper.get('input').setValue('')
    expect(wrapper.get('input').element.value).toBe('')
  })

  it('updates the search type through the dropdown without clearing the query', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const wrapper = mount(SearchBar)
    await wrapper.get('input').setValue('Vue')
    await wrapper.get('select').setValue('Lehrwerke')
    expect(wrapper.getComponent(CustomSelect).props('modelValue')).toEqual({
      key: 'textbooks',
      value: 'Lehrwerke',
    })
    expect(wrapper.get('input').element.value).toBe('Vue')
  })
})
