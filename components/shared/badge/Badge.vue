<template>
  <md-badge
    :value="label"
    v-bind="attrs"
  >
    <slot />
  </md-badge>
</template>

<script setup lang="ts">
// Import Material Web Badge
import '@material/web/badge/badge.js'
import { useAttrs } from 'vue'

// Props for badge (see https://github.com/material-components/material-web/blob/main/docs/components/badge.md)
const props = defineProps<{
  label?: string | number
}>()

const attrs = useAttrs()
</script>
