import { defineStore } from 'pinia';
import { apiUdiEnabledAxios } from '../api/index';
import { apiGetNowTime } from '../componentApi/index';

export const useUdiEnableStore = defineStore('udiEnableStore', () => {
  const udiEnabledAction = async (params) => {
    try {
      console.log('------------------------------------------------');
      console.log('-- store ::: useUdiEnableStore');
      console.log('-- udiEnabledAction() start ::: ' + apiGetNowTime());
      const res = await apiUdiEnabledAxios(params);
      console.log('-- Table length ::: ' + res.data.data.length);
      console.log('-- data error ::: ' + res.data.msg);
      console.log('-- udiEnabledAction() end ::: ' + apiGetNowTime());
      console.log('------------------------------------------------');
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return { udiEnabledAction };
});
