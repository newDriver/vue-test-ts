<template>
  <div>
      {{msg}}
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

// 装饰器是工厂函数
function Component(options: any) {
  return function(target: any) {
    //   target === Decor
    // const t = new target()
    // t.title
    // 期望返回值是一个vue组件配置对象
    return Vue.extend(options);
  };
}

@Component({
  props: {
    msg: { type: String }
  }
})
export default class Decor extends Vue {}
</script>

<style scoped>
</style>