<template>
  
  <suspense>
    <div v-for="item in sevedByUser">
      <p>{{ item[0] }}: cena= {{ item[1] }}</p>

    </div>
  </suspense>
</template>


<script lang="ts">
import HomeService from '../services/Home.service.js';
import { onBeforeMount, ref } from 'vue';

export default {
  name: 'HomeView',

  setup () {
    const sevedByUser = ref({});
    onBeforeMount(async () => {
      const {saved} = await HomeService.getHomeData();
      sevedByUser.value = saved;
    });

    return {
      sevedByUser
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
</style>
