<template>
  <el-button @click="updateCookie" type="primary" style="margin: 40px">Change Cookie</el-button>
  <p>Choose addons:</p>
  <el-row justify="center">
    <el-space wrap :size="20">
      <el-card v-for="({id, name, price}) in AvailableAddons" :key="id" class="box-card" style="width: 200px">
        <div>
          <el-checkbox-group v-model="chosenAddons">
            <el-checkbox :label="name" :id="id.toString()" size="large">
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
    <el-card class="box-card" style="width: 70%">
      <el-space wrap :size="20">
        <div v-for="({id, name, price}) in AvailableBases" :key="id" class="box-card"
             style="width: 200px">
          <img class="image" :src="`./assets/images/${name}.png`" :alt="name">
          <p>Price: {{ price }} $</p>
          <el-radio v-model="chosenBase" :label="name" size="large" border>{{
              name
            }}
          </el-radio>
        </div>
      </el-space>
    </el-card>
  </el-row>
</template>


<script lang="ts">
import * as Index from '@element-plus/icons-vue';

import CookieService from '../services/Cookie.service';
import { onBeforeMount, onUpdated, ref } from 'vue';
import { useCookieStore } from '../store/useCookie';

export default {
  name: 'HomeView',

  setup () {
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
      const cookie = {
        addons: chosenAddons.value,
        base: chosenBase.value
      };
      // const response = await CookieService.saveCookie(cookie);
      console.log(cookie);
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

.image {
  max-height: 100px;
}
</style>
