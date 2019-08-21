<template>
  <div>
    <h2>{{msg}}</h2>
    <div>
      <input type="text" @keydown.enter="addFeature" />
    </div>
    <div v-for="feature in features" :key="feature.id">{{ feature.name }}</div>
    <div>特性总数：{{count}}</div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";

// class Feature {
//   constructor(public id: number, public name: string) {}
// }

export interface Feature {
  id: number;
  name: string;
}

interface Result<T> {
  ok: 0 | 1;
  data: T[];
}

function getData<T>(): Promise<Result<T>> {
  const data: any[] = [
    { id: 1, name: "类型注解" },
    { id: 2, name: "静态类型检测" }
  ];
  // return Promise.resolve<Result<T>>({ok:1, data})
  return new Promise(resolve => resolve({ ok: 1, data }));
}

// @Component({
//   props: {
//     msg: {
//       type: String,
//       default: ""
//     }
//   }
// })

@Component
export default class Hello extends Vue {
  //   括号里面的是给vue写的
  // 下面写给ts
  @Prop({ type: String, default: "" })
  private msg!: string;

  // 属性相当于data中的值
  //   features: string[];
//   private features: Feature[] = [];
  @State
  private features!: Feature[];

  @Action addFeatureAction: any;
  @Mutation addFeatureMutation: any;

  constructor() {
    super();
  }
  // 生命周期直接声明
  private async created() {
    console.log("created");
    // this.features = (await getData<Feature>()).data;
  }

  @Watch("features", {deep: true})
  private msgChange(newVal, oldVal) {
    console.log(newVal, oldVal);
  }

  // 回调函数直接声明
  //   不给Emit传参，表示事件名称是方法名
  @Emit()
  private addFeature(event: any) {
    // const feature = {
    //   id: this.features.length + 1,
    //   name: event.target.value
    // };
    // this.features.push(feature);
    this.addFeatureAction(event.target.value)
    event.target.value = "";
    // 如果没有返回值，形参是事件参数，否则返回值是
    // return feature;
  }

  // 计算属性可以使用getter、setter实现
  get count() {
    return this.features.length;
  }
}
</script>

<style scoped>
</style>