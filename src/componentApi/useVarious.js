import { storeToRefs } from 'pinia';
import { useVariousStore } from '../stores/useVariousStore';

export const useVarious = () => {
  const variousStore = useVariousStore();
  const {
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
  } = storeToRefs(variousStore);

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
};
