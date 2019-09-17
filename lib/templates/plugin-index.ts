import Vue from 'vue';
import #App# from './#app#';


declare module 'vue/types/vue' {
  interface #App# extends Vue {
    // TODO declare interface
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $#app#: #App#
}
}

export default {
  #app#: new #App#(),

install(vue: typeof Vue, options: any) {
  if (Vue.prototype.$#app# === undefined) {
    Vue.prototype.$#app# = this.#app#;
  }
  this.#app#.$mount(
    document.body.appendChild(document.createElement('div'))
  );
}
};
