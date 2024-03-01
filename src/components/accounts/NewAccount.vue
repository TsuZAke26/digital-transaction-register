<template>
  <div class="flex flex-col items-center justify-center space-y-4">
    <Button class="w-full text-white bg-primary dark:text-black" @click="showForm = true">
      <span class="text-xl font-semibold">Create New Account</span>
    </Button>
    <Card v-if="showForm" class="w-full border" title="Add New Account">
      <template #body>
        <NewAccountForm @close="showForm = false" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Button from '@/components/daisy/Button.vue';
import Card from '@/components/daisy/Card.vue';
import NewAccountForm from '@/components/forms/NewAccountForm.vue';

const showForm: Ref<boolean> = ref(false);
</script>
