import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomSelect from '../CustomSelect.vue'

const list = [
  { key: 'products', value: 'Produkte' },
  { key: 'textbooks', value: 'Lehrwerke' },
  { key: 'helpcenter', value: 'Help Center' },
]

describe('CustomSelect', () => {
  it('renders the options and selected model value', () => {
    const wrapper = mount(CustomSelect, { props: { list, modelValue: list[1] } })
    expect(wrapper.findAll('option').map((option) => option.text())).toEqual(
      list.map((item) => item.value),
    )
    expect(wrapper.get('select').element.value).toBe('Lehrwerke')
  })

  it('emits the selected item when the selection changes', async () => {
    const wrapper = mount(CustomSelect, { props: { list, modelValue: list[0] } })
    await wrapper.get('select').setValue('Help Center')
    expect(wrapper.emitted('update:modelValue')).toEqual([[list[2]]])
  })

  it('updates the selection when the parent changes the model value', async () => {
    const wrapper = mount(CustomSelect, { props: { list, modelValue: list[0] } })
    await wrapper.setProps({ modelValue: list[1] })
    expect(wrapper.get('select').element.value).toBe('Lehrwerke')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
