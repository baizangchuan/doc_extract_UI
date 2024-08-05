<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String || Number,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  noValue: {
    type: Boolean,
    default: false
  }
})

const value = ref('')

watch(
  () => props.modelValue,
  (val) => {
    value.value = val
  },
  { immediate: true }
)

const emit = defineEmits(['update:modelValue'])

const handleInput = (value) => {
  emit('update:modelValue', value)
}

const handleChange = (value) => {
  emit('update:modelValue', value)
}

const handleClear = () => {
  emit('update:modelValue', '')
}
</script>

<template>
  <el-input v-model="value" @input="handleInput" @clear="handleClear">
    <template #append>
      <el-select style="width: 60px" v-model="value" @change="handleChange" placeholder="">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
  </el-input>
</template>

<style lang="scss" scoped></style>
