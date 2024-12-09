import { apiSystemUdiStateParams } from '../api/index';
import { useSystemUdiStateStore } from '../stores/useSystemUdiStateStore';

export const useSystemUdiState = () => {
  const systemUdiStateStore = useSystemUdiStateStore();
  const { systemUdiStateAction } = systemUdiStateStore;
  const systemUdiStateParams = new apiSystemUdiStateParams();

  // 排除錯誤
  const repairState = async (diviceId, orderId) => {
    systemUdiStateParams.initialParams();
    systemUdiStateParams.DEVICE_ID = diviceId;
    systemUdiStateParams.ORDER_ID = orderId;
    const res = await systemUdiStateAction(systemUdiStateParams);
    return res;
  };

  return { repairState };
};
