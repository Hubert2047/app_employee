<template>
    <div id="app">
        <!-- <Toast /> -->
        <router-view />
    </div>
</template>
<script>
import Toast from './components/Toast.vue'
export default {
    components: { Toast },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background-color: #ccc;
    min-height: 100vh;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
