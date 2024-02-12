import type { Transaction } from './transaction';

export interface AccountPreview {
  id: number;
  name: string;
  transactions: Transaction[];
}
