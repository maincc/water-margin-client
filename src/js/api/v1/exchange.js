import fetch from "@/js/api/fetch";

/**
 * 查询所有交易所列表
 *
 * @returns
 */
export const fetchExchangeList = async (address) => {
  const res = await fetch({
    url: "/v1/api/exchange/list",
    method: "get",
    tk: true,
    signer: address,
  });
  return res;
};

/**
 * 根据交易所ID查询一个交易所
 *
 * @returns
 */
export const fetchExchangeById = async (address, id) => {
  const res = await fetch({
    url: "/v1/api/exchange/detail/" + id,
    method: "get",
    tk: true,
    signer: address,
  });
  return res;
};

/**
 * 新建交易所
 *
 * @returns
 */
export const createExchange = async (address, data) => {
  const res = await fetch({
    url: "/v1/api/exchange/create",
    method: "post",
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};

/**
 * 删除交易所
 *
 * @returns
 */
export const deleteExchange = async (address, id) => {
  const res = await fetch({
    url: "/v1/api/exchange/delete/" + id,
    method: "delete",
    tk: true,
    signer: address,
  });
  return res;
};

/**
 * 修改交易所
 *
 * @returns
 */
export const modifyExchange = async (address, id, data) => {
  const res = await fetch({
    url: "/v1/api/exchange/update/" + id,
    method: "patch",
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};
