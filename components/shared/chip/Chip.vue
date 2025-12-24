<template>
  <component
    :is="chipTag"
    v-bind="attrs"
    :label="label"
    :selected="selected"
    :disabled="disabled"
    @click="$emit('click', $event)"
    @remove="$emit('remove', $event)"
    @change="$emit('change', $event)"
  >
    <slot />
    <!-- Show trailing slot for icons (like remove) or avatars, if Material Web supports it -->
    <template v-if="$slots.trailing" #trailing>
      <slot name="trailing" />
    </template>
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
  </component>
</template>

<script setup lang="ts">
import '@material/web/chips/filter-chip.js'
import '@material/web/chips/input-chip.js'
import '@material/web/chips/suggestion-chip.js'
import '@material/web/chips/assist-chip.js'

import { computed, useAttrs } from 'vue'

type Variant = 'filter' | 'input' | 'suggestion' | 'assist'

const props = withDefaults(defineProps<{
  variant?: Variant,
  label?: string,
  selected?: boolean,
  disabled?: boolean
}>(), {
  variant: 'assist',
  label: '',
  selected: false,
  disabled: false
})

const attrs = useAttrs()

const chipTag = computed(() => {
  switch (props.variant) {
    case 'filter': return 'md-filter-chip'
    case 'input': return 'md-input-chip'
    case 'suggestion': return 'md-suggestion-chip'
    case 'assist': default: return 'md-assist-chip'
  }
})
</script>
