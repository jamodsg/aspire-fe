<template>
  <q-item>
    <router-link :to="link" class="router-link">
      <q-img
        :src="`menus/${icon}.svg`"
        :alt="$t(`SIDEBAR.${title}`)"
        width="24px"
        height="24px"
      />
      <q-item-label>{{ $t(`SIDEBAR.${title}`) }}</q-item-label>
    </router-link>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidebarLink',
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.q-item {
  padding: 28px 0px;

  .router-link {
    display: flex;
    align-items: center;
    gap: 16px;
    text-decoration: none;

    .q-item__label {
      color: $white;
      font-size: 16px;
    }
  }

  .router-link-exact-active {
    .q-item__label {
      color: $green;
    }
    .q-img {
      filter: invert(53%) sepia(22%) saturate(4955%) hue-rotate(114deg)
        brightness(105%) contrast(99%);
    }
  }
}
</style>
