<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <input type="text" @keyup.enter="addFeature" />
    <div v-for="feature in features" :key="feature.id">{{ feature.name }}</div>
    <p>特性总数：{{count}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
// import axios from "axios";

// 定义特性类，约束数据结构
// class Feature {
//   constructor(public id: number, public name: string) {}
// }
export interface Feature {
  id: number;
  name: string;
}
interface Result<T> {
  ok: 0 | 1;
  data: T;
}
function getData<T>(): Promise<Result<T>> {
  const data: any = [
    { id: 1, name: "类型注解" },
    { id: 2, name: "编译型语言" }
  ];
  return Promise.resolve<Result<T>>({ ok: 1, data });
}

@Component
export default class HelloWorld extends Vue {
  title = 'ts特性'

  @Prop({type:String, required: true}) 
  private msg!: string;

  // data用属性的方式直接声明
  features: Feature[] = [];


  @Watch('title')
  onTitleChange(val: string, oldVal: string) {
    // ....
  }

  // 声明周期
  private async created() {
    // const { ok, data } = await getData<Feature[]>();
    // if (ok) {
    //   this.features = data;
    // }

    // 异步获取
    this.$axios.get<Feature[]>("/api/list").then(res => {
      this.features = res.data;
    });
  }

  @Emit()
  private addFeature(event: KeyboardEvent) {
    // 断言：我确认类型是这个
    // 断言不是类型转换
    const input = event.target as HTMLInputElement;
    const newFeature = { id: this.features.length + 1, name: input.value };
    this.features.push(newFeature);
    input.value = "";
    // return的值作为父级事件参数
    return newFeature
  }

  // 计算属性：存取器
  get count() {
    return this.features.length;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
