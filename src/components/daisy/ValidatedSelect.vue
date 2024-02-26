<template>
  <div>
    <select
      class="w-full select select-bordered"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option disabled selected>{{ placeholder }}</option>
      <option v-for="value in values" :key="value">{{ value }}</option>
    </select>
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: String,
  placeholder: String,
  values: {
    type: Array<string>,
    required: true
  },
  error: {
    type: String
  }
});
defineEmits(['update:modelValue']);
</script>
