<template>
  <div class="btm-nav">
    <!-- Accounts Route -->
    <BottomNavbarButton label="Accounts" route="home" alt-route-match="accounts">
      <template #icon>
        <img
          src="/src/assets/icons/google-material-icon-account-balance.svg"
          alt="Home icon"
          class="w-6 h-6"
        />
      </template>
    </BottomNavbarButton>

    <!-- User Account Route -->
    <BottomNavbarButton label="Me" route="user-account">
      <template #icon>
        <img
          src="/src/assets/icons/google-material-icon-account-circle.svg"
          alt="Account balance icon"
          class="w-6 h-6"
        />
      </template>
    </BottomNavbarButton>
  </div>
</template>

<script setup lang="ts">
import BottomNavbarButton from '@/components/app/BottomNavbarButton.vue';
</script>
