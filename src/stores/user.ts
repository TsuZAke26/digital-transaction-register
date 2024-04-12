import { ref, type Ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { useToast } from 'vue-toastification';

import { fetchProfileData, updateDisplayName, updateAppSettings } from '@/supabase/db-profiles';

const toast = useToast();

export const useUserStore = defineStore('user', () => {
  const displayName = ref('');
  const appSettings: Ref<Record<string, number | string | string[]>> = ref({});

  async function loadProfileData() {
    const profileData = await fetchProfileData();
    if (profileData) {
      displayName.value = profileData.display_name;
      appSettings.value = profileData.app_settings as Record<string, number | string | string[]>;
    }
  }
  async function modifyDisplayName(newDisplayName: string) {
    const updatedProfileData = await updateDisplayName(newDisplayName);
    if (updatedProfileData) {
      displayName.value = updatedProfileData.display_name;
    }
  }

  function addCategory(category: string) {
    const categories = appSettings.value['categories'] as string[];
    if (categories && categories.length < 8) {
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
    console.log('Current Settings: ', appSettings);
    const result = await updateAppSettings(appSettings.value);
    if (result) {
      toast.success('Settings saved successfully');
      // console.log('Saved Settings: ', result);
    } else {
      toast.error('Settings save failed');
    }
  }

  return {
    displayName,
    appSettings,
    loadProfileData,
    addCategory,
    removeCategory,
    saveAppSettings
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
