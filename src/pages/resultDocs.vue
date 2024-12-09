<script setup>
import { onMounted } from 'vue';
import { apiUseUdiControl, apiUseVarious } from '../componentApi/index';
const { getResultDocsCondition, getResultDocs } = apiUseUdiControl();
const { resultDocsCondition } = apiUseVarious();

const search = () => {
  if (
    resultDocsCondition.value.sltDeviceId == '' &&
    resultDocsCondition.value.sltOrderId == ''
  ) {
    return;
  }
  window.resultDocsGridApi.showLoadingOverlay();
  getResultDocs();
};

onMounted(() => {
  getResultDocsCondition();
});
</script>

<template>
  <div
    id="resultDocs"
    class="tw-bg-black tw-px-4 tw-h-full tw-py-4 tw-overflow-auto"
  >
    <div class="tw-h-full">
      <div class="tw-flex tw-items-center tw-gap-4">
        <div class="tw-flex tw-items-center tw-gap-2">
          <span class="tw-text-white">批次</span>
          <el-select
            v-model="resultDocsCondition.sltOrderId"
            placeholder=""
            size="small"
            style="width: 140px"
            popper-class="resultPopper"
          >
            <el-option
              v-for="item in resultDocsCondition.orderIdList"
              :key="item.ORDER_ID"
              :label="item.ORDER_ID"
              :value="item.ORDER_ID"
            />
          </el-select>
        </div>
        <div class="tw-flex tw-items-center tw-gap-2">
          <span class="tw-text-white">設備</span>
          <el-select
            v-model="resultDocsCondition.sltDeviceId"
            placeholder=""
            size="small"
            style="width: 140px"
            popper-class="resultPopper"
          >
            <el-option
              v-for="item in resultDocsCondition.deviceIdList"
              :key="item.OBJECT_ID"
              :label="item.OBJECT_ID"
              :value="item.OBJECT_ID"
            />
          </el-select>
        </div>
        <div>
          <div>
            <el-button class="tw-bg-[#303133]" color="black" @click="search"
              >選擇</el-button
            >
          </div>
        </div>
      </div>
      <div class="tw-mt-4 tw-h-[calc(100%-50px)]">
        <resultDocsAgGrid />
      </div>
    </div>
  </div>
</template>

<style>
#resultDocs :deep(.el-popper) {
  background-color: #fff !important;
}
</style>
