import { getRole, isAdmin, isUser } from "@/js/account-info";

import common from "./common";
import modules from "./modules";
import _ from "lodash";

const dynamicRouter = (info) => {
  const role = getRole(info.role);

  if (isAdmin(role)) {
    const adminRouter = _.cloneDeep(common);
    adminRouter[0].children = adminRouter[0].children.concat(modules);
    return adminRouter;
  }

  if (isUser(role)) {
    const userRouter = _.cloneDeep(common);
    const userModules = modules.filter((m) => {
      if (m.module) {
        return !!info.modules.find((im) => im.module == m.module);
      } else {
        return false;
      }
    });
    userRouter[0].children = userRouter[0].children.concat(userModules);
    return userRouter;
  }

  return [];
};

export default dynamicRouter;
