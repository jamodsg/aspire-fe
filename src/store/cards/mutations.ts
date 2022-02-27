import { DebitCard } from 'src/models';
import { RecentTransaction } from 'src/models/recent-transaction';
import { MutationTree } from 'vuex';
import { CardsStateInterface } from './state';

const mutation: MutationTree<CardsStateInterface> = {
  updateRecentTransaction(state: CardsStateInterface, transactions: RecentTransaction[]) {
    state.recentTransactions = transactions;
  },
  updateDebitCards(state: CardsStateInterface, cards: DebitCard[]) {
    state.debitCards = cards;
  },
  removeDebitCard(state: CardsStateInterface, index: number) {
    const cards = state.debitCards;
    cards.splice(index, 1);
    state.debitCards = cards;
  },
  freezeDebitCard(state: CardsStateInterface, index: number) {
    const cards = state.debitCards;
    cards[index].isFrozen = !cards[index].isFrozen;
    state.debitCards = cards;
  },
  addDebitCard(state: CardsStateInterface, card: DebitCard) {
    const cards = state.debitCards;
    cards.push(card);
    state.debitCards = cards;
  },
};

export default mutation;
