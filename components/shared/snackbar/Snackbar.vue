<template>
  <md-snackbar
    :open="open"
    :label-text="label"
    :timeout="timeout"
    :leading="leading"
    :stacked="stacked"
    v-bind="attrs"
    @opened="onOpened"
    @closed="onClosed"
    @action="onAction"
  >
    <!-- Optionally, provide label/content via slot -->
    <template v-if="$slots.default">
      <slot />
    </template>
    <!-- Provide action button slot if needed -->
    <template #action v-if="$slots.action">
      <slot name="action" />
    </template>
  </md-snackbar>
</template>

<script setup lang="ts">
import '@material/web/snackbar/snackbar.js'
import { useAttrs } from 'vue'

const props = defineProps<{
  open: boolean,
  label?: string,
  timeout?: number,    // ms
  leading?: boolean,   // left alignment
  stacked?: boolean    // actions below content
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'opened'): void
  (e: 'closed'): void
  (e: 'action'): void
}>()

const attrs = useAttrs()

function onOpened() {
  emit('update:open', true)
  emit('opened')
}
function onClosed() {
  emit('update:open', false)
  emit('closed')
}
function onAction() {
  emit('action')
}
</script>
