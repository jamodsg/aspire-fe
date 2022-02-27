<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="row main-wrapper">
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 sidebar">
          <div class="sidebar-header">
            <q-img src="Logo.svg" :alt="$t('MAIN_LAYOUT.ASPIRE')" />
            <p class="desc">
              {{ $t('MAIN_LAYOUT.TRUSTED_WAY_OF_BANKING') }}
            </p>
          </div>
          <q-list>
            <SidebarLink
              v-for="link in sidebarMenus"
              :key="link.title"
              v-bind="link"
            />
          </q-list>
        </div>
        <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 body">
          <router-view />
        </div>
      </div>
      <q-list
        bordered
        class="q-mt-xl q-pa-sm fit row wrap justify-between menu-action-box"
      >
        <q-item
          clickable
          v-ripple
          v-for="(sidebar, index) in sidebarMenus"
          :key="index"
        >
          <router-link :to="sidebar.link" class="router-link">
            <q-item-section style="align-items: center">
              <q-img
                :src="`menus/${sidebar.icon}-mobile.svg`"
                :alt="$t(`SIDEBAR.${sidebar.title}`)"
                width="24px"
                height="24px"
              />
              <q-item-label class="q-pt-sm">
                {{ $t(`SIDEBAR.${sidebar.title}`) }}
              </q-item-label>
            </q-item-section>
          </router-link>
        </q-item>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// store
import { useStore } from 'src/store';

// components
import SidebarLink from 'src/components/SidebarLink.vue';

// utils
import { debitCardAction } from 'src/utils/card';
import { sidebarMenus } from 'src/utils/sidebar';

export default defineComponent({
  name: 'MainLayout',
  components: {
    SidebarLink,
  },
  setup() {
    const $store = useStore();
    return {
      store: $store,
      sidebarMenus: sidebarMenus,
      debitCardAction: debitCardAction,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-wrapper {
  .sidebar {
    padding: 50px;
    background-color: $primary-dark;
    color: $white;

    &-header {
      .desc {
        padding: 20px 0px;
        opacity: 0.3;
        font-size: 15px;
      }
    }
  }
  .body {
    padding: 70px 60px;
  }
  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
  }
  @media (max-width: 599px) {
    .body {
      padding: 70px 10px;
    }
  }
}

.q-item {
  .router-link {
    .q-item__label {
      color: $dark-one;
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
