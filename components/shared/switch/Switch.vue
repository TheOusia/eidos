<template>
  <md-switch
    :selected="modelValue"
    :disabled="disabled"
    v-bind="attrs"
    @input="onInput"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <slot />
  </md-switch>
</template>

<script setup lang="ts">
// Import Material Web Switch
import '@material/web/switch/switch.js'
import { useAttrs } from 'vue'

const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])
const attrs = useAttrs()

function onInput(e: Event) {
  const el = e.target as HTMLInputElement
  emit('update:modelValue', el.checked)
}
</script>
