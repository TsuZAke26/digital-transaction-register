import { anonClient } from './supabase-client';

export async function fetchProfileData() {
  try {
    const { data: profiles_data, error: profiles_error } = await anonClient
      .from('profiles')
      .select('display_name,app_settings')
      .single();
    if (profiles_error) {
      throw profiles_error;
    }

    return profiles_data;
  } catch (error) {
    console.error('Fetch Profiles Data Error: ', error);
  }
}

export async function updateDisplayName(newDisplayName: string) {
  try {
    const userId = (await anonClient.auth.getSession()).data.session?.user.id;
    if (!userId) {
      throw new Error('User is not authenticated, abort display name update');
    }

    const { data: profiles_data, error: profiles_error } = await anonClient
      .from('profiles')
      .update({ display_name: newDisplayName })
      .eq('user_id', userId)
      .select()
      .single();
    if (profiles_error) {
      throw profiles_error;
    }

    return profiles_data;
  } catch (error) {
    console.error('Update Display Name Error: ', error);
  }
}
