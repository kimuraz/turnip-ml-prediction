<template>
  <a-form :form="form" @submit.prevent="setTraining">
    <a-form-item label="Epochs">
      <a-input
        type="number"
        :min="1"
        v-decorator="[
          'epochs',
          {
            initialValue: 10,
            rules: [{ required: true, message: 'Please fill the epochs.' }]
          }
        ]"
      />
    </a-form-item>

    <a-form-item label="Learning rate">
      <a-input
        type="number"
        :min="0.01"
        :max="1"
        v-decorator="[
          'rate',
          {
            initialValue: 0.1,
            rules: [
              { required: true, message: 'Please fill the learning rate.' }
            ]
          }
        ]"
      />
    </a-form-item>

    <a-form-item label="Hidden LSTM Layers">
      <a-input
        type="number"
        :min="0"
        :max="10"
        v-decorator="[
          'layers',
          {
            initialValue: 4,
            rules: [
              { required: true, message: 'Please fill the layers amount.' }
            ]
          }
        ]"
      />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">
        Start training
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'TrainingForm',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'trainingForm' })
    };
  },
  methods: {
    setTraining(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('start', values);
        }
      });
    }
  }
};
</script>
