<template>
  <div id="app">
    <div id="app-main-content">
      <router-view />
    </div>
    <div id="app-footer">
    </div>
  </div>
</template>
<script>
// import Footer from "@/layouts/Footer.vue";
export default {
  components: {
    // Footer,
  },
};
</script>

<style>
#app-main-content{
  position: relative;
}
#app-footer{
  position: relative;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
