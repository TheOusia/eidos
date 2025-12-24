<template>
  <md-checkbox
    :checked="modelValue"
    :indeterminate="indeterminate"
    :disabled="disabled"
    v-bind="attrs"
    @input="onInput"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <slot />
  </md-checkbox>
</template>

<script setup lang="ts">
// Import Material Web Checkbox
import '@material/web/checkbox/checkbox.js'
import { useAttrs } from 'vue'

const props = defineProps<{
  modelValue: boolean
  indeterminate?: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])
const attrs = useAttrs()

function onInput(e: Event) {
  const el = e.target as HTMLInputElement
  emit('update:modelValue', el.checked)
}
</script>
