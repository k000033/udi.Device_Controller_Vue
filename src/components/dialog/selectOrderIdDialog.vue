<script setup>
import { apiUseVarious } from '../../componentApi/index';
const {
  openSelectOrderIdDialog,
  orderIdList,
  deviceStateList,
  deviceList,
  selectOrderID
} = apiUseVarious();
const selectedRow = ref(null);

const rowDblclick = (data) => {
  const deciveInfo = deviceStateList.value.find(
    (x) => x.DEVICE_ID == data.DEVICE_ID
  );

  if (deciveInfo) {
    deciveInfo.ORDER_ID = data._ORDER_ID;
    deciveInfo.DESCRIPTION = data.NAME;
    deciveInfo.MEMO = data.DESCRIPTION;
  }
  openSelectOrderIdDialog.value = false;
};

// 單選ROW，紀錄目前所選的ROW
const handleCurrentChange = (currentRowData) => {
  selectedRow.value = currentRowData;
  console.log(selectedRow.value);
};

// 按下選擇按鈕，更換 deviceStateList 對應設備的 批次 以及描述
const selected = () => {
  const data = selectedRow.value;
  // 尋找對應的設備
  const deciveState = deviceStateList.value.find(
    (x) => x.DEVICE_ID == data.DEVICE_ID
  );

  // 如果有找到設備，修改批次名稱，描述
  if (deciveState) {
    deciveState.ORDER_ID = data._ORDER_ID;
    deciveState.DESCRIPTION = data.NAME;
    deciveState.MEMO = data.DESCRIPTION;
  }

  const device = deviceList.value.find((x) => x.DEVICE_ID == data.DEVICE_ID);
  // 修改波次描述
  if (device) {
    device.NAME = data.NAME;
    deviceList.ORDER_ID = data._ORDER_ID;
  }

  // 關閉 Dialog
  openSelectOrderIdDialog.value = false;
};
// 關閉 Dialog
const closeDialog = () => {
  openSelectOrderIdDialog.value = false;
};

const tableRowClassName = (row, rowIndex) => {
  if (row.row.STATE == 2) {
    return 'closed';
  }
};
</script>

<template>
  <el-dialog
    v-model="openSelectOrderIdDialog"
    :show-close="false"
    width="700"
    class="!tw-bg-[#303133]"
  >
    <div
      class="tw-bg-black tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-px-2 tw-py-1 tw-text-white"
    >
      選擇批次
    </div>
    <el-table
      :data="orderIdList"
      v-model:selection="selectedRow"
      :header-cell-style="{
        backgroundColor: '#303133',
        color: '#FFFF',
        fontWeight: 'bold'
      }"
      :cell-style="{ backgroundColor: '#303133', color: '#FFFF' }"
      table-layout="auto"
      :highlight-current-row="true"
      @row-dblclick="rowDblclick"
      @current-change="handleCurrentChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column property="DEVICE_ID" label="date" />
      <el-table-column property="JOB_ID" label="date" />
      <el-table-column property="NAME" label="name" />
      <el-table-column property="DESCRIPTION" label="address" />
    </el-table>
    <div class="tw-border-t tw-pt-4 tw-flex tw-justify-center">
      <el-button color="black" @click="selected">選擇</el-button>
      <el-button color="black" @click="closeDialog">關閉</el-button>
    </div>
  </el-dialog>
</template>
<style scoped></style>
