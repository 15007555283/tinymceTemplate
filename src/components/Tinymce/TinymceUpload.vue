<template>
  <div class="modal-upload" v-if="panelShow" >
    <div class="modal-mask" ></div>
      <div class="model-alert" >
        这是一个上传文件的模态框
      </div>
  </div>
</template>
<script>
export default {
  props: {
    panelShow: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {};
  },
  watch: {
    panelShow: {
      handler(newValue, oldValue) {
        if (newValue && !oldValue) {
          setTimeout(() => { // 模拟上传成功
            this.$emit('successUpload', ['http://placehold.it/100x150/eeee00/000000', 'http://placehold.it/200x350']);
            this.$emit('hidePanel', false);
          }, 1500);
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
%fixed{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.modal-upload{
  .modal-mask{
    @extend %fixed;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 100;
  }
  .model-alert{
    @extend %fixed;
    width: 40%;
    height: 30%;
    background-color: #fff;
    z-index: 101;
    margin: auto;
  }
}
</style>
