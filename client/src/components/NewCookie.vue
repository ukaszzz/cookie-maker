<template>
  <el-button @click="updateCookie" color="#3d405b" size="large"
             style="color: #fff; margin: 40px; --el-tag-bg-color: red">Change
    Cookie
  </el-button>
  <p>Choose addons:</p>
  <el-row justify="center">
    <el-space wrap :size="20" class="card">
      <el-card v-for="({id, name, price}) in AvailableAddons" :key="id" class="box-card" style="width: 200px">
        <div>
          <el-checkbox-group v-model="chosenAddons">
            <el-checkbox :label="id" :name="name" size="large" border>{{ name }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <img class="image" :src="`./assets/images/${name}.png`">
        </div>
        <div>
          <el-space wrap :size="20" justify="center">
            <span>Price: {{ price }} $</span>
          </el-space>
        </div>
      </el-card>
    </el-space>
  </el-row>
  <p>Choose base:</p>
  <el-row justify="center">
    <el-card class="box-card" style="width: 50%">
      <el-space wrap :size="20" class="card">
        <el-radio-group v-model="chosenBase">
          <div v-for="({id, name, price}) in AvailableBases" :key="id" class="box-card"
               style="width: 200px">
            <img class="image" :src="`./assets/images/${name}.png`" :alt="name">
            <p>Price: {{ price }} $</p>
            <el-radio :label="id" :name="name" size="large" border>{{ name }}
            </el-radio>
          </div>
        </el-radio-group>
      </el-space>
    </el-card>
  </el-row>
</template>


<script lang="ts">
import { ElNotification } from 'element-plus';

import CookieService from '../services/Cookie.service';
import { onBeforeMount, onUpdated, ref } from 'vue';
import { useCookieStore } from '../store/useCookie';

export default {
  name: 'HomeView',

  setup: function () {
    const AvailableBases = ref([]);
    const AvailableAddons = ref([]);
    const chosenAddons = ref([]);
    const chosenBase = ref('');
    const store = useCookieStore();

    onBeforeMount(async () => {
      const response = await CookieService.getAvailable();
      AvailableBases.value = response.bases;
      AvailableAddons.value = response.addons;
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
        base: chosenBase.value
      };

      const response = await CookieService.saveCookie(cookie);
      console.log(response);
      if (response.status === 200) {
        ElNotification({
          title: 'Success',
          message: 'Cookie Made!',
          type: 'success'
        });
        store.$patch((state) => {
          state.addons = chosenAddons.value;
          state.base = chosenBase.value;
        });
      }
    }

    return {
      AvailableBases,
      AvailableAddons,
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
