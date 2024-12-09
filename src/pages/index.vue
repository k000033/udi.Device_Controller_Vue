<script setup>
import { apiUseUdiControl, apiUseVarious } from '../componentApi/index.js';
const { getDevControlState } = apiUseUdiControl();
const { deviceList } = apiUseVarious();

onMounted(async () => {
  getDevControlState();
});
</script>

<template>
  <div class="tw-bg-black tw-px-4 tw-h-full tw-py-4 tw-overflow-auto">
    <div id="deviceList">
      <ul class="tw-flex tw-gap-4">
        <li
          v-for="item in deviceList"
          :key="item.ID"
          class="tw-bg-black tw-w-[305px] tw-rounded-lg"
        >
          <div class="tw-bg-[#2c3135] tw-rounded-lg tw-relative">
            <deviceItem :deviceList="item" />
            <deviceInfo
              :deviceList="item"
              class="tw-absolute tw-right-1 tw-top-0"
            />
          </div>

          <!-- <div class="tw-bg-[#2c3135] tw-mt-2 tw-rounded-lg">
            <deviceInfo :deviceList="item" />
          </div> -->

          <div class="tw-bg-[#2c3135] tw-mt-2 tw-rounded-lg">
            <deviceWoRate :deviceList="item" />
          </div>
          <div class="tw-bg-[#2c3135] tw-mt-2 tw-rounded-lg">
            <deviceQtyRate :deviceList="item" />
          </div>
          <div class="tw-bg-[#2c3135] tw-mt-2 tw-rounded-lg">
            <deviceOrderType :deviceList="item" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
