<script setup>
import { computed } from 'vue';
import { apiUseVarious } from '../../componentApi/index';
const { deviceStateList } = apiUseVarious();
const props = defineProps({
  deviceList: {
    type: Object,
    default() {
      return {};
    }
  }
});

// 取得目前設備開關狀態
const deviceState = computed(() => {
  const deviceInfo = deviceStateList.value.find(
    (x) => x.DEVICE_ID == props.deviceList.DEVICE_ID
  );
  return deviceInfo;
});
</script>
<template>
  <div class="tw-px-2 tw-py-2">
    <div class="tw-flex tw-gap-1 tw-text-[#dcddde]">
      <rateBlock>
        <template #title> 作業計劃數 </template>
        <template #qty v-if="deviceState">
          {{ deviceState.QTY_ASSIGN.toLocaleString() }}
        </template>
      </rateBlock>

      <rateBlock>
        <template #title> 作業完成數 </template>
        <template #qty v-if="deviceState">
          {{ deviceState.QTY_RESULT.toLocaleString() }}
        </template>
      </rateBlock>

      <rateBlock>
        <template #title> 達成率(%) </template>
        <template #qty v-if="deviceState">
          {{ deviceState.QTY_RATE }}
        </template>
      </rateBlock>
    </div>
  </div>
</template>
