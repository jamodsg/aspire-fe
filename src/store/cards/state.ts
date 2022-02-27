import { DebitCard } from 'src/models';
import { RecentTransaction } from 'src/models/recent-transaction';

export interface CardsStateInterface {
  recentTransactions: RecentTransaction[];
  debitCards: DebitCard[];
}

function state(): CardsStateInterface {
  return {
    recentTransactions: [],
    debitCards: [],
  };
}

export default state;
