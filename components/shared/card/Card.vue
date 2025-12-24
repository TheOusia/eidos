<template>
  <component
    :is="cardTag"
    v-bind="attrs"
    class="block"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import '@material/web/card/filled-card.js'
import '@material/web/card/outlined-card.js'
import { computed, useAttrs } from 'vue'

type Variant = 'filled' | 'outlined'

const props = withDefaults(defineProps<{
  variant?: Variant
}>(), {
  variant: 'filled'
})

const attrs = useAttrs()

const cardTag = computed(() => {
  switch (props.variant) {
    case 'filled': return 'md-filled-card'
    case 'outlined': return 'md-outlined-card'
    default: return 'md-filled-card'
  }
})
</script>
