import debitCards from 'src/mock/debit-cards.json';
import recentTransactions from 'src/mock/recent-transaction.json';
import { DebitCard } from 'src/models';
import { RecentTransaction } from 'src/models/recent-transaction';

export class DebitCardService {
  static getRecentTransaction(): Promise<RecentTransaction[]> {
    return new Promise((resolve) => {
      resolve(recentTransactions);
    });
  }

  static getDebitCards(): Promise<DebitCard[]> {
    return new Promise((resolve) => {
      resolve(debitCards);
    });
  }
}
