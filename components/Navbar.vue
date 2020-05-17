<template>
  <a-menu
    v-model="menu"
    theme="dark"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item key="index">
      <nuxt-link to="/">Home</nuxt-link>
    </a-menu-item>

    <a-menu-item key="auth-datasets">
      <nuxt-link to="/auth/datasets">Datasets</nuxt-link>
    </a-menu-item>

    <a-menu-item key="auth-training">
      <nuxt-link to="/auth/training">Training</nuxt-link>
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
  name: 'Navbar',
  data() {
    return {
      menu: [this.$route.name || '']
    };
  }
};
</script>
