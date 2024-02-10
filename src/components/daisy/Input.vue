<template>
  <input
    :placeholder="placeholder"
    :type="type"
    :value="modelValue"
    class="w-full max-w-xs input input-bordered"
    @blur="$emit('blur')"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
});
defineEmits(['update:modelValue', 'blur']);
</script>
