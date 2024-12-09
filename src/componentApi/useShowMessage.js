import { ElMessage } from "element-plus";

export const useShowMessage = () => {
  const openElMessage = (msg,type) => {
    ElMessage({
      showClose: true,
      message: msg,
      duration: 4000,
      type:type,
      plain: true,
      grouping:true
    });
  };

  return { openElMessage };
};
