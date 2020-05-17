<template>
  <a-menu
    theme="dark"
    v-model="$route.name"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item key="index">
      <nuxt-link to="/">Home</nuxt-link>
    </a-menu-item>

    <a-menu-item key="login">
      <nuxt-link to="/login">
        Sign In
      </nuxt-link>
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
