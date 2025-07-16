import fetch from "@/js/api/fetch";

/**
 * 查询币种列表
 *
 * @returns
 */
export const fetchTokenList = async (address, page, size) => {
  const res = await fetch({
    url: "/v1/api/token/list",
    method: "get",
    headers: {
      "x-address": address,
    },
    tk: true,
    signer: address,
    params: {
      page: page - 1, // page从0开始
      size,
    },
  });
  return res;
};

/**
 * 新建币种
 *
 * @returns
 */
export const createToken = async (address, data) => {
  const res = await fetch({
    url: "/v1/api/token/create",
    method: "post",
    headers: {
      "x-address": address,
    },
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};

/**
 * 删除一个币种
 *
 * @returns
 */
export const deleteToken = async (address, id) => {
  const res = await fetch({
    url: "/v1/api/token/delete/" + id,
    method: "delete",
    headers: {
      "x-address": address,
    },
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
export const modifyToken = async (address, id, data) => {
  const res = await fetch({
    url: "/v1/api/token/update/" + id,
    method: "patch",
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};
