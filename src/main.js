import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// tinymce 样式文件引入
import 'tinymce/skins/ui/oxide/skin.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
