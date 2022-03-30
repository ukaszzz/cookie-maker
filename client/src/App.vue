<template>
  <el-container>
    <el-main>
      <HomeView/>
      <NewCookie/>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue';
import HomeView from './components/HomeView.vue';
import NewCookie from './components/NewCookie.vue';
</script>


<style>

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f4f1de;
}
</style>
