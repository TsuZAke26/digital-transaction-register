<template>
  <div>
    <input
      :class="error ? 'input-error' : ''"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      class="w-full input input-bordered"
      @blur="$emit('blur')"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: [String, Number, Date],
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String
  }
});
defineEmits(['update:modelValue', 'blur']);
</script>
