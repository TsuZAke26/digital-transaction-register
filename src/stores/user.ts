import { ref, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { readProfileData, updateDisplayName } from '@/api/supabase/db-profiles';
import { readUserSettings, updateUserSettings } from '@/api/supabase/db-user-settings';
import type { Database } from '@/types/supabase';

export const useUserStore = defineStore('user', () => {
  async function loadUserData() {
    const profileData = await readProfileData();
    if (profileData) {
      displayName.value = profileData.display_name;
    }

    const userSettings = await readUserSettings();
    if (userSettings) {
      transactionCategories.value = userSettings.transaction_categories?.sort() ?? [];
      // TODO: add more settings as I fetch them back
    }
  }

  /* User Profile Data */
  const displayName = ref('');
  async function modifyDisplayName(newDisplayName: string) {
    const updatedProfileData = await updateDisplayName(newDisplayName);
    if (updatedProfileData) {
      displayName.value = updatedProfileData.display_name;
    }
  }

  /* User Settings */
  const transactionCategories: Ref<string[]> = ref([]);
  function addTransactionCategory(category: string) {
    transactionCategories.value.push(category);
    transactionCategories.value = transactionCategories.value.sort();
  }
  function removeTransactionCategory(index: number) {
    transactionCategories.value.splice(index, 1);
  }
  async function saveUserSettings() {
    const settingsData: Database['public']['Tables']['user_settings']['Update'] = {
      transaction_categories: transactionCategories.value
    };
    await updateUserSettings(settingsData);
  }

  return {
    loadUserData,

    displayName,

    transactionCategories,
    addTransactionCategory,
    removeTransactionCategory,

    saveUserSettings
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
