import { defineStore } from 'pinia';
import { apiUdiControlAxios, apiUseDevControl } from '../api/index';
import { apiGetNowTime } from '../componentApi/index';
export const useUdiControlStore = defineStore('udiControlStore', () => {
  const udiControlAction = async (params) => {
    try {
      console.log('------------------------------------------------');
      console.log('-- store ::: useUdiControlStore');
      console.log('-- udiControlAction() start ::: ' + apiGetNowTime());
      const res = await apiUdiControlAxios(params);
      console.log('-- Table length ::: ' + res.data.data.length);
      console.log('-- data error ::: ' + res.data.msg);
      console.log('-- udiControlAction() end ::: ' + apiGetNowTime());
      console.log('------------------------------------------------');
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const udiDevControlStateAction = async (params) => {
    try {
      const res = await apiUseDevControl();
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    udiControlAction,
    udiDevControlStateAction
  };
});
