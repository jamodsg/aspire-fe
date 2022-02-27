<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <p>{{ $t('CARDS.AVAILABLE_BALANCE') }}</p>
      </div>
    </div>
    <div class="fit row wrap justify-between items-start content-start">
      <div class="row items-center content-center show-price">
        <div class="currency">S$</div>
        <div class="price">3,000</div>
      </div>
      <div>
        <q-btn
          color="primary"
          class="add-btn"
          :label="$t('CARDS.NEW_CARD')"
          icon="add"
          @click="isAddCard = true"
        />
      </div>
    </div>
    <div class="q-pt-lg">
      <div class="q-gutter-y-md">
        <q-card class="tab-card">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab
              name="debit-cards"
              :label="$t('CARDS.TABS.MY_DEBIT_CARDS')"
            />
            <q-tab
              name="company-cards"
              :label="$t('CARDS.TABS.ALL_COMPANY_CARDS')"
            />
          </q-tabs>
        </q-card>

        <q-card class="tab-box">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel class="q-pa-lg" name="debit-cards">
              <debit-cards />
            </q-tab-panel>

            <q-tab-panel class="q-pa-lg" name="company-cards">
              <div class="text-h6">
                {{ $t('CARDS.ALL_COMPANY_CARDS.TITLE') }}
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="isAddCard" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ $t('CARDS.NAME') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="cardName" dense autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn @click="isAddCard = false" flat :label="$t('COMMON.CANCEL')" />
          <q-btn
            @click="addCard"
            :disable="!cardName"
            flat
            :label="$t('COMMON.ADD')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

// store
import { useStore } from 'src/store';

// Components
import DebitCards from 'src/components/DebitCards/DebitCards.vue';

// models
import { DebitCard } from 'src/models';

// utils
import { NumberHelper, DateHelper } from 'src/utils';

export default defineComponent({
  name: 'Cards',
  components: {
    DebitCards,
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();

    let isAddCard = ref(false);
    let cardName = ref('');

    const addCard = () => {
      const card: DebitCard = {
        name: cardName.value,
        number: NumberHelper.generateRandomNumber(16),
        date: DateHelper.generateRandomDate(new Date(), new Date(2050, 11, 31)),
        cvv: NumberHelper.generateRandomNumber(3),
      };
      $store.commit('cards/addDebitCard', card);
      isAddCard.value = false;
      cardName.value = '';
      $q.notify({
        color: 'green',
        icon: 'thumb_up',
        message: 'Card added successfully !!!',
        position: 'top-right',
        timeout: 2000,
      });
    };

    return {
      isAddCard,
      cardName,
      addCard,
      tab: ref('debit-cards'),
    };
  },
});
</script>

<style lang="scss">
.tab-box {
  box-shadow: 0px 2px 12px #00000014;
  @media (max-width: 599px) {
    .q-tab-panel {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
}
.show-price {
  .currency {
    padding: 3px 12px;
    border-radius: 4px;
    background-color: $green;
    color: $white;
    align-items: center;
  }
  .price {
    margin-left: 10px;
    color: $dark;
    font-size: 26px;
    font-weight: bold;
  }
}
.bg-primary {
  background-color: $primary !important;
  font-size: 16px;
}
.add-btn {
  font-size: 13px;
}

.tab-card {
  box-shadow: none;
  .q-tabs {
    &__content {
      .q-tab {
        padding: 0px;
        margin-right: 30px;
        text-transform: initial;

        &__label {
          font-size: 13px;
          font-weight: 500;
        }
      }
      .q-hoverable:hover > .q-focus-helper {
        background: none;
      }
    }
    .text-primary {
      color: $sky !important;
      .q-tab {
        &__label {
          color: $dark;
          font-weight: 600;
        }
        &-helper {
          background-color: none;
        }
      }
    }
  }
}
</style>
