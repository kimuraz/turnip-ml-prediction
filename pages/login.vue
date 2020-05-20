<template>
  <div id="login-page">
    <a-card
      class="login-card"
      title="Sign In"
      style="width: 30vw; min-width: 450px;"
    >
      <a-form form-layout="horizontal" :form="form" @submit.prevent="doLogin">
        <a-form-item label="E-mail">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  { required: true, message: 'Please fill up your email.' },
                  { type: 'email', message: 'Invalid format for an email.' }
                ]
              }
            ]"
          />
        </a-form-item>

        <a-form-item label="Password">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please fill up your password.' }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>

        <a-form-item class="create-link-container">
          <nuxt-link to="/register">
            Create account
          </nuxt-link>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            Sign In
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { login, getProfile } from '@/utils/api';

export default {
  name: 'Login',
  middleware({ store, redirect }) {
    if (store.state.user) {
      redirect('/');
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'login' })
    };
  },
  methods: {
    async doLogin(e) {
      await this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            const token = await login(values);
            const user = await getProfile();

            this.setUser({ ...user, token });

            window.location.href = '/';
          } catch (err) {
            alert(err.toString());
          }
        }
      });
    },
    ...mapMutations(['setUser'])
  }
};
</script>

<style lang="scss">
#login-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .create-link-container {
    margin: 5px 0;
    text-align: right;
  }
}
</style>
