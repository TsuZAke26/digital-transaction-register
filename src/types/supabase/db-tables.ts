import type { Database } from './supabase';

export const AccountTypes = {
  CHECKING: 'Checking',
  SAVINGS: 'Savings',
  CREDIT_LINE: 'Credit Line'
};

export type Accounts = {
  account_type: Database['public']['Enums']['account_type'];
  balance: number;
  created_at: string;
  id: number;
  max_balance?: number;
  name: string;
  user_id: string;
};

export type Transactions = {
  account_id: number;
  amount: number;
  created_at: string;
  date: string;
  id: number;
  name: string;
};
