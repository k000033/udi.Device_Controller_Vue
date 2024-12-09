<script setup>
import { computed } from 'vue';
import { apiUseVarious } from '../../componentApi/index';
const { recycle } = apiUseVarious();

// const openDialog = computed(() => {
//   return recycle.value.RECYCLE_STATE == 1;
// });
const openDialog = computed({
  get() {
    return recycle.value.RECYCLE_STATE == 1;
  },
  set(value) {
    recycle.value.RECYCLE_STATE = value;
  }
});

const progressRate = computed(() => {
  return Math.ceil(
    (recycle.value.RECYCLE_PROGRESSING / recycle.value.RECYCLE_PROGRESS) * 100
  );
});

const status = computed(() => {
  return recycle.value.RECYCLE_PROGRESSING == recycle.value.RECYCLE_PROGRESS
    ? 'success'
    : '';
});
</script>
<template>
  <el-dialog
    v-model="openDialog"
    :show-close="false"
    width="500"
    class="!tw-bg-[#303133]"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :align-center="true"
  >
    <div
      class="tw-bg-black tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-px-2 tw-py-1 tw-text-white"
    >
      系統優化中
    </div>
    <div>
      <span class="tw-text-base tw-text-[#dcddde]"
        >系統檢測發現系統需要優化以提升運作效能</span
      >
    </div>
    <div>
      <span class="tw-text-base tw-text-[#dcddde]"
        >這個動作約需幾分鐘。優化完成後視窗會自動關閉</span
      >
    </div>
    <div class="tw-text-center tw-my-2 tw-text-[#d4b761] tw-h-5">
      <span>{{ recycle.RECYCLE_MESSAGE }}</span>
    </div>
    <el-progress
      :percentage="progressRate"
      :stroke-width="17"
      striped
      striped-flow
      :status="status"
      :duration="10"
    />
  </el-dialog>
</template>
