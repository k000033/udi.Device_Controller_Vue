<script setup>
import { AgGridVue } from 'ag-grid-vue3';
import { apiUseUdiControl, apiUseVarious } from '../../componentApi/index';
import { onUnmounted, watch } from 'vue';
const { getOrderInstructions } = apiUseUdiControl();
const { orderInstructions, deviceStateList } = apiUseVarious();

const columnDefs = [
  {
    headerName: 'GUID',
    field: 'GUID',
    sortable: true,
    width: '80px',
    hide: true
  },
  {
    headerName: '設備',
    field: 'OBJECT_ID',
    sortable: true,
    filter: 'agSetColumnFilter',
    width: '80px'
  },
  {
    headerName: '單號',
    field: 'ORDER_ID',
    sortable: true,
    width: '120px'
  },
  {
    headerName: '指令別',
    field: 'ORDER_NAME',
    filter: 'agSetColumnFilter',
    sortable: true,
    width: '180px'
  },
  {
    headerName: '執行狀態',
    field: 'STATUS_NAME',
    sortable: true,
    width: '100px'
  },
  {
    headerName: '發起時間',
    field: 'ORDER_TIME',
    sortable: true,
    width: '180px'
  },
  {
    headerName: '處理起時',
    field: 'LAUNCH_TIME',
    sortable: true,
    width: '180px'
  },
  {
    headerName: '處理迄時',
    field: 'DONE_TIME',
    sortable: true,
    width: '180px'
  },
  {
    headerName: '執行時間',
    field: 'DURING',
    sortable: true,
    width: '120px'
  },
  {
    headerName: '異常次數',
    field: 'ERROR_TIMES',
    sortable: true,
    width: '120px'
  },
  {
    headerName: '異常狀況排除紀錄',
    field: 'ERROR_FIXED',
    sortable: true,
    width: '150px'
  },
  {
    headerName: '錯誤訊息',
    field: 'ERROR_MSG',
    sortable: true,
    minWidth: 500,
    flex: 1
  }
];

const getRowId = (x) => {
  return x.data.GUID;
};

const defaultColDef = {
  cellDataType: false,
  resizable: true
};
const onGridReady = (params) => {
  window.gridApi = params.api;
  window.gridColumnApi = params.columnApi;
  params.api.getToolPanelInstance('filters').expandFilters();
};

const getRowStyle = (param) => {
  return { color: param.data.LIGHT_COLOR };
};

onMounted(() => {
  getOrderInstructions();
});

watch(deviceStateList, () => {
  getOrderInstructions();
});

const localeText = {
  page: '頁',
  more: '更多',
  to: '到',
  of: '的',
  next: '下一頁',
  last: '最後一頁',
  first: '第一頁',
  previous: '上一頁',
  loadingOoo: '加載中...',
  noRowsToShow: '沒有可顯示的行',
  filterOoo: '過濾器...',
  applyFilter: '應用過濾器',
  equals: '等於',
  notEqual: '不等於',
  lessThan: '小於',
  greaterThan: '大於',
  contains: '包含',
  notContains: '不包含',
  startsWith: '開始於',
  endsWith: '結束於',
  selectAll: '全選'
};
</script>

<template>
  <div class="tw-h-full">
    <ag-grid-vue
      style="width: 100%; height: 100%"
      class="ag-theme-quartz-dark"
      :columnDefs="columnDefs"
      :rowData="orderInstructions.data"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      animateRows="true"
      :getRowId="getRowId"
      sideBar="filters"
      :getRowStyle="getRowStyle"
      :localeText="localeText"
    >
    </ag-grid-vue>
  </div>
</template>
