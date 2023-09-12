!<script setup>
import {computed} from 'vue'
const prop = defineProps({
  timercount:{type:Number,default:0}
})
const timercountSync = computed(()=>{
  return prop.timercount
})
</script>
<template>
    <div class="flex justify-center items-center h-full text-9xl ">
      {{ timercountSync }}
    </div>
</template>
<style scoped>

</style>