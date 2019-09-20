import Vue from 'vue';
import #App# from './#app#';


declare module 'vue/types/vue' {
  interface #App# extends Vue {
    // TODO declare interface
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $#pApp#: #App#
}
}

export default {
  #pApp#: new #App#(),

install(vue: typeof Vue, options: any) {
  if (Vue.prototype.$#pApp# === undefined) {
    Vue.prototype.$#pApp# = this.#pApp#;
  }
  this.#pApp#.$mount(
    document.body.appendChild(document.createElement('div'))
  );
}
};
