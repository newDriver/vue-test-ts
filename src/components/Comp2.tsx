import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Comp2 extends Vue {
  foo = 'hello, tsx!!'
    
  render() {
      return <div>{this.foo}</div>
  }
}