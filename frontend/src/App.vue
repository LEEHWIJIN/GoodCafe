<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/menu">Menu rating</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default{
    name: 'app',

}
</script>

<style>

</style>
