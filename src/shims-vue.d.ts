// 扩展后缀名.vue
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

import Vue from 'vue'
import {AxiosInstance} from 'axios'

declare module 'vue/types/vue' {
  // 扩展Vue接口
  interface Vue {
    $axios: AxiosInstance
  }
}