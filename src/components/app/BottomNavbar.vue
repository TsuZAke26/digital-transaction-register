<template>
  <div class="btm-nav">
    <!-- Accounts Route -->
    <BottomNavbarButton label="Accounts" route="home" alt-route-match="accounts">
      <template #icon>
        <AccountBalanceIcon class="w-6 h-6 dark:fill-white" />
      </template>
    </BottomNavbarButton>

    <!-- User Account Route -->
    <BottomNavbarButton label="Me" route="user-account">
      <template #icon>
        <AccountCircleIcon class="w-6 h-6 dark:fill-white" />
      </template>
    </BottomNavbarButton>
  </div>
</template>

<script setup lang="ts">
import BottomNavbarButton from '@/components/app/BottomNavbarButton.vue';
import AccountBalanceIcon from '@/components/icons/AccountBalanceIcon.vue';
import AccountCircleIcon from '@/components/icons/AccountCircleIcon.vue';
</script>
