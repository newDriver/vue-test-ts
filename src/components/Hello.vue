<template>
  <div>
    {{msg}}
    <div>
      <input type="text" placeholder="输入新特性" @keyup.enter="addFeature" />
    </div>

    <ul>
      <li v-for="f in features" :key="f.id">{{f.name}}</li>
      <li>{{count}}</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { State, Action, Mutation, Getter, namespace } from "vuex-class";

// 通过类约束数据结构
// class Feature {
//     constructor(public id: number, public name: string){}
// }
interface Feature {
  id: number;
  name: string;
}
interface Result<T> {
  ok: 0 | 1;
  data: T[];
}
// 获取特性接口, 泛型函数
function getData<T>(): Promise<Result<T>> {
  const data: any[] = [
    { id: 1, name: "类型注解" },
    { id: 2, name: "类型推论" }
  ];
  return Promise.resolve<Result<T>>({
    ok: 1,
    data
  });
  // return new Promise(resolve => {
  //   resolve({
  //     ok: 1,
  //     data
  //   });
  // });
}

@Component({
  props: {
    msg: {
      type: String,
      default: "msg"
    }
  }
})
export default class Hello extends Vue {
  // Prop里面的是配置项，后面是ts关心部分
  //   @Prop({ default: "msg", required: true }) msg!: string;

  // 没加装饰器，它是正常类属性，会作为data选项
//   State映射状态
  @State('features') features!: Feature[];
  // Getter、State添加到computed选项
  // Action/Mutation添加到methods选项

  @Action('addFeature') addFeatureAction:any;
  @Mutation('addFeature') addFeatureMutation:any;


  constructor() {
    super();
  }

  // 作为声明周期钩子
  async created() {
    // this.features.push({ id: 3, name: "bla" });
    // const result = await getData<Feature>();
    // this.features = result.data;
  }

  // 声明方法将来会加入到methods里面，除了生命周期函数
  // 若不传参，则函数名就是事件名，转换为羊肉串写法
  @Emit()
  addFeature(e: any) {
    // this.features.push({ id: this.features.length + 1, name: e.target.value });
    this.addFeatureAction(e.target.value)
    // e.target.value = "";
    return e.target.value;
  }

  @Watch("msg", {deep: true})
  onMsgChange(val: string, oldVal: any) {
    console.log(val, oldVal);
  }

  @Watch("$route")
  onRouteChange(val) {
    // console.log(val, oldVal);
  }

  //   存取器实现计算属性
  get count() {
    return this.features.length;
  }
}
</script>

<style scoped>
</style>