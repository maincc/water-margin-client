import fetch from "@/js/api/fetch";

/**
 * 获取所有支持的模块
 *
 * @returns
 */
export const fetchModules = async () => {
  const res = await fetch({
    url: "/v1/api/public/modules/all",
    method: "get",
  });
  return res.data;
};

/**
 * 获取所有支持的链
 *
 * @returns
 */
export const fetchChains = async () => {
  const res = await fetch({
    url: "/v1/api/public/chain/all",
    method: "get",
  });
  return res.data;
};

/**
 * 获取所有支持的代币
 *
 * @returns
 */
export const fetchTokens = async () => {
  const res = await fetch({
    url: "/v1/api/public/tokens/all",
    method: "get",
  });
  return res.data;
};

/**
 * 获取所有支持的交易所
 *
 * @returns
 */
export const fetchExchanges = async () => {
  const res = await fetch({
    url: "/v1/api/public/exchange/all",
    method: "get",
  });
  return res.data;
};
