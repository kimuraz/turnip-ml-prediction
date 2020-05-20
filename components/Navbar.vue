<template>
  <a-menu
    v-model="menu"
    theme="dark"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
  >
    <client-only>
      <a-menu-item key="index">
        <nuxt-link to="/">Home</nuxt-link>
      </a-menu-item>

      <a-menu-item v-if="user" key="auth-datasets">
        <nuxt-link to="/auth/datasets">Datasets</nuxt-link>
      </a-menu-item>

      <a-menu-item v-if="user" key="auth-training">
        <nuxt-link to="/auth/training">Training</nuxt-link>
      </a-menu-item>

      <a-menu-item v-if="user" key="logout" @click="removeUser">
        <nuxt-link to="/">
          Logout
        </nuxt-link>
      </a-menu-item>

      <a-menu-item v-if="!user" key="login">
        <nuxt-link to="/login">
          Sign In
        </nuxt-link>
      </a-menu-item>
    </client-only>
  </a-menu>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'Navbar',
  data() {
    return {
      menu: [this.$route.name || '']
    };
  },
  computed: {
    ...mapGetters({ user: 'getUser' })
  },
  methods: {
    ...mapMutations(['removeUser'])
  }
};
</script>

<style scoped lang="scss">
.menu-end {
  float: right;
}
</style>
