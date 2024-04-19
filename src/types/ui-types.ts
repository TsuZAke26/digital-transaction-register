import type { Database } from './supabase';

export const ACCOUNT_TYPES = ['Checking', 'Savings', 'Credit Line'];

export interface AccountSummary {
  id: number;
  name: string;
  accountType: Database['public']['Enums']['account_type'];
  balance: number;
}

export interface NewAccount {
  name: string;
  accountType: 'Checking' | 'Savings' | 'Credit Line';
  maxBalance?: number;
}

export interface NewTransaction {
  name: string;
  date: string;
  amount: number;
  category?: string;
  accountId: number;
}
