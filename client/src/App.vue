<template>
  <el-container>
    <el-main>
      <CookieView/>
      <NewCookieCreator/>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import CookieView from './components/CookieView.vue';
import NewCookieCreator from './components/cookieCreator/NewCookieCreator.vue';
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
