import { useUdiControlStore } from '../stores/useUdiControlStore';
import { apiUdiControlParams } from '../api/index';
import { apiUseVarious } from '../componentApi/index';
export const useUdiControl = () => {
  // useUdiControlStore
  const udiControlStore = useUdiControlStore();
  const { udiControlAction, udiDevControlStateAction } = udiControlStore;
  const udiControlParams = new apiUdiControlParams();

  const {
    deviceList,
    deviceStateList,
    deviceOrderTypeList,
    deviceProfile,
    orderInstructions,
    resultDocsCondition
  } = apiUseVarious();

  // 取得設備清單
  const getDeviceList = async () => {
    udiControlParams.initialParams();
    const res = await udiControlAction(udiControlParams);
    deviceList.value = res.data.dataSet.Table;
    deviceOrderTypeList.value = res.data.dataSet.Table1;
    deviceProfile.value = res.data.dataSet.Table2;
    console.log(res);
  };

  // 取得批次清單
  const getOrderList = async (orderId) => {
    udiControlParams.initialParams();
    udiControlParams.OBJECT_ID = orderId;
    const res = await udiControlAction(udiControlParams);
    return res;
  };

  // 重下指示
  const uploadOrderAction = async (objectId, orderId, orderType) => {
    udiControlParams.initialParams();
    udiControlParams.OBJECT_ID = objectId;
    udiControlParams.ORDER_ID = orderId;
    udiControlParams.ORDER_TYPE = orderType;
    const res = await udiControlAction(udiControlParams);
    return res;
  };

  // 取得設備目前狀態
  const getDevControlState = async () => {
    const res = await udiDevControlStateAction();
    deviceStateList.value = res.data.data;
  };

  // 取得指示清單
  const getOrderInstructions = async () => {
    udiControlParams.initialParams();
    udiControlParams.VIEW_TYPE = 10;
    const res = await udiControlAction(udiControlParams);
    orderInstructions.value = res.data;
    console.log(res.data);
    return res;
  };

  // 取得實績文字檔需要的條件
  const getResultDocsCondition = async () => {
    udiControlParams.initialParams();
    udiControlParams.VIEW_TYPE = 20;
    const res = await udiControlAction(udiControlParams);
    resultDocsCondition.value.orderIdList = res.data.dataSet.Table;
    resultDocsCondition.value.deviceIdList = res.data.dataSet.Table1;
  };

  // 取得實績文字檔
  const getResultDocs = async () => {
    udiControlParams.initialParams();
    udiControlParams.VIEW_TYPE = 20;
    udiControlParams.ORDER_ID = resultDocsCondition.value.sltOrderId;
    udiControlParams.OBJECT_ID = resultDocsCondition.value.sltDeviceId;
    const res = await udiControlAction(udiControlParams);
    console.log(res);
    resultDocsCondition.value.resultData = res.data;
  };

  return {
    getDeviceList,
    getOrderList,
    uploadOrderAction,
    getOrderInstructions,
    getDevControlState,
    getResultDocsCondition,
    getResultDocs
  };
};
