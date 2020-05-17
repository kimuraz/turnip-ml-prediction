<template>
  <a-layout>
    <a-layout-header>
      <navbar />
    </a-layout-header>
    <div class="app-container">
      <nuxt />
    </div>
  </a-layout>
</template>

<script>
import Navbar from '@/components/navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.app-container {
  height: calc(100vh - 64px);
  padding: 20px;
  overflow-y: auto;
}
</style>
