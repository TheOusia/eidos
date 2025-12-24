<template>
  <md-divider
    :inset="inset"
    :vertical="vertical"
    v-bind="attrs"
  >
    <slot />
  </md-divider>
</template>

<script setup lang="ts">
// Import Material Web Divider
import '@material/web/divider/divider.js'
import { useAttrs } from 'vue'

// Props for divider (see https://github.com/material-components/material-web/blob/main/docs/components/divider.md)
const props = defineProps<{
  vertical?: boolean,
  inset?: boolean | 'start' | 'end' | 'middle',
}>()

const attrs = useAttrs()
</script>
