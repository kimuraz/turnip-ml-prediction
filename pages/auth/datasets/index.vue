<template>
  <main>
    <h1>Datasets</h1>

    <section>
      <h3>Dataset supported format:</h3>
      <code class="format-code">
        <pre>
        {{ datasetFormat }}
        </pre>
      </code>

      <section class="uploads">
        <a-upload :default-file-list="fileList" @change="handleChange">
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Datasets',
  middleware: 'needsAuth',
  data() {
    return {
      fileList: [],
      datasetFormat:
        '[ { "buyingPrice": 94, sellingPrices:[[ 64, 65 ], [ 84, 72 ], [ 71, 70 ],[ 88, 96 ],[ 120, 189 ],[ 60, 53 ]] } ] '
    };
  },
  methods: {
    handleChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        this.fileList.push(file);
      }
    }
  }
};
</script>

<style lang="scss">
.format-code {
  > pre {
    background-color: #e6f7ff;
    border: 1px solid #ddd;
    color: #666;
    page-break-inside: auto;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    overflow: auto;
    padding: 10px 50px;
    display: block;
    word-wrap: break-word;
  }
}
.uploads {
  margin-top: 20px;
  width: 500px;
}
</style>
