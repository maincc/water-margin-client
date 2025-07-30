import axios from "axios";
import Response from "./response/";
import ApiError from "./response/api-error";
import router from "@/router";
import { Message } from "element-ui";
import { i18n } from "../render";

const service = axios.create({
  // baseURL: "http://192.168.78.100:3000",
  baseURL: "http://192.168.78.105:3000",
});

/**
 * 获取令牌
 *
 * @returns
 */
const fetchToken = async (address) => {
  const res = await service({
    url: "/v1/api/public/token/" + address,
    method: "get",
    sign: false,
  });
  return res.data;
};

service.interceptors.request.use(
  async (config) => {
    if (config.tk) {
      try {
        const token = await fetchToken(config.signer);
        if (window.ccdao) {
          const signature = await window.ccdao.request({
            method: "swtc_signMessage",
            params: [config.signer, token],
          });
          const publicKey = await window.ccdao.request({
            method: "swtc_getPublicKey",
            params: [config.signer],
          });
          config.headers = Object.assign({}, config.headers, {
            "x-tk": token,
            "x-sd": signature,
            "x-pk": publicKey,
          });
        } else {
          throw new Error(i18n.t("message.pleaseDownloadCcdaoPlugin"));
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  async (response) => {
    let res;
    try {
      res = new Response(response.data);
      if (res.isSuccess()) {
        return res;
      } else {
        return Promise.reject(new ApiError(res.message, res.code, res.data));
      }
    } catch (error) {
      return Promise.reject(new ApiError(res.message, res.code, res.data));
    }
  },
  (err) => {
    if (err.response) {
      const { status, data } = err.response;
      return Promise.reject(
        new ApiError(data.message, data.code || status, data)
      );
    } else {
      // 网络错误或请求未发出（如 CORS、超时等）
      return Promise.reject(new ApiError(err.message, 901));
    }
  }
);

export { fetchToken };

export default service;
