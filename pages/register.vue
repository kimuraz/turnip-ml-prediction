<template>
  <div id="register-page">
    <a-card title="New user" style="width: 30vw; min-width: 450px;">
      <a-form form-layout="horizontal" :form="form" @submit.prevent="register">
        <a-form-item label="Name">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: 'Please fill up your name.' }
                ]
              }
            ]"
          />
        </a-form-item>

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
                  { required: true, message: 'Please fill up your password.' },
                  {
                    validator: validateToNextPassword
                  }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>

        <a-form-item label="Confirm password">
          <a-input
            v-decorator="[
              'confirmPassword',
              {
                rules: [
                  { required: true, message: 'Please fill up your password.' },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            Sign up
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { newUser } from '@/utils/api';

export default {
  name: 'Register',
  middleware({ store, redirect }) {
    if (store.state.user) {
      redirect('/');
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'register' })
    };
  },
  methods: {
    async register(e) {
      try {
        await this.form.validateFields(async (err, values) => {
          if (!err) {
            await newUser(values);
            alert('User successfully crated!');
            window.location.href = '/login';
          }
        });
      } catch (err) {
        alert(err);
      }
    },
    compareToFirstPassword(rule, value, validateCb) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        validateCb('Your passwords must match!');
      } else {
        validateCb();
      }
    },
    validateToNextPassword(rule, value, validateCb) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      validateCb();
    }
  }
};
</script>

<style lang="scss">
#register-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
