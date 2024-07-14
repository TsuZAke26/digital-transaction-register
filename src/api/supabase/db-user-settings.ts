import { anonClient } from '@/supabase/anon-client';
import type { Database } from '@/types/supabase';

export async function readUserSettings() {
  try {
    const { data: user_settings_data, error: user_settings_error } = await anonClient
      .from('user_settings')
      .select('transaction_categories')
      .single();
    if (user_settings_error) {
      throw user_settings_error;
    }

    return user_settings_data;
  } catch (error) {
    console.error('Fetch User Settings Error: ', error);
  }
}

export async function updateUserSettings(
  data: Database['public']['Tables']['user_settings']['Update']
) {
  try {
    const userId = (await anonClient.auth.getSession()).data.session?.user.id;
    if (!userId) {
      throw new Error('User is not authenticated, abort settings update');
    }

    const { data: user_settings_data, error: user_settings_error } = await anonClient
      .from('user_settings')
      .update({
        transaction_categories: data.transaction_categories
      })
      .eq('user_id', userId)
      .select('*')
      .single();
    if (user_settings_error) {
      throw user_settings_error;
    }

    return user_settings_data;
  } catch (error) {
    console.error('Update App Settings Error: ', error);
  }
}
