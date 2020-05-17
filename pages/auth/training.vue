<template>
  <main>
    <h1>Training</h1>

    <section>
      <training-form @start="train" />
    </section>
  </main>
</template>

<script>
import * as tf from '@tensorflow/tfjs'
import TrainingForm from '@/components/training/TrainingForm'

export default {
  name: 'Training',
  components: {
    TrainingForm
  },
  methods: {
    train(e) {
      const { epochs, layers, rate } = e
    }
  }
}
</script>
