import fetch from "@/js/api/fetch";

/**
 * 查询项目列表
 *
 * @returns
 */
export const fetchProjectList = async (address, page, size) => {
  const res = await fetch({
    url: "/v1/api/project/list",
    method: "get",
    tk: true,
    signer: address,
    params: {
      page: page - 1,
      size,
    },
  });
  return res;
};

/**
 * 根据ID查询一个项目
 *
 * @returns
 */
export const fetchProjectById = async (address, id) => {
  const res = await fetch({
    url: "/v1/api/project/detail/" + id,
    method: "get",
    tk: true,
    signer: address,
  });
  return res;
};

/**
 * 新建项目
 *
 * @returns
 */
export const createProject = async (address, data) => {
  const res = await fetch({
    url: "/v1/api/project/create/",
    method: "post",
    tk: true,
    signer: address,
    data: data,
  });
  return res;
};
