<template>
  <el-button @click="updateCookie" color="#3d405b" size="large"
             style="color: #fff; margin: 40px; --el-tag-bg-color: red">
    Change Cookie
  </el-button>
  <AddonsSelector :addons="availableAddons"/>
  <BaseSelector :bases="availableBases"/>
</template>


<script lang="ts">
import AddonsSelector from './cookieCreatoreElements/AddonsSelector.vue';
import BaseSelector from './cookieCreatoreElements/BaseSelector.vue';

import { ElNotification } from 'element-plus';
import CookieService from '../../services/Cookie.service';
import { onBeforeMount, onUpdated, ref } from 'vue';
import { useCookieStore } from '../../store/useCookie';

export default {
  name: 'NewCookieCreator',
  components: {
    AddonsSelector,
    BaseSelector
  },
  setup: function () {
    const availableBases = ref([]);
    const availableAddons = ref([]);
    const chosenAddons = ref([]);
    const chosenBase = ref('');
    const store = useCookieStore();

    onBeforeMount(async () => {
      const response = await CookieService.getAvailable();
      availableBases.value = response.bases;
      availableAddons.value = response.addons;
    });

    store.$subscribe((mutation, state) => {
      chosenAddons.value = state.addons;
      chosenBase.value = state.base;
    });

    async function updateCookie () {
      if ( !chosenAddons.value.length) {
        ElNotification({
          title: 'Error',
          message: 'You must choose at least one addon',
          type: 'error'
        });
        return;
      }

      if ( !chosenBase.value) {
        ElNotification({
          title: 'Error',
          message: 'You must choose base.',
          type: 'error'
        });
        return;
      }

      const cookie = {
        addons: chosenAddons.value,
        base: chosenBase.value,
        price: 1
      };

      const response = await CookieService.saveCookie(cookie);
      console.log(response);
      if (response.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Cookie Made!',
          type: 'success'
        });

      }
    }

    return {
      availableBases,
      availableAddons,
      chosenAddons,
      chosenBase,
      updateCookie
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

.card {
  justify-content: center;
}

.image {
  max-height: 100px;
}
</style>
