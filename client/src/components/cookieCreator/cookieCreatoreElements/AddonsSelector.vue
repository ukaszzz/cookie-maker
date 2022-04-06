<template>
  <p>Choose addons:</p>
  <el-row justify="center">
    <el-space wrap :size="20" class="card">
      <el-card v-for="({id, name, price}) in addons" :key="id" class="box-card" style="width: 200px">
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
</template>


<script lang="ts">
import { ref, watch } from 'vue';
import { useCookieStore } from '../../../store/useCookie';

export default {
  name: 'AddonsSelector',
  props: {
    addons: Array
  },
  setup (props) {
    const chosenAddons = ref([]);
    const store = useCookieStore();
    watch(chosenAddons, () => {
      store.$patch((state) => {
        state.addons = chosenAddons.value;
        state.priceAddons = chosenAddons.value.reduce(function (prev, curr) {
          return prev + props.addons[curr - 1].price;
        }, 0);
      });
    });
    return {
      chosenAddons
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
