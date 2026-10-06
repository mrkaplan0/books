<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event) => {
  const selectedValue = event.target.value
  const selectedItem = props.list.find((item) => item.value === selectedValue)
  emit('update:modelValue', selectedItem)
}
</script>
<template>
  <select
    name="search-type"
    id="search-type"
    :value="props.modelValue.value"
    @change="handleChange"
  >
    <option v-for="item in props.list" :key="item.value" :value="item.value">
      {{ item.value }}
    </option>
  </select>
</template>

<style scoped>
select {
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
}
select:focus {
  outline: none;
}
select,
::picker(select) {
  appearance: base-select;
  align-items: center;
  cursor: pointer;
}
select:hover {
  background-color: #0057b3be;
  color: #fff;
}
select::picker-icon {
  color: #0056b3;
  transition: 0.4s rotate;
}

select:open::picker-icon {
  rotate: 180deg;
}

::picker(select) {
  border: none;
}
::picker(select) {
  top: calc(anchor(bottom) + 1px);
  left: anchor(10%);
}
option {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  border: 1px solid #dddddd;
  background: #ffffff;
  padding: 10px;
  transition: 0.4s;
}

option:first-of-type {
  border-radius: 8px 8px 0 0;
}

option:last-of-type {
  border-radius: 0 0 8px 8px;
}
option:not(option:last-of-type) {
  border-bottom: none;
}

option:checked {
  font-weight: bold;
}
option::checkmark {
  order: 1;
  margin-left: auto;
  content: '✓';
}
</style>
