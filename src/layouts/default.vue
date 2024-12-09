<script setup>
import {
  apiUseDeviceControlSignalR,
  apiUseUdiControl
} from '../componentApi/index';
const { connectionAction } = apiUseDeviceControlSignalR();
const { getDeviceList } = apiUseUdiControl();

onMounted(() => {
  getDeviceList();
  connectionAction();
});
</script>
<template>
  <div>
    <headerTitle />
    <div class="tw-h-[calc(100dvh-45px)] tw-flex">
      <menuList />

      <div class="tw-flex-grow">
        <RouterView />
      </div>
    </div>
  </div>

  <selectOrderIdDialog />
  <recyleDiloag />
</template>

<style scoped></style>
