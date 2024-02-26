export const ACCOUNT_TYPES = ['Checking', 'Savings', 'Credit Line'];

export interface AccountPreview {
  id: number;
  name: string;
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
  accountId: number;
}
