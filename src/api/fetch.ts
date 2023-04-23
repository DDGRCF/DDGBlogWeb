import axios from "axios";
import { ElLoading, ElMessage } from "element-plus";
import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { RespType } from "Fetch";
import { RespCode } from "@/types";
import storage from "@/utils/storage";

let loadingInstance = ElLoading.service();
loadingInstance.close();
const baseConfig = {
  baseURL: process.env.VUE_APP_SRV,
  timeout: 30000,
};

const fetch = axios.create(baseConfig);

fetch.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    loadingInstance = ElLoading.service();
    // if (storage?.getToken()) {
    //   console.log(config);
    //   config.headers!.Authorization = storage.getToken();
    // }
    return config;
  },
  function (err) {
    loadingInstance.close();
    return Promise.reject(err);
  }
);

fetch.interceptors.response.use(
  function (resp: AxiosResponse) {
    loadingInstance.close();
    console.log("recv: ", resp.data);
    const data = resp.data as RespType;
    if (data.code === RespCode.failure) {
      ElMessage({
        message: "error: " + (resp.data as RespType).msg,
        type: "error",
      });
      return new Promise(() => {
        console.log("发生错误");
      });
    }
    return resp;
  },
  function (err) {
    loadingInstance.close();
    ElMessage({
      message: "error: " + err,
      type: "error",
    });
    return Promise.reject(err);
  }
);

// export { fetch_clear };
export default fetch;
