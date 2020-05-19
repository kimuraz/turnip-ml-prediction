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
        min="0.01"
        max="1"
        step="0.01"
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
        :max="50"
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

    <a-form-item label="Dataset">
      <a-select
        v-decorator="[
          'datasetId',
          { rules: [{ required: true, message: 'Please choose a dataset' }] }
        ]"
      >
        <a-select-option
          v-for="dataset in datasets"
          :key="dataset.id"
          :value="dataset.id"
        >
          {{ dataset.name || `? (${dataset.id})` }}
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">
        Start training
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { loadDatasetList } from '@/utils/api';

export default {
  name: 'TrainingForm',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'trainingForm' }),
      datasets: []
    };
  },
  async created() {
    this.datasets = await loadDatasetList();
  },
  methods: {
    setTraining(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('start', values);
        }
      });
    }
  }
};
</script>
