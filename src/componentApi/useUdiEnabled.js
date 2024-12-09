import { useUdiEnableStore } from '../stores/useUdiEnabledStore';
import { apiUdiEnabledParams } from '../api/index';

export const useUdiEnabled = () => {
  const udiEnableStore = useUdiEnableStore();
  const { udiEnabledAction } = udiEnableStore;
  const udiEnabledParams = new apiUdiEnabledParams();

  // 開關動作
  const setEnabledAction = async (deviceId, orderId, enabled) => {
    udiEnabledParams.initialParams();
    udiEnabledParams.DEVICE_ID = deviceId;
    udiEnabledParams.ORDER_ID = orderId;
    udiEnabledParams.ENABLED = enabled;
    const res = await udiEnabledAction(udiEnabledParams);
    return res;
  };

  return { setEnabledAction };
};
