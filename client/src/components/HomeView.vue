<template>
  <p>Your Cookie</p>
  {{ store.$state }}
  <el-row justify="center">
    <el-space wrap :size="20">
      <el-card :style="{ background: cookieBackground }" style="width: 39vh; height: 41vh; background-size: cover">
      </el-card>
    </el-space>
  </el-row>

</template>


<script lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import CookieService from '../services/Cookie.service';
import { useCookieStore } from '../store/useCookie';

export default {
  name: 'HomeView',

  setup () {
    const sevedBase = ref('');
    const sevedAddons = ref([]);
    const cookieBackground = computed(() => {
      const background = sevedAddons.value.map(addon => ` url(./assets/images/${addon}.png)`);
      return background.toString() + `, url(./assets/images/${sevedBase.value}.png)`;
    });
    const store = useCookieStore();
    onBeforeMount(async () => {
      await loadData();
    });

    store.$subscribe(async () => {
      await loadData();
    });

    async function loadData () {
      const response = await CookieService.getHomeData();
      sevedBase.value = response.base;
      sevedAddons.value = response.addons;
    }

    return {
      cookieBackground,
      store
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

.image {
  max-height: 120px;
}
</style>
