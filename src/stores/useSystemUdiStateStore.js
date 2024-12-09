import { defineStore } from 'pinia';
import { apiSystemUdiStateAxios } from '../api/index';
import { apiGetNowTime } from '../componentApi/index';
export const useSystemUdiStateStore = defineStore('systemUdiStateStore', () => {
  const systemUdiStateAction = async (params) => {
    try {
      console.log('------------------------------------------------');
      console.log('-- store ::: useSystemUdiStateStore');
      console.log('-- systemUdiStateAction() start ::: ' + apiGetNowTime());
      const res = await apiSystemUdiStateAxios(params);
      console.log('-- Table length ::: ' + res.data.data.length);
      console.log('-- data error ::: ' + res.data.msg);
      console.log('-- systemUdiStateAction() end ::: ' + apiGetNowTime());
      console.log('------------------------------------------------');
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    systemUdiStateAction
  };
});
