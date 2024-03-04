<template>
  <div class="btm-nav">
    <BottomNavbarButton @click="$router.push({ name: 'home' })" label="Home" route="home">
      <template #icon>
        <img
          src="/src/assets/icons/google-material-icon-home.svg"
          alt="Home icon"
          class="w-6 h-6"
        />
      </template>
    </BottomNavbarButton>
    <BottomNavbarButton
      @click="$router.push({ name: 'accounts' })"
      label="Accounts"
      route="accounts"
    >
      <template #icon>
        <img
          src="/src/assets/icons/google-material-icon-account-balance.svg"
          alt="Account balance icon"
          class="w-6 h-6"
        />
      </template>
    </BottomNavbarButton>
    <BottomNavbarButton
      @click="$router.push({ name: 'settings' })"
      label="Settings"
      route="settings"
    >
      <template #icon>
        <img
          src="/src/assets/icons/google-material-icon-settings.svg"
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
