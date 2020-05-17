<template>
  <main>
    <h1>Training</h1>

    <section>
      <training-form @start="train" />
    </section>
  </main>
</template>

<script>
import * as tf from '@tensorflow/tfjs';
import TrainingForm from '@/components/training/TrainingForm';
import { loadDataset } from '@/utils/api';

export default {
  name: 'Training',
  components: {
    TrainingForm
  },
  data() {
    return {
      model: null,
      loading: false
    };
  },
  methods: {
    async train(e) {
      this.model = null;
      this.loading = true;
      const { epochs, layers, rate, datasetId } = e;

      const lstmLayers = [];

      this.model = tf.sequential();

      const dataset = await loadDataset(datasetId);

      const { x, y } = dataset;

      // 14 is the number of days of the week
      const xTensor = tf.tensor2d(x, [14, 1]);
      const yTensor = tf.tensor2d(y, [1, 1]);

      const { xs, ys } = this.normalize(xTensor, yTensor);
      this.model.add(
        tf.layers.dense({ inputShape: [14, 1], units: 1, useBias: true })
      );
      this.model.add(tf.layers.dense({ units: 1, useBias: true }));

      for (let i = 0; i < layers; i += 1) {
        lstmLayers.push(tf.layers.lstmCell({ units: 1 }));
      }

      this.model.add(
        tf.layers.rnn({
          cell: lstmLayers,
          inputShape: [14, 1],
          returnSequences: false
        })
      );

      this.model.add(tf.layers.dense({ units: 1, inputShape: [14, 1] }));
      this.model.compile({
        optimizer: tf.train.adam(rate),
        loss: 'meanSquaredError'
      });

      await this.model.fit(xs, ys, {
        batchSize: 3,
        epochs,
        callbacks: {
          onEpochEnd: (epoch, log) => {
            console.log(epoch, log);
            this.loading = false;
          }
        }
      });
    },
    normalize(xTensor, yTensor) {
      const xMax = xTensor.max();
      const xMin = xTensor.min();
      const yMax = yTensor.max();
      const yMin = yTensor.min();

      const normalizedX = xTensor.sub(xMin).div(xMax.sub(xMin));
      const normalizedY = yTensor.sub(yMin).div(yMax.sub(yMin));

      return {
        xs: normalizedX,
        ys: normalizedY,
        xMax,
        xMin,
        yMax,
        yMin
      };
    }
  }
};
</script>
