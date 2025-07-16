import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import { fetchAddressInfo } from "@/js/api/v1/user";
import { Message } from "element-ui";
import _import from "./import-component";
import dynamicRouter from "./dynamic-router";
import { Loading } from "element-ui";
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "index",
    component: _import("index"),
  },
];

const createRouter = () =>
  new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export const getInfo = async () => {
  let info = null;
  const ethereum = window.ccdao;
  if (ethereum) {
    const inst = Loading.service({ fullscreen: true });
    try {
      const addresses = await ethereum.request({
        method: "swtc_requestAccounts",
      });
      if (addresses.length > 0) {
        info = await fetchAddressInfo(addresses[0]);
        if (info) {
          store.dispatch("setCurrentAddress", addresses[0]);
          store.dispatch("setUserInfo", info);
          router.addRoute(...dynamicRouter(info));
        }
      }
    } catch (error) {
      Message.error(error.message);
    } finally {
      inst.close();
    }
  }
  return info;
};

let getInfo_num = 0; // 防止重复请求

router.beforeEach(async (to, from, next) => {
  let info = store.state.userInfo;
  if (to.path == "/index") {
    if (info) {
      next("/welcome");
    } else {
      if (from.path == "/") {
        if (getInfo_num == 0) {
          info = await getInfo();
        }
        getInfo_num--;
        if (info) {
          next("/welcome");
        } else {
          next();
        }
      } else {
        next();
      }
    }
  } else {
    if (info) {
      next();
    } else {
      info = await getInfo();
      const routers = router.getRoutes();
      // const nextTo = routers.find(r => {r.path == to.path});
      const nextTo = to;
      if (info) {
        if (nextTo) {
          next(nextTo.path);
        } else {
          next("/welcome");
        }
      } else {
        getInfo_num++;
        next("/index");
      }
    }
  }
});

export default router;
