<script setup>
import { AgGridVue } from 'ag-grid-vue3';
import { apiUseUdiControl, apiUseVarious } from '../../componentApi/index';
import { computed } from 'vue';
const { getOrderInstructions } = apiUseUdiControl();
const { resultDocsCondition } = apiUseVarious();

const agGridData = computed(() => {
  return resultDocsCondition.value.resultData.data
    ? resultDocsCondition.value.resultData.data
    : [];
});
const autoGroupColumnDef = ref(null);
const grandTotalRow = ref(null);

const columnDefs = [
  {
    rowGroup: true,
    headerName: '工單',
    field: 'WO_ID',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '160px'
  },
  {
    headerName: '設備',
    field: 'OBJECT_ID',
    sortable: true,
    filter: 'agTextColumnFilter',
    width: '120px'
  },
  {
    headerName: '品項',
    field: 'ITEM_ID',
    sortable: true,
    filter: 'agTextColumnFilter',
    width: '120px'
  },
  {
    headerName: '門市',
    field: 'SITE_ID',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '120px'
  },
  {
    headerName: '數量',
    field: 'QTY',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '140px',
    cellStyle: { 'text-align': 'right' },
    aggFunc: 'sum'
  },
  {
    headerName: '重量',
    field: 'WEIGHT',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '140px',
    cellStyle: { 'text-align': 'right' }
  },
  {
    headerName: '條碼',
    field: 'ITEMBARCODE',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '200px'
  },
  {
    headerName: '回收時間',
    field: 'CRT_TIME',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '180px'
  }
];

const getRowId = (x) => {
  return `${x.data.IDX}`;
};

const defaultColDef = {
  floatingFilter: true,
  resizable: true
};
const onGridReady = (params) => {
  window.resultDocsGridApi = params.api;
  window.resultDocsGridColumnApi = params.columnApi;
};

const getRowStyle = (param) => {
  if (param.data) {
    return { color: param.data.QTY_TYPE };
  }
};

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

onBeforeMount(() => {
  autoGroupColumnDef.value = {
    minWidth: 300
  };
  grandTotalRow.value = 'bottom';
});
</script>

<template>
  <div id="resultDocsAgGrid" class="tw-h-full">
    <ag-grid-vue
      style="width: 100%; height: 100%"
      class="ag-theme-quartz-dark"
      :columnDefs="columnDefs"
      :rowData="agGridData"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      animateRows="true"
      :getRowId="getRowId"
      :getRowStyle="getRowStyle"
      :localeText="localeText"
      :autoGroupColumnDef="autoGroupColumnDef"
      :grandTotalRow="grandTotalRow"
    >
    </ag-grid-vue>
  </div>
</template>
<style scoped>
#resultDocsAgGrid :deep(.ag-floating-filter-button) {
  display: none !important;
}
</style>
