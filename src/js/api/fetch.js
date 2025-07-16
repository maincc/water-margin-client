import axios from "axios";
import Response from "./response/";
import ApiError from "./response/api-error";
import { test_sign, test_getPK, test_verify } from "@/js/plugin-demo";

const service = axios.create({
  // baseURL: "http://192.168.78.101:3000",
  baseURL: "http://127.0.0.1:3000",
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
      console.log(window.ccdao);
      const token = await fetchToken(config.signer);
      const signature = await test_sign(token);
      const publicKey = await test_getPK();
      config.headers = Object.assign({}, config.headers, {
        "x-tk": token,
        "x-sd": signature,
        "x-pk": publicKey,
      });
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
