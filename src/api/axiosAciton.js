import axios from 'axios';
const defAxios = axios.create({
  //baseURL: 'http://localhost/work/carryProject.ashx' //測試
  baseURL: `${location.origin}/dcs/carryProject.ashx` //正式
});

export const udiControlAxios = (params) => {
  console.log('-- _NAME === ' + 'udi.Decive_Control');
  console.log('-- _TYPE === ' + '');
  console.log('-- OBJECT_ID === ' + params.OBJECT_ID);
  console.log('-- ORDER_ID === ' + params.ORDER_ID);
  console.log('-- ORDER_TYPE === ' + params.ORDER_TYPE);
  console.log('-- VIEW_TYPE === ' + params.VIEW_TYPE);
  return defAxios.get('', {
    params: {
      _NAME: 'udi.Decive_Control',
      _TYPE: '',
      OBJECT_ID: params.OBJECT_ID,
      ORDER_ID: params.ORDER_ID,
      ORDER_TYPE: params.ORDER_TYPE,
      VIEW_TYPE: params.VIEW_TYPE
    }
  });
};

export const udiEnabledAxios = (params) => {
  console.log('-- _NAME === ' + 'udi.Decive_Control');
  console.log('-- _TYPE === ' + 'INSERT');
  console.log('-- DEVICE_ID === ' + params.DEVICE_ID);
  console.log('-- ORDER_ID === ' + params.ORDER_ID);
  console.log('-- ENABLED === ' + params.ENABLED);
  return defAxios.get('', {
    params: {
      _NAME: 'udi.Decive_Control',
      _TYPE: 'INSERT',
      DEVICE_ID: params.DEVICE_ID,
      ORDER_ID: params.ORDER_ID,
      ENABLED: params.ENABLED
    }
  });
};

export const systemUdiStateAxios = (params) => {
  console.log('-- _NAME === ' + 'udi.Decive_Control');
  console.log('-- _TYPE === ' + 'UPDATE');
  console.log('-- GUID === ' + params.GUID);
  console.log('-- TYPE === ' + params.TYPE);
  console.log('-- DEVICE_ID === ' + params.DEVICE_ID);
  console.log('-- ORDER_ID === ' + params.ORDER_ID);
  return defAxios.get('', {
    params: {
      _NAME: 'udi.Decive_Control',
      _TYPE: 'UPDATE',
      GUID: params.GUID,
      TYPE: params.TYPE,
      DEVICE_ID: params.DEVICE_ID,
      ORDER_ID: params.ORDER_ID
    }
  });
};

export const useDevControl = (params) => {
  console.log('-- _NAME === ' + 'udi.Decive_Control');
  console.log('-- _TYPE === ' + 'DELETE');

  return defAxios.get('', {
    params: {
      _NAME: 'udi.Decive_Control',
      _TYPE: 'DELETE'
    }
  });
};
