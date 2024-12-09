import {
  udiControlAxios,
  udiEnabledAxios,
  systemUdiStateAxios,
  useDevControl
} from './axiosAciton';
import {
  udiControlParams,
  udiEnabledParams,
  systemUdiStateParams
} from './params';

export const apiUdiControlAxios = udiControlAxios;
export const apiUdiControlParams = udiControlParams;

export const apiUdiEnabledAxios = udiEnabledAxios;
export const apiUdiEnabledParams = udiEnabledParams;

export const apiSystemUdiStateParams = systemUdiStateParams;
export const apiSystemUdiStateAxios = systemUdiStateAxios;

export const apiUseDevControl = useDevControl;
