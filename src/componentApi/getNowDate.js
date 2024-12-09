/* 獲得時間 */
export function getNowTime() {
    var _now = new Date();
    var _strNow = dateToString(_now) + ' ';
    _strNow += (_now.getHours() < 10 ? '0' : '') + _now.getHours() + ':';
    _strNow += (_now.getMinutes() < 10 ? '0' : '') + _now.getMinutes() + ':';
    _strNow += (_now.getSeconds() < 10 ? '0' : '') + _now.getSeconds();
    return _strNow;
  };
  
  
  function dateToString(_date) {
    var strDate = _date.getFullYear() + '-' + ((_date.getMonth() + 1) < 10 ? '0' : '') + (_date.getMonth() + 1) + '-' + (_date.getDate() < 10 ? '0' : '') + _date.getDate();
    return strDate;
  };