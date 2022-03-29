<template>
  <p>Choosen addons:</p>
  <el-row justify="center">
    <el-space wrap :size="20">
      <el-card v-for="(price, addon, i) in sevedAddons" :key="i" class="box-card" style="width: 200px">
        <div>
          <el-checkbox-group v-model="chosenAddons">
            <el-checkbox :label="addon" size="large">
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <img class="image" :src="`./assets/images/${addon}.png`">
        </div>
        <div>
          <el-space wrap :size="20" justify="center">
            <span>Price: {{ price }} $</span>
          </el-space>
        </div>
      </el-card>
    </el-space>
  </el-row>
  <p>Choosen base:</p>
  <el-row justify="center">
    <el-card class="box-card" style="width: 70%">
      <el-space wrap :size="20">
        <div v-for="(price, baseName, i) in sevedBase" :key="i" class="box-card"
             style="width: 200px">
          <img class="image" :src="`./assets/images/${baseName}.png`" :alt="baseName">
          <p>Price: {{ price }} $</p>
          <el-radio v-model="chosenBase" :label="baseName" size="large" border>{{
              baseName
            }}
          </el-radio>
        </div>
      </el-space>
    </el-card>
  </el-row>
  <button @click="update"> check</button>
</template>


<script lang="ts">
import * as Index from '@element-plus/icons-vue';

import HomeService from '../services/Home.service.js';
import { onBeforeMount, onUpdated, ref } from 'vue';

export default {
  name: 'HomeView',

  setup () {
    const sevedBase = ref([]);
    const sevedAddons = ref(['honey']);
    const chosenAddons = ref([]);
    const chosenBase = ref('');
    onBeforeMount(async () => {
      const response = await HomeService.getAvailable();
      sevedBase.value = response.base;
      sevedAddons.value = response.addons;
    });

    function update () {
      console.log(chosenAddons.value[0]);
      console.log(chosenBase.value);
    };

    return {
      sevedBase,
      sevedAddons,
      chosenAddons,
      chosenBase,
      update
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
