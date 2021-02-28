import Vue from 'vue';
import TinymceUpload from '@/components/Tinymce/TinymceUpload';

(function () {
  const global = tinymce.util.Tools.resolve('tinymce.PluginManager');
  const register = function (editor) {
    editor.addCommand('beHeader', () => {});
  };
  const Commands = {
    register,
  };
  // 图片按钮事件
  function uploadEvent(editor) {
    const loader = new Vue({
      render: (h, con) => h(TinymceUpload, {
        props: {
          panelShow: true,
        },
        on: {
          hidePanel() { // 关闭上传工具弹框
            document.body.removeChild(content.$el);
            content = null;
            loader.$destroy();
          },
          successUpload(imgList) { // 获得上传完成回调
            imgList.forEach((item, key) => {
              if (item !== undefined) {
                editor.focus();
                const idName = `${new Date().getTime()}-${key}`; // 给每个图片都加上一个id 时间戳加索引保证图片id唯一 加上id是为了方便后面操作，例如给插入的图片加上编辑按钮
                editor.selection.setContent(editor.dom.createHTML('img', {
                  src: item,
                  id: idName,
                }));
              }
            });
          },
        },
      }),
    });

    let content = loader.$mount();
    document.body.appendChild(content.$el);
  }
  const register$1 = function (editor) {
    // 内有行级元素 需要加上font-size:0
    editor.ui.registry.addIcon('upload', '<div class="iconBox" style="font-size:0" ><img class=editIcon src="http://placehold.it/24x24" /></div>');
    editor.ui.registry.addButton('uploadImg', {
      icon: 'upload',
      tooltip: 'uploadImg',
      onAction() {
        uploadEvent(editor);
      },
    });
    editor.ui.registry.addMenuItem('uploadImg', {
      icon: 'upload',
      text: 'uploadImg',
      onAction() {
        uploadEvent(editor);
      },
    });
  };
  const Buttons = {
    register: register$1,
  };

  function Plugin() {
    global.add('uploadImg', (editor) => {
      Commands.register(editor);
      Buttons.register(editor);
    });
  }
  Plugin();
}());
