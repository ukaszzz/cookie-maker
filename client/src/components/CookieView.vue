<template>
  <el-row justify="center">
    <el-space wrap :size="20">
      <el-card v-if="!isCookieSaved" class="cookie-box">
        <p>You haven't created the cookie yet. <br>
          Choose add-ons and base</p>
      </el-card>
      <el-card v-else :style="{ background: cookieBackground }"
               class="cookie-box">
      </el-card>
    </el-space>
  </el-row>
  <el-row justify="center" v-if="isCookieSaved">
    <p>Saved cookie price: {{ CookiePrice }} $</p>
  </el-row>
  <el-row justify="center">
    <p>Current cookie Price: {{ store.priceAddons + store.priceBase }} $</p>
  </el-row>
</template>

<script lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import CookieService from '../services/Cookie.service';
import { useCookieStore } from '../store/useCookie';

export default {
  name: 'CookieView',

  setup () {
    const savedBase = ref();
    const savedAddons = ref();
    const isCookieSaved = ref(false);
    const CookiePrice = ref();
    const cookieBackground = computed(() => {
      const background = savedAddons.value.map(addon => ` url(./assets/images/${addon}.png)`);
      return background.toString() + `, url(./assets/images/${savedBase.value}.png)`;
    });
    const store = useCookieStore();
    onBeforeMount(async () => {
      await loadData();
    });

    async function loadData () {
      const response = await CookieService.getHomeData();
      savedBase.value = response.base;
      savedAddons.value = response.addons;
      CookiePrice.value = response.price;
      isCookieSaved.value = response.addons.length > 0;
    }

    store.$subscribe((mutation, state) => {
      if (state.reloadData) {
        loadData();
        state.reloadData = false;
      }
    });

    return {
      cookieBackground,
      store,
      isCookieSaved,
      CookiePrice
    };
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.cookie-box {
  width: 39vh;
  height: 41vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover !important;
}

.image {
  max-height: 120px;
}
</style>
