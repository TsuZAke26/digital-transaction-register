<template>
  <select
    class="w-full select select-bordered"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <option disabled selected>{{ placeholder }}</option>
    <option v-for="value in values" :key="value">{{ value }}</option>
  </select>
</template>

<script setup lang="ts">
defineProps({
  modelValue: String,
  placeholder: String,
  values: {
    type: Array<string>,
    required: true
  }
});
defineEmits(['update:modelValue']);
</script>
