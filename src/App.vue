<template>
  <div>
    {{testRef.test}}
  </div>
</template>
<script lang="ts" setup>
import test from 'virtual:module'
import env from 'virtual:env'
import { onMounted, ref } from 'vue';
const testRef = ref(test) as { test: string };

onMounted(() => {
  console.log('virtual env=====', env)
})


</script>

<style scoped>
</style>
