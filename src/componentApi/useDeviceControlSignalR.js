import * as signalR from '@microsoft/signalr';
import axios from 'axios';
import { apiUseVarious } from './index';
import { useUdiControl } from './useUdiControl';
export const useDeviceControlSignalR = () => {
  const route = useRoute();

  /**
   * 測試 URL
   */
  //window.origin = 'http://192.168.116.166';
  //  const signalRAPI = "http://localhost:5059/SignalServer";
  // const getDeviceControlAPI =
  //   "http://localhost:5059/api/Device/getDeviceControl";
  // const getUdiBreathingAPI = "http://localhost:5059/api/Device/getUdiBreathing";
  //  /**
  //  * 正式 URL
  //  */
  const signalRAPI = `${window.origin}/signalR/udi_device_contrl/SignalServer`;
  const getDeviceControlAPI = `${window.origin}/signalR/udi_device_contrl/api/Device/getDeviceControl`;

  const getUdiBreathingAPI = `${window.origin}/signalR/udi_device_contrl/api/Device/getUdiBreathing`;

  const getRecycleAPI = `${window.origin}/signalR/udi_device_contrl/api/Device/getRecycle`;

  const { deviceStateList, udiBreathing, recycle } = apiUseVarious();
  const { getOrderInstructions } = useUdiControl();
  // 設定連線
  var connection = new signalR.HubConnectionBuilder()
    .withUrl(signalRAPI, {
      withCredentials: false
    })
    .withAutomaticReconnect()
    .build(); //與Server建立連線.

  // 正在重新連線
  connection.onreconnecting((error) => {
    console.log('SignalR 正在重連...', error);
  });

  // 已重新連線
  connection.onreconnected((connectionId) => {
    console.log('SignalR 已重連. 連接ID:', connectionId);
    setTimeout(() => {
      getDeviceControl();
      getUdiBreathing();
      getRecycle();
    }, 2000); // 尝试重连
  });

  const connectionAction = () => {
    // 執行連線
    connection
      .start()
      .then(function () {
        console.log('Hub 連線完成');
      })
      .catch(function (err) {
        console.log('連線錯誤: ' + err.toString());
      });

    // 註冊 取得設備狀態
    connection.on('refreshDeviceControl', (response) => {
      const res = JSON.parse(response);
      console.log(res);
      for (let item of res) {
        let dev = deviceStateList.value.find(
          (x) => x.DEVICE_ID == item.DEVICE_ID
        );

        // 當設備關閉狀態，回傳狀態也是關閉的話，不更新資料
        if (dev.STATE == 2 && item.STATE == 2) {
          dev.BREATHING_LIGHT = item.BREATHING_LIGHT;
          dev.BREATHING_ALARM = item.BREATHING_ALARM;
          dev.BREATHING_ORDER = item.BREATHING_ORDER;
          dev.DEVICE_ID = item.DEVICE_ID;
          dev.QTY_ASSIGN = item.QTY_ASSIGN;
          dev.QTY_RATE = item.QTY_RATE;
          dev.QTY_RESULT = item.QTY_RESULT;
          dev.WO_ASSIGN = item.WO_ASSIGN;
          dev.WO_RATE = item.WO_RATE;
          dev.WO_RESULT = item.WO_RESULT;
          continue;
        }

        dev.BREATHING_LIGHT = item.BREATHING_LIGHT;
        dev.BREATHING_ALARM = item.BREATHING_ALARM;
        dev.BREATHING_ORDER = item.BREATHING_ORDER;
        dev.B_TIME = item.B_TIME;
        dev.DESCRIPTION = item.DESCRIPTION;
        dev.DEVICE_ID = item.DEVICE_ID;
        dev.E_TIME = item.E_TIME;
        dev.ORDER_ID = item.ORDER_ID;
        dev.QTY_ASSIGN = item.QTY_ASSIGN;
        dev.QTY_RATE = item.QTY_RATE;
        dev.QTY_RESULT = item.QTY_RESULT;
        dev.STATE = item.STATE;
        dev.STATE_DESCRIPTION = item.STATE_DESCRIPTION;
        dev.TASK_ID = item.TASK_ID;
        dev.WO_ASSIGN = item.WO_ASSIGN;
        dev.WO_RATE = item.WO_RATE;
        dev.WO_RESULT = item.WO_RESULT;
        dev.DESCRIPTION = item.DESCRIPTION;
      }

      if (route.name == 'instructions') {
        getOrderInstructions();
      }
    });

    // 註冊 UDI呼吸燈
    connection.on('refreshUdiBreathing', (response) => {
      udiBreathing.value = JSON.parse(response);
    });

    // 註冊 資料清除
    connection.on('refreshRecycle', (response) => {
      recycle.value = JSON.parse(response);
      console.log(response);
    });

    // 註冊人數異動
    connection.on('UpdateUserCount', (response) => {
      console.log(response);
    });

    getDeviceControl();
    getUdiBreathing();
    getRecycle();
  };

  // 取得設備狀態
  const getDeviceControl = () => {
    // 打api,取得資料
    axios
      .get(getDeviceControlAPI)
      .then((res) => {
        if (res.data.rtN_CODE != 1) {
          deviceStateList.value = res.data;
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 取得呼吸登資料
  const getUdiBreathing = () => {
    axios
      .get(getUdiBreathingAPI)
      .then((res) => {
        if (res.data.rtN_CODE != 1) {
          udiBreathing.value = res;
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRecycle = () => {
    axios.get(getRecycleAPI).then((res) => {
      if (res.data.rtN_CODE != 1) {
        recycle.value = res.data;
        console.log(res);
      } else {
        console.log(res);
      }
    });
  };

  // 關閉頁籤的時候，取消事件註冊，中斷連線
  function cleanupSignalR() {
    if (connection) {
      connection.off('refreshDeviceControl'); // 取消订阅
      connection.off('refreshUdiBreathing'); // 取消订阅
      connection.stop().catch((err) => console.error(err.toString()));
    }
  }
  // 關閉網頁事件
  window.addEventListener('beforeunload', cleanupSignalR);

  return {
    connectionAction,
    cleanupSignalR
  };
};
