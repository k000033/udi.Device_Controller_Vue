let username = new URL(
  `https://1.com?${new URL(window.location.href).href.split("?")[1]}`
).searchParams.get("username");

export class udiControlParams {
  constructor() {
    this.OBJECT_ID = "";
    this.ORDER_ID ="";
    this.ORDER_TYPE ="";
    this.VIEW_TYPE="";
  }

  initialParams() {
    this.OBJECT_ID = "";
    this.ORDER_ID ="";
    this.ORDER_TYPE ="";
    this.VIEW_TYPE="";
  }
}

export class udiEnabledParams {
    constructor(){
        this.DEVICE_ID ="";
        this.ORDER_ID =""
        this.ENABLED="";
    }

    initialParams() {
        this.DEVICE_ID = "";
        this.ORDER_ID = "";
        this.ENABLED="";
      }
}

export class systemUdiStateParams {
   constructor(){
      this.GUID ="";
      this.TYPE ="";
      this.DEVICE_ID="";
      this.ORDER_ID="";
   }

   initialParams(){
    this.GUID ="";
    this.TYPE ="";
    this.DEVICE_ID="";
    this.ORDER_ID="";
   }
}