export interface NewAccount {
  name: string;
  accountType: 'Checking' | 'Savings' | 'Credit Line';
  maxBalance?: number;
}
