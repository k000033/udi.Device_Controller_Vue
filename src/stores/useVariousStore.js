import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useVariousStore = defineStore('variousStore', () => {
  const deviceStateList = ref([]);
  const deviceList = ref([]);
  const openSelectOrderIdDialog = ref(false);
  const orderIdList = ref([]);
  const deviceOrderTypeList = ref([]);
  const deviceProfile = ref([]);
  const udiBreathing = ref(''); // udi 呼吸燈
  const showElMessage = ref(false); // 顯示訊息
  const orderInstructions = ref([]);
  const selectOrder = ref({
    device: '',
    orderID: '',
    description: ''
  });
  const recycle = ref([]);
  const resultDocsCondition = ref({
    deviceIdList: [],
    orderIdList: [],
    sltDeviceId: '',
    sltOrderId: '',
    resultData: []
  });

  return {
    deviceStateList,
    deviceList,
    openSelectOrderIdDialog,
    orderIdList,
    deviceOrderTypeList,
    deviceProfile,
    udiBreathing,
    showElMessage,
    orderInstructions,
    selectOrder,
    recycle,
    resultDocsCondition
  };
});
