<template>
  <div class="home">
      <Decor msg="decor msg!!!"></Decor>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="啦啦啦啦" @add-feature="onAdd"/>
    <Comp></Comp>
    <Comp2></Comp2>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Decor from '@/components/Decor.vue'
import Comp from '@/components/Comp.vue'
import Comp2 from '@/components/Comp2.tsx'

export default {
  name: 'home',
  components: {
    HelloWorld,Comp,Comp2,Decor
  },
  methods: {
    onAdd(feature) {
      console.log(feature.name);
      
    }
  }
}
</script>
