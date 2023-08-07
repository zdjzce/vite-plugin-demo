<template>
  <div>
    {{testRef.test}}
  </div>
</template>
<script lang="ts" setup>
import test from 'virtual:module'
import { ref } from 'vue';

const testRef = ref(test) as { test: string };


</script>

<style scoped>
</style>
