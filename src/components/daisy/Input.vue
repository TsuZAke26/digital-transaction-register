<template>
  <input
    :placeholder="placeholder"
    :type="type"
    :value="modelValue"
    class="w-full input input-bordered"
    @blur="$emit('blur')"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: [String, Number, Date],
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
});
defineEmits(['update:modelValue', 'blur']);
</script>
