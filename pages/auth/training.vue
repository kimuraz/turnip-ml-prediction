<template>
  <main>
    <h1>Training</h1>

    <section class="half">
      <a-button @click="toggleVis">Toggle visor</a-button>
      <br />
      <training-form @start="train" />
    </section>
  </main>
</template>

<script>
import TrainingForm from '@/components/training/TrainingForm';
import { loadDataset } from '@/utils/api';

let tf, tfvis;
if (process.client) {
  tf = require('@tensorflow/tfjs');
  tfvis = require('@tensorflow/tfjs-vis');
}

export default {
  name: 'Training',
  components: {
    TrainingForm
  },
  data() {
    return {
      model: null,
      loading: null
    };
  },
  methods: {
    async train(e) {
      try {
        this.loading = this.$message.loading('Action in progress..', 0);
        this.model = null;
        const { epochs, layers, rate, datasetId } = e;

        const lstmLayers = [];

        this.model = tf.sequential();

        // 12 is the number of days of the week * 2 minus Sunday
        this.model.add(
          tf.layers.dense({
            inputShape: [1],
            units: 12,
            useBias: true
          })
        );

        this.model.add(tf.layers.dense({ units: 12, useBias: true }));

        for (let i = 0; i < layers; i += 1) {
          lstmLayers.push(tf.layers.lstmCell({ units: 12 }));
        }

        const dataset = await loadDataset(datasetId);

        const { x, y } = dataset;

        const xTensor = tf.tensor2d(x, [x.length, 12]);
        const yTensor = tf.tensor2d(y, [y.length, 1]);

        const { xs, ys } = this.normalize(xTensor, yTensor);

        xs.print();
        ys.print();

        this.model.compile({
          optimizer: tf.train.adam(rate),
          loss: tf.losses.meanSquaredError,
          metrics: ['mse']
        });

        await this.model.fit(ys, xs, {
          batchSize: 1,
          epochs,
          callbacks: tfvis.show.fitCallbacks(
            { name: 'Training performance', tab: 'Training' },
            ['loss', 'mse'],
            { height: 200, callbacks: ['onEpochEnd'] }
          )
        });
      } catch (err) {
        console.log(err);
        alert(err.toString());
      } finally {
        this.loading();
      }
    },
    toggleVis() {
      tfvis.visor().isOpen() ? tfvis.visor().close() : tfvis.visor().open();
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

<style lang="scss">
.half {
  width: 50%;
}
</style>
