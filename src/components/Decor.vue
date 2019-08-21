<template>
 <div>
   {{msg}}
 </div>
</template>

<script lang='ts'>
import { Prop, Vue } from 'vue-property-decorator';

function Component(options: any) {
    return function(target: Function) {

        // options.data = function() {
        //     return {
        //         features:[]
        //     }
        // }

        return Vue.extend(options)
    }
}

@Component({
    props: {
        msg: {
            type: String,
            default: ''
        }
    }
})
export default class Decor extends Vue {
  features: string[] = [];
}
</script>

<style scoped>
</style>