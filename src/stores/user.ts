import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import { fetchProfileData, updateDisplayName } from '@/supabase/db-profiles';

export const useUserStore = defineStore('user', () => {
  const displayName = ref('');
  async function loadProfileData() {
    const profileData = await fetchProfileData();
    if (profileData) {
      displayName.value = profileData.display_name;
    }
  }
  async function modifyDisplayName(newDisplayName: string) {
    const updatedProfileData = await updateDisplayName(newDisplayName);
    if (updatedProfileData) {
      displayName.value = updatedProfileData.display_name;
    }
  }

  return { displayName, loadProfileData };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
