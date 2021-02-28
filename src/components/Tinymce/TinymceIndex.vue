<template>
  <div>
    <editor  id="tinymce" v-model="editValue" :init="init"></editor>
  </div>
</template>
<script>

import tinymce from 'tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver/theme';

import '../../assets/js/tinymce_zh_CN';
import '../../assets/plugins/uploadImg';

export default {
  components: {
    Editor,
  },
  data() {
    return {
      editValue: '',
    };
  },
  computed: {
    init() {
      const that = this;
      return {
        language: 'zh_CN',
        height: 300, // 编辑器高度
        //  browser_spellcheck: true, // 拼写检查
        branding: false, // 水印
        menubar: false, // 顶部菜单栏显示
        plugins: ' uploadImg', // 插件
        toolbar: 'undo redo | uploadImg ', // 顶部排版
        // 渲染前回调
        setup(editor) {
          editor.on('blur', () => {
            that.$emit('calltext', that.editValue);
          });
        },
      };
    },
  },
  mounted() {
    tinymce.init({});
  },
};
</script>
<style lang="scss" scoped>

</style>
