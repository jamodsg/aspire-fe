<template>
  <div class="q-pa-md" v-if="store.state.cards.debitCards.length > 0">
    <div class="text-right show-card-number">
      <p>
        <span @click="showCardNumber = !showCardNumber" class="cursor-pointer">
          <q-icon name="remove_red_eye" color="#01D167" size="18px"></q-icon>
          {{
            $t(
              `CARDS.MY_DEBIT_CARDS.${
                showCardNumber ? 'HIDE_CARD_NUMBER' : 'SHOW_CARD_NUMBER'
              }`
            )
          }}
        </span>
      </p>
    </div>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      padding
      infinite
      height="250px"
      class="bg-green text-white card-slider-carousel"
    >
      <q-carousel-slide
        v-for="(debitCard, index) in store.state.cards.debitCards"
        :name="index"
        :key="index"
        class="text-center"
        :class="`${debitCard?.isFrozen && 'frozen-card'}`"
      >
        <q-scroll-area class="fit card-detail">
          <div class="card-logo-box">
            <q-img
              src="Aspire Logo.svg"
              class="card-logo"
              :alt="$t('MAIN_LAYOUT.ASPIRE')"
            />
          </div>
          <div class="q-mt-md card-heading">{{ debitCard.name }}</div>
          <div class="q-mt-md">
            <div class="row">
              <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12">
                <div v-if="!showCardNumber" class="row">
                  <div class="col-3">
                    <div class="card-number-circle">&nbsp;</div>
                    <div class="card-number-circle">&nbsp;</div>
                    <div class="card-number-circle">&nbsp;</div>
                    <div class="card-number-circle">&nbsp;</div>
                  </div>
                  <div class="col-3">
                    <div class="card-number-circle">&nbsp;</div>
                    <div class="card-number-circle">&nbsp;</div>
                    <div class="card-number-circle">&nbsp;</div>
                    <div class="card-number-circle">&nbsp;</div>
                  </div>
                  <div class="col-3">
                    <div class="card-number-circle">&nbsp;</div>
                    <div class="card-number-circle">&nbsp;</div>
                    <div class="card-number-circle">&nbsp;</div>
                    <div class="card-number-circle">&nbsp;</div>
                  </div>
                  <div class="col-3">
                    <div class="card-number-value">
                      {{ debitCard.number.toString().substring(12, 16) }}
                    </div>
                  </div>
                </div>
                <div v-else class="row card-detail">
                  <div class="col-3">
                    <div class="card-number-value">
                      {{ debitCard.number.toString().substring(0, 4) }}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="card-number-value">
                      {{ debitCard.number.toString().substring(4, 8) }}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="card-number-value">
                      {{ debitCard.number.toString().substring(8, 12) }}
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="card-number-value">
                      {{ debitCard.number.toString().substring(12, 16) }}
                    </div>
                  </div>
                </div>
                <div class="row card-exp">
                  <div class="col-5">
                    {{ $t(`CARDS.MY_DEBIT_CARDS.THRU`) }}:
                    {{ formatExpiryDate(debitCard.date) }}
                  </div>
                  <div class="col-5 cvv-hidden">
                    {{ $t(`CARDS.MY_DEBIT_CARDS.CVV`) }}: <span>* * *</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-type-logo-box">
              <q-img
                src="Visa Logo.svg"
                class="card-type-logo"
                :alt="$t('MAIN_LAYOUT.ASPIRE')"
              />
            </div>
          </div>
        </q-scroll-area>
      </q-carousel-slide>
    </q-carousel>
    <div class="q-mt-md row wrap justify-center items-center content-center">
      <div
        v-for="(debitCard, index) in store.state.cards.debitCards"
        :key="index"
        :value="`${index}`"
        @click="setSlide(index)"
        :class="slide === index ? 'navigation-active' : 'navigation'"
      ></div>
    </div>
    <div>
      <q-list
        bordered
        class="
          rounded-borders
          q-mt-xl q-pa-sm
          fit
          row
          wrap
          justify-between
          card-action-box
        "
      >
        <q-item
          clickable
          v-ripple
          v-for="(action, index) in debitCardAction"
          :key="index"
          @click="actionFire(index)"
        >
          <q-item-section style="align-items: center">
            <q-img
              :src="action.icon"
              :alt="$t(`CARDS.MY_DEBIT_CARDS.ACTION.${action.name}`)"
              width="32px"
              height="32px"
            />
            <q-item-label class="q-pt-sm">
              {{
                index === 0 && store.state.cards.debitCards[slide].isFrozen
                  ? $t(`CARDS.MY_DEBIT_CARDS.ACTION.FUNREEZE_CARD`)
                  : $t(`CARDS.MY_DEBIT_CARDS.ACTION.${action.name}`)
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="primary" text-color="white" />
            <span class="q-ml-sm">
              {{ $t(`CARDS.MY_DEBIT_CARDS.ARE_YOU_SURE`) }}
            </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              :label="$t('COMMON.CANCEL')"
              color="primary"
              v-close-popup
            />
            <q-btn
              @click="cancelCard"
              flat
              :label="$t('COMMON.YES')"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

// store
import { useStore } from 'src/store';

// utils
import { debitCardAction, DateHelper } from 'src/utils';

export default defineComponent({
  name: 'CardSlider',
  props: {},
  setup() {
    const $store = useStore();
    const $q = useQuasar();

    let slide = ref(0);
    let confirm = ref(false);
    let showCardNumber = ref(false);

    const setSlide = (index: number): void => {
      slide.value = index;
    };

    const actionFire = (index: number): void => {
      if (index === 0) {
        showSuccessNotify(
          $store.state.cards.debitCards[slide.value].isFrozen == true
            ? 'Card freeze successfully !!!'
            : 'Card unfreeze successfully !!!'
        );
        $store.commit('cards/freezeDebitCard', slide.value);
      }
      if (index === 4) {
        confirm.value = true;
      }
    };

    const cancelCard = (): void => {
      $store.commit('cards/removeDebitCard', slide.value);
      showSuccessNotify('Card removed successfully !!!');
      confirm.value = false;
      slide.value = 0;
    };

    const formatExpiryDate = (date: string): string => {
      return DateHelper.formatExpiryDate(date);
    };

    const showSuccessNotify = (message: string) => {
      $q.notify({
        color: 'green',
        icon: 'thumb_up',
        message: message,
        position: 'top-right',
        timeout: 2000,
      });
    };

    return {
      setSlide,
      actionFire,
      cancelCard,
      formatExpiryDate,
      store: $store,
      slide,
      confirm,
      showCardNumber,
      debitCardAction: debitCardAction,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-carousel__slide,
.q-carousel .q-carousel--padding {
  padding: 27px;
}
.card-slider-carousel {
  border-radius: 10px;
  .frozen-card {
    opacity: 0.4;
  }
}
.card-detail {
  text-align: left;
  .card-logo-box {
    text-align: right;
    .card-logo {
      height: 24px;
      width: 84px;
    }
  }
  .card-heading {
    text-align: left;
    font-weight: bold;
    font-size: 24px;
    margin-top: 28px;
    margin-bottom: 28px;
  }
  .card-number-circle {
    display: inline-block;
    width: 9px;
    height: 9px;
    background: $white;
    margin-right: 6px;
    border-radius: 50%;
  }
  .card-number-value {
    font-weight: bold;
    font-size: 14px;
  }
  .card-exp {
    font-size: 13px;
    font-weight: bold;
    margin-top: 15px;
  }
  .card-type-logo-box {
    text-align: right;
    .card-type-logo {
      height: 24px;
      width: 84px;
    }
  }
}
.show-card-number {
  p {
    font-size: 14px;
    color: $green;
    font-weight: bold;

    i {
      vertical-align: sub;
    }
  }
}
.card-shown,
.cvv-shown {
  display: none;
}
.card-number-value {
  margin-top: -6px;
}
.navigation {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: $green;
  margin: 4px;
  opacity: 0.2;
}
.navigation-active {
  width: 16px;
  height: 8px;
  border-radius: 25%;
  background-color: $green;
  margin: 4px;
}
.q-list {
  background-color: $sky-blue-second;
  border: none;
  border-radius: 16px;

  .q-item__label {
    color: $primary-dark;
    font-size: 14px;
    width: 65px;
  }
}
.card-action-box {
  padding: 22px 8px;
  .q-item {
    display: block;
    text-align: center;
  }
}
.cvv-hidden span {
  font-size: 17px;
  position: absolute;
  margin-left: 6px;
}
.card-detail {
  height: 21px;
}
</style>
