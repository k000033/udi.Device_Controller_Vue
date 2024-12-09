<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const pageList = reactive([
  {
    svg: 'device',
    page: '/',
    name: 'index'
  },
  {
    svg: 'data',
    page: 'instructions',
    name: 'instructions'
  },
  {
    svg: 'dataError',
    page: 'dataError',
    name: 'dataError'
  },
  {
    svg: 'resultDocs',
    page: 'resultDocs',
    name: 'resultDocs'
  },
  {
    svg: 'setting',
    page: 'setting',
    name: 'setting'
  }
]);

const pageSwitch = (pageName) => {
  router.push({ path: pageName });
};

const iconColor = (name) => {
  return name == route.name ? '#3b86c7' : '#3a3535';
};
</script>

<template>
  <ul class="tw-bg-black tw-w-14 tw-border-l tw-border-r tw-border-slate-600">
    <li
      v-for="item in pageList"
      :key="item.id"
      class="tw-px-2"
      :class="[
        {
          ' tw-border-r-2  tw-border-[#3b86c7] tw-bg-gradient-to-r tw-from-[#3b86c7]/50 tw-to-black tw-cursor-pointer':
            item.name == route.name
        }
      ]"
      @click="pageSwitch(item.page)"
    >
      <div class="tw-h-16">
        <SvgIcon :name="item.svg" :color="iconColor(item.name)" />
      </div>
    </li>
  </ul>
</template>
