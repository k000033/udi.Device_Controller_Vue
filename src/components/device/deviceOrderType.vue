<script setup>
import { computed } from 'vue';
import {
  apiUseVarious,
  apiUseSystemUdiState,
  apiUseUdiControl,
  apiUseShowMessage
} from '../../componentApi/index';
const { repairState } = apiUseSystemUdiState();
const { uploadOrderAction } = apiUseUdiControl();
const { openElMessage } = apiUseShowMessage();
const { deviceOrderTypeList, deviceStateList } = apiUseVarious();
const second = ref(3);
const pauseUploadOrder = ref(false);
const props = defineProps({
  deviceList: {
    type: Object,
    default() {
      return {};
    }
  }
});
// 依照設備顯視指示的清單
const orderTypeList = computed(() => {
  const orderTypeList = deviceOrderTypeList.value.filter(
    (x) => x.DEVICE_ID == props.deviceList.DEVICE_ID
  );
  return orderTypeList;
});

// 取得目前設備資訊
const deviceInfo = computed(() => {
  const deviceInfo = deviceStateList.value.find(
    (x) => x.DEVICE_ID == props.deviceList.DEVICE_ID
  );
  return deviceInfo;
});

// 取得目前設備狀態
const deviceStatus = computed(() => {
  if (!deviceInfo.value) {
    return false;
  }
  return deviceInfo.value.STATE == 1 ? true : false;
});

// 顯示正在執行的燈號
const light = (type, light) => {
  if (deviceInfo.value) {
    return type == deviceInfo.value.BREATHING_ORDER
      ? deviceInfo.value.BREATHING_LIGHT
      : light;
  }
  return light;
};
// 顯示錯誤的燈號
const alarm = (type, alarm) => {
  if (deviceInfo.value) {
    return type == deviceInfo.value.BREATHING_ORDER
      ? deviceInfo.value.BREATHING_ALARM
      : alarm;
  }
  return alarm;
};

// 顯示 修復的ICON
const repaire = (type, alarma) => {
  if (deviceInfo.value) {
    return alarm(type, alarma) == '#E00' ? true : false;
  }
  return true;
};

// 手動排除
const confirmEvent = async () => {
  const deviceId = props.deviceList.DEVICE_ID;

  const deciveState = deviceStateList.value.find(
    (x) => x.DEVICE_ID == deviceId
  );
  const orderId = deciveState.ORDER_ID;
  await repairState(deviceId, orderId);
};

// 重下指示
const uploadOrder = async (type) => {
  // 倒數秒數重製
  second.value = 3;
  const deviceId = props.deviceList.DEVICE_ID;
  const orderId = deviceInfo.value.ORDER_ID;
  const res = await uploadOrderAction(deviceId, orderId, type);
  if (res.data.data[0].RTN_CODE == 1) {
    // 錯誤訊息
    openElMessage(res.data.data[0].RTN_MSG, 'error');
  } else {
    // 成功
    openElMessage('已重下指令', 'success');
    // 顯示秒數
    pauseUploadOrder.value = true;
    // 執行 timer ，倒數秒數
    const timer = setInterval(() => {
      second.value--;
      // 當 0 秒時， 清除 timer
      if (second.value == 0) {
        pauseUploadOrder.value = false;
        clearInterval(timer);
      }
    }, 1000);
  }
};
</script>

<template>
  <div class="tw-divide-y tw-divide-slate-600 tw-py-2 tw-px-2">
    <div
      v-for="item in orderTypeList"
      :key="item.TYPE"
      class="tw-px-2 tw-py-1 tw-flex tw-flex-row tw-items-center tw-gap-2"
    >
      <!-- 手動上傳指示 -->
      <div
        v-if="item.ALLOW_ORDER == 1 && deviceStatus"
        class="tw-flex tw-items-center tw-relative tw-w-[20px] tw-h-[20px]"
      >
        <el-icon
          v-show="!pauseUploadOrder"
          size="20"
          color="#409eff"
          class="tw-cursor-pointer"
          @click="uploadOrder(item.TYPE)"
          ><UploadFilled
        /></el-icon>
        <!-- 倒數 -->
        <div
          v-show="pauseUploadOrder"
          class="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-text-cente tw-flex tw-justify-center tw-items-center tw-text-slate-300"
        >
          <span class="tw-font-bold">{{ second }}</span>
        </div>
      </div>
      <!-- 指示名稱 -->
      <div class="tw-flex-grow tw-text-right tw-mr-[1px]">
        <span class="tw-text-[#dcddde] tw-text-sm">{{ item.NAME }}</span>
      </div>
      <!-- 燈號 -->
      <div class="tw-flex tw-items-center tw-ml-auto tw-gap-3">
        <!-- 綠燈 -->
        <div
          class="tw-w-14 tw-h-[16px] tw-rounded tw-ring-2 tw-ring-offset-0 tw-ring-black tw-shadow-inner tw-shadow-black/30"
          :style="[{ background: light(item.TYPE, item.BREATHING_LIGHT) }]"
        ></div>
        <!-- 紅燈 -->
        <div
          id="alarmTip"
          class="tw-w-14 tw-h-[16px] tw-rounded tw-ring-2 tw-overflow-hidden tw-ring-offset-0 tw-ring-black tw-shadow-inner tw-shadow-black/30"
          :style="[{ background: alarm(item.TYPE, item.BREATHING_ALARM) }]"
        >
          <el-popconfirm
            :disabled="!repaire(item.TYPE, item.BREATHING_ALARM)"
            :hide-icon="true"
            :hide-after="100"
            @confirm="confirmEvent"
          >
            <template #reference>
              <div class="tw-h-full">
                <SvgIcon
                  v-if="repaire(item.TYPE, item.BREATHING_ALARM)"
                  class="tw-cursor-pointer hover:tw-bg-red-900"
                  name="repaire"
                  color="#dcddde"
                />
              </div>
            </template>
            <template #actions="{ confirm, cancel }">
              <div class="tw-flex !tw-justify-center">
                <el-button size="small" @click="confirm">排除</el-button>
              </div>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>
