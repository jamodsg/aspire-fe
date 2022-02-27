import { DebitCardAction } from 'src/models';

// debit card actions
export const debitCardAction: DebitCardAction[] = [
  {
    name: 'FREEZE_CARD',
    icon: 'FreezeCard.svg',
  },
  {
    name: 'SET_SPEND_LIMIT',
    icon: 'SetSpendLimit.svg',
  },
  {
    name: 'ADD_TO_GPAY',
    icon: 'GPay.svg',
  },
  {
    name: 'REPLACE_CARD',
    icon: 'ReplaceCard.svg',
  },
  {
    name: 'CANCEL_CARD',
    icon: 'DeactivateCard.svg',
  },
];
