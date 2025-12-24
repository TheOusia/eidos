<template>
  <md-slider
    :value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    v-bind="attrs"
    @input="onInput"
    @change="onChange"
  >
    <slot />
  </md-slider>
</template>

<script setup lang="ts">
// Import Material Web Slider
import '@material/web/slider/slider.js'
import { useAttrs } from 'vue'

const props = defineProps<{
  modelValue: number,
  min?: number,
  max?: number,
  step?: number,
  disabled?: boolean,
}>()

const emit = defineEmits(['update:modelValue', 'change', 'input'])
const attrs = useAttrs()

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement)?.valueAsNumber ?? Number((e.target as HTMLInputElement)?.value)
  emit('update:modelValue', value)
  emit('input', value)
}

function onChange(e: Event) {
  const value = (e.target as HTMLInputElement)?.valueAsNumber ?? Number((e.target as HTMLInputElement)?.value)
  emit('change', value)
}
</script>
