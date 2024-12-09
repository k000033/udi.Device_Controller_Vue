<script setup>
const props = defineProps({
  deviceList: {
    type: Object,
    default() {
      return {};
    }
  }
});

const { HOST_IP, BRAND, VERSION, MODEL } = props.deviceList;
</script>

<template>
  <div class="tw-text-sm tw-divide-y tw-divide-slate-600 tw-py-2 tw-px-2">
    <el-popover placement="right" :width="300" trigger="click">
      <template #reference>
        <el-icon size="20" color="#fff" class="tw-absolute tw-right-3 tw-top-3"
          ><InfoFilled
        /></el-icon>
      </template>
      <!-- MODEL -->
      <div
        class="tw-text-[#dcddde] tw-px-2 tw-py-1 tw-flex tw-flex-row tw-items-center tw-gap-3 tw-text-sm"
      >
        <div class="tw-text-right tw-w-16"><span>MODEL</span></div>
        <div class="">
          <span>{{ MODEL }}</span>
        </div>
      </div>
      <!-- HOST_IP -->
      <div
        class="tw-text-[#dcddde] tw-px-2 tw-py-1 tw-flex tw-flex-row tw-items-center tw-gap-3"
      >
        <div class="tw-text-right tw-w-16"><span>HOST_IP</span></div>
        <div class="">
          <span>{{ HOST_IP }}</span>
        </div>
      </div>
      <!-- BRAND -->
      <div
        class="tw-text-[#dcddde] tw-px-2 tw-py-1 tw-flex tw-flex-row tw-items-center tw-gap-3"
      >
        <div class="tw-text-right tw-w-16"><span>BRAND</span></div>
        <div class="">
          <span>{{ BRAND }}</span>
        </div>
      </div>
      <!-- VERSION -->
      <div
        class="tw-text-[#dcddde] tw-px-2 tw-py-1 tw-flex tw-flex-row tw-items-center tw-gap-3"
      >
        <div class="tw-text-right tw-w-16"><span>VERSION</span></div>
        <div class="">
          <span>{{ VERSION }}</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>
