import fetch from "@/js/api/fetch";

/**
 * 查询策略列表
 *
 * @returns
 */
export const fetchStrategyList = async (address, page, size, params) => {
  const res = await fetch({
    url: "/v1/api/strategy/list",
    method: "get",
    tk: true,
    signer: address,
    params: {
      page: page - 1,
      size,
      isActive: params.isActive || null,
      type: params.type || null,
      name: params.name || null,
    },
  });
  return res;
};

/**
 * 根据ID查询一个策略
 *
 * @returns
 */
export const fetchStrategyById = async (address, id) => {
  const res = await fetch({
    url: "/v1/api/strategy/detail/" + id,
    method: "get",
    tk: true,
    signer: address,
  });
  return res;
};

/**
 * 新建策略
 *
 * @returns
 */
export const createStrategy = async (address, data) => {
  const res = await fetch({
    url: "/v1/api/strategy/create",
    method: "post",
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};

/**
 * 更新策略
 *
 * @returns
 */
export const updateStrategy = async (address, id, data) => {
  const res = await fetch({
    url: "/v1/api/strategy/update/" + id,
    method: "patch",
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};
