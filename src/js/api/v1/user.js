import fetch from "@/js/api/fetch";

/**
 * 查询自身信息
 *
 * @returns
 */
export const fetchAddressInfo = async (address) => {
  const res = await fetch({
    url: "/v1/api/user/self",
    method: "get",
    headers: {
      "x-address": address,
    },
    tk: true,
    signer: address,
  });
  return res.data;
};

/**
 * 查询用户列表
 *
 * @returns
 */
export const fetchUserList = async (address, page, size) => {
  const res = await fetch({
    url: "/v1/api/user/list",
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
 * 新建用户
 *
 * @returns
 */
export const createUser = async (address, data) => {
  const res = await fetch({
    url: "/v1/api/user/create",
    method: "post",
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};

/**
 * 删除一个用户
 *
 * @returns
 */
export const deleteUser = async (address, id) => {
  const res = await fetch({
    url: "/v1/api/user/delete/" + id,
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
 * 修改一个用户
 *
 * @returns
 */
export const modifyUser = async (address, id, data) => {
  const res = await fetch({
    url: "/v1/api/user/update/" + id,
    method: "patch",
    headers: {
      "x-address": address,
    },
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};
