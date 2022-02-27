<template>
  <div class="q-pa-md">
    <q-list>
      <q-expansion-item
        group="card-detail-group"
        icon="credit_card"
        :label="$t('CARDS.MY_DEBIT_CARDS.CARD_DETAILS')"
        header-class="text-primary"
      >
        <q-card>
          <q-card-section class="transaction-section">
            <p>{{ $t('CARDS.MY_DEBIT_CARDS.CARD_DETAILS_SECTION') }}</p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <q-list class="q-mt-lg">
      <q-expansion-item
        default-opened
        group="recent-transaction-group"
        icon="sync_alt"
        :label="$t('CARDS.MY_DEBIT_CARDS.RECENT_TRANSACTION')"
        header-class="text-primary"
      >
        <q-card>
          <q-card-section class="transaction-section">
            <q-list>
              <q-item
                v-for="(transaction, index) in store.state.cards
                  .recentTransactions"
                :key="index"
              >
                <q-item-section top avatar className="icon transaction-detail">
                  <div
                    className="transaction-detail-icon"
                    :style="`background-color: ${
                      transactionTypeColor[transaction.type]
                    }`"
                  >
                    <q-img
                      :src="transaction.icon"
                      :alt="transaction.name"
                      width="16px"
                      height="16px"
                    />
                  </div>
                </q-item-section>

                <q-item-section>
                  <q-item-label className="transaction-detail-name">
                    {{ transaction.name }}
                  </q-item-label>
                  <q-item-label className="transaction-detail-date">
                    {{ transaction.date }}
                  </q-item-label>
                  <q-item-label className="refund">
                    <div className="refund-image">
                      <q-img
                        src="business-and-finance.svg"
                        width="12px"
                        height="12px"
                      />
                    </div>
                    {{ $t('CARDS.MY_DEBIT_CARDS.REFUND_ON') }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side class="price-section">
                  <q-item-label
                    class="value"
                    :class="transaction.price >= 0 ? 'positive' : 'negative'"
                    caption
                  >
                    {{
                      `${transaction.price >= 0 ? '+' : '-'} S$ ${
                        transaction.price
                      }`
                    }}
                  </q-item-label>
                  <q-img src="next.svg" width="14px" height="14px" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-btn
        color="black"
        class="full-width q-pa-md view-all-btn"
        :label="$t('CARDS.MY_DEBIT_CARDS.VIEW_ALL')"
      />
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// store
import { useStore } from 'src/store';

export default defineComponent({
  name: 'CardDetails',
  setup() {
    const transactionTypeColor = {
      file: '#009DFF1A',
      flights: '#00D6B51A',
      megaphone: '#F251951A',
    };
    const $store = useStore();
    return {
      store: $store,
      transactionTypeColor,
    };
  },
});
</script>

<style lang="scss">
.q-expansion-item {
  background-color: $sky-blue;
  .q-item {
    &__section {
      .q-item__label {
        font-size: 16px;
        color: $primary-dark;
      }
    }
  }
}

.transaction-detail {
  &-icon {
    background: $dark-blue;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-right: 20px;
  }
  &-name {
    color: $dark;
    font-weight: bold;
    font-size: 16px;
  }
  &-date {
    color: $gray;
    font-size: 14px;
  }
}
.refund {
  display: flex;
  gap: 10px;
  padding: 10px 0px;
  white-space: nowrap;
  color: $primary;
  &-image {
    width: 24px;
    height: 22px;
    background: $primary;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
}
.price-section {
  display: flex !important;
  flex-direction: row;
  align-items: baseline !important;

  .value {
    font-size: 16px !important;
    font-weight: bold;
  }

  .positive {
    color: $green !important;
  }
  .negative {
    color: $dark !important;
  }
}
.full-width {
  color: $green !important;
  background-color: $green-sky !important;
  text-transform: initial;
  font-weight: bold;
  font-size: 14px;
}
.q-item-type {
  box-shadow: 0px 0px 8px #0000000a;
}
.transaction-section {
  border: 1px solid #f0f0f0 !important;
}
.view-all-btn.q-btn:before {
  box-shadow: none;
}
</style>
