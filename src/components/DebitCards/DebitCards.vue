<template>
  <div class="row">
    <div class="col-md-6 col-md-6 col-sm-12 col-xs-12">
      <card-slider />
    </div>
    <div class="col-md-6 col-md-6 col-sm-12 col-xs-12">
      <card-details />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'src/store';

// Services
import { DebitCardService } from 'src/services';

// Components
import CardDetails from './CardDetails.vue';
import CardSlider from './CardSlider.vue';

export default defineComponent({
  name: 'DebitCards',
  components: {
    CardSlider,
    CardDetails,
  },
  setup() {
    const $store = useStore();

    const getRecentTransaction = async () => {
      try {
        const res = await DebitCardService.getRecentTransaction();
        $store.commit('cards/updateRecentTransaction', res);
      } catch (err) {
        console.log('Error => ', err);
      }
    };

    const getDebitCards = async () => {
      try {
        const res = await DebitCardService.getDebitCards();
        $store.commit('cards/updateDebitCards', res);
      } catch (err) {
        console.log('Error => ', err);
      }
    };

    onMounted(async () => {
      await getRecentTransaction();
      await getDebitCards();
    });

    return {};
  },
});
</script>

<style lang="scss" scoped></style>
