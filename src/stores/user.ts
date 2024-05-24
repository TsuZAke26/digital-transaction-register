import { computed, ref, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { fetchProfileData, updateDisplayName, updateAppSettings } from '@/api/supabase/db-profiles';

export const useUserStore = defineStore('user', () => {
  const displayName = ref('');
  const appSettings: Ref<Record<string, number | string | string[]>> = ref({});

  async function loadProfileData() {
    const profileData = await fetchProfileData();
    if (profileData) {
      displayName.value = profileData.display_name;
      appSettings.value = profileData.app_settings as Record<string, number | string | string[]>;

      // Set up default application settings if not currently persisted
      if (!appSettings.value) {
        appSettings.value = {
          categories: ['Housing', 'Bills', 'Groceries', 'Utilities', 'Miscellaneous']
        };
      }
    }
  }

  async function modifyDisplayName(newDisplayName: string) {
    const updatedProfileData = await updateDisplayName(newDisplayName);
    if (updatedProfileData) {
      displayName.value = updatedProfileData.display_name;
    }
  }

  const categories = computed(() => {
    return appSettings.value['categories'] as string[];
  });
  function addCategory(category: string) {
    const categories = appSettings.value['categories'] as string[];
    const existingCategoryIndex = categories.findIndex((existing) => existing === category);
    if (categories && existingCategoryIndex === -1) {
      (appSettings.value['categories'] as string[]).push(category);
    }
  }
  // function updateCategory(index: number, category: string) {
  //   const categories = appSettings.value['categories'] as string[];
  //   if (categories) {
  //     (appSettings.value['categories'] as string[]).splice(index, 1, category);
  //   }
  // }
  function removeCategory(index: number) {
    const categories = appSettings.value['categories'] as string[];
    if (categories) {
      (appSettings.value['categories'] as string[]).splice(index, 1);
    }
  }

  async function saveAppSettings() {
    await updateAppSettings(appSettings.value);
  }

  return {
    displayName,
    appSettings,
    loadProfileData,
    categories,
    addCategory,
    removeCategory,
    saveAppSettings
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
