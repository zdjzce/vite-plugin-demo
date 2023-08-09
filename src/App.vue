<template>
  <div>
    {{testRef.test}}
    <SvgTest />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import test from 'virtual:module'
import env from 'virtual:env'
import SvgTest from '@/assets/vue.svg?component'

const testRef = ref(test) as { test: string };

onMounted(() => {
  console.log('virtual env=====', env)
})


</script>

<style scoped>
</style>
