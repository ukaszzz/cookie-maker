<template>
  <p>Choose base:</p>
  <el-row justify="center">
    <el-card class="box-card" style="width: 50%">
      <el-space wrap :size="20" class="card">
        <el-radio-group v-model="chosenBase">
          <div v-for="({id, name, price}) in bases" :key="id" class="box-card"
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

import { useCookieStore } from '../../../store/useCookie';
import { ref, watch } from 'vue';
import { Base } from '../../../model/Base';

export default {
  name: 'BaseSelector',
  props: {
    bases: Array
  },
  setup (props) {
    const chosenBase = ref();
    const store = useCookieStore();

    watch(chosenBase, async () => {
      await store.$patch((state) => {
        console.log(state);
        console.log(state);
        state.base = chosenBase.value;
        console.log(props);
        state.priceBase += props.bases[+chosenBase.value - 1].price;
      });
    });
    return {
      chosenBase
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
