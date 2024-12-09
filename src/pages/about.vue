<script setup>
import {
  apiUseDeviceControlSignalR,
  apiUseUdiControl
} from '../componentApi/index.js';
const { connectionAction } = apiUseDeviceControlSignalR();
const { getDeviceList } = apiUseUdiControl();
onMounted(() => {
  connectionAction();
  getDeviceList();
});
</script>

<template>
  <el-button type="primary">Primary</el-button>
</template>

<style></style>
