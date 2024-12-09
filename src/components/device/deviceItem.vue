<script setup>
import { computed, reactive } from 'vue';
import {
  apiUseVarious,
  apiUseUdiEnabled,
  apiUseUdiControl
} from '../../componentApi/index.js';
import { InfoFilled } from '@element-plus/icons-vue';
// 表示設備 switch 開關的狀態
const switchOpenDevice = ref('1');
// 是否解鎖
const lock = ref(true);
const props = defineProps({
  deviceList: {
    type: Object,
    default() {
      return {};
    }
  }
});
const { getOrderList } = apiUseUdiControl();
const { deviceStateList, openSelectOrderIdDialog, orderIdList } =
  apiUseVarious();
const { setEnabledAction } = apiUseUdiEnabled();

// 取得目前設備開關狀態
const deviceState = computed(() => {
  const deviceInfo = deviceStateList.value.find(
    (x) => x.DEVICE_ID == props.deviceList.DEVICE_ID
  );

  if (deviceInfo) {
    deviceInfo.MEMO = props.deviceList.DESCRIPTION;
  }

  return deviceInfo;
});

// 設定 設備ICON的顏色 1.開啟中，2.關閉中，其他.處理中
const color = computed(() => {
  if (!deviceState.value) {
    return '#030';
  }
  switch (deviceState.value.STATE) {
    case 2: // 關閉
      switchOpenDevice.value = '0'; // 顯示開關是關閉
      return '#030';
    case 1: // 開啟
      switchOpenDevice.value = '1'; // 顯示開關是開啟
      return '#0e0';
    default: // 處理中
      return 'yellow';
  }
});

// 切換批次開關
const switch_change = async (x) => {
  const enabled = switchOpenDevice.value;
  const deviceId = props.deviceList.DEVICE_ID;
  const orderId = deviceState.value.ORDER_ID;
  await setEnabledAction(deviceId, orderId, enabled);
  lock.value = true;
};

// 切換批次解鎖
const switchLock = async () => {
  lock.value = !lock.value;
};

// 確認解鎖視窗，按下確定解鎖
const confirmEvent = () => {
  lock.value = !lock.value;
};

// 切換批次，跳出選擇批次的 Dialog
const switchOrderId = async () => {
  const res = await getOrderList(props.deviceList.DEVICE_ID);
  orderIdList.value = res.data.data;
  openSelectOrderIdDialog.value = true;
};
</script>

<template>
  <div class="tw-flex tw-px-6 tw-py-2 tw-justify-center tw-relative">
    <div class="tw-flex tw-flex-col tw-items-center tw-relative">
      <!-- 設備名稱 -->
      <div class="tw-text-[#dcddde] tw-text-xl">
        <span>{{ props.deviceList.DEVICE_ID }}</span>
      </div>
      <!-- 波次 -->
      <div
        v-if="deviceState"
        class="tw-absolute tw-top-[65px] tw-text-[#dcddde]"
      >
        <span>{{ deviceState.DESCRIPTION }}</span>
      </div>
      <!-- 批次 -->
      <div
        v-if="deviceState"
        class="tw-text-[#dcddde] tw-absolute tw-top-[96px] tw-z-40"
      >
        <!-- 選擇批次 -->
        <el-button
          v-if="deviceState"
          size="small"
          color="black"
          :round="true"
          @click="switchOrderId"
          :disabled="deviceState.STATE != 2"
          :title="deviceState.MEMO"
          >{{ deviceState.ORDER_ID }}</el-button
        >
      </div>

      <el-icon class="tw-z-0 device_icon" size="150" :color="color">
        <Monitor
      /></el-icon>
      <template v-if="deviceState">
        <div class="tw-flex tw-items-center tw-gap-3">
          <div class="tw-flex tw-items-center tw-justify-center">
            <!-- 鎖住的ICON -->
            <el-popconfirm
              v-if="lock"
              confirm-button-text="Yes"
              cancel-button-text="No"
              :hide-icon="true"
              @confirm="confirmEvent"
            >
              <template #reference>
                <el-icon size="25" color="#ff4949"><Lock /></el-icon>
              </template>
              <template #actions="{ confirm, cancel }">
                <div class="tw-flex !tw-justify-center">
                  <el-button size="small" @click="confirm">解鎖</el-button>
                  <el-button size="small" @click="cancel">取消</el-button>
                </div>
              </template>
            </el-popconfirm>
            <!-- 解鎖的ICON -->
            <el-icon v-if="!lock" size="25" color="#13ce66" @click="switchLock"
              ><Lock
            /></el-icon>
          </div>
          <!-- 開關 -->
          <el-switch
            v-model="switchOpenDevice"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            active-value="1"
            inactive-value="0"
            active-text="開"
            inactive-text="關"
            :disabled="lock"
            size="large"
            @change="switch_change()"
          />
        </div>
      </template>
    </div>
  </div>
</template>
