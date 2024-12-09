<script setup>
import { apiUseVarious } from "../../componentApi/index";
const { deviceProfile, udiBreathing } = apiUseVarious();
const caption = computed(() => {
  return deviceProfile.value.length != 0 ? deviceProfile.value[0].CAPTION : "";
});
</script>

<template>
  <div
    
    v-if="deviceProfile"
    class=" tw-relative tw-px-4 tw-py-2 tw-text-xl tw-border-b tw-border-slate-600 tw-flex tw-items-center tw-gap-2 before:tw-absolute before:tw-top-0 before:tw-left-0 before:tw-right-0 before:tw-bottom-0  before:tw-bg-[url('../assets/img/handerBackground.jpg')]  before:tw-bg-no-repeat before:tw-bg-cover before:tw-bg-bottom before:tw-grayscale"
  >
    <el-icon
      size="27"
      :color="udiBreathing.BREATHING"
      class=" tw-shadow-xl"
      :class="[{ 'tw-shadow-[#0e0]': udiBreathing.BREATHING == '#0E0' }]"
      ><Sunset
    /></el-icon>
    <span class="tw-text-[#d4b761] tw-font-bold tw-text-xl  tw-tracking-wider tw-z-20">{{ caption }}</span>
  </div>
</template>
