<script setup></script>
<template>
  <div class="tw-bg-[#33404a] tw-px-1 tw-py-[2px] tw-w-[94px] tw-rounded-lg">
    <div>
      <span class="tw-text-xs"> <slot name="title"></slot></span>
    </div>
    <div class="tw-text-right">
      <span class="tw-text-xl tw-text-[#a3cff1]">
        <slot name="qty"></slot
      ></span>
    </div>
  </div>
</template>
