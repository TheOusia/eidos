<template>
  <md-radio
    :checked="modelValue === value"
    :value="value"
    :name="name"
    :disabled="disabled"
    v-bind="attrs"
    @change="onChange"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <slot />
  </md-radio>
</template>

<script setup lang="ts">
// Import Material Web Radio
import '@material/web/radio/radio.js'
import { useAttrs } from 'vue'

const props = defineProps<{
  modelValue: string | number | boolean
  value: string | number | boolean
  name?: string
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])
const attrs = useAttrs()

function onChange(e: Event) {
  emit('update:modelValue', props.value)
  emit('change', e)
}
</script>
