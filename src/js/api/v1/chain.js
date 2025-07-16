import fetch from "@/js/api/fetch";

/**
 * 获取所有链列表
 *
 * @returns
 */
export const fetchChainList = async (address) => {
  const res = await fetch({
    url: "/v1/api/chain/list",
    method: "get",
    tk: true,
    signer: address,
  });
  return res;
};

/**
 * 新建链
 *
 * @returns
 */
export const createChain = async (address, data) => {
  const res = await fetch({
    url: "/v1/api/chain/create",
    method: "post",
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};

/**
 * 删除链配置
 *
 * @returns
 */
export const deleteChain = async (address, id) => {
  const res = await fetch({
    url: "/v1/api/chain/delete/" + id,
    method: "delete",
    tk: true,
    signer: address,
  });
  return res;
};

/**
 * 修改一个币种
 *
 * @returns
 */
export const modifyChain = async (address, id, data) => {
  const res = await fetch({
    url: "/v1/api/chain/update/" + id,
    method: "patch",
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};
