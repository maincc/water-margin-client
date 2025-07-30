import _import from "./import-component";
import { i18n } from "@/js/render";

const routers = [
  {
    path: "/userManage",
    name: "UserManage",
    module: "user",
    component: _import("user-manage/index"),
    meta: {
      showMenu: true,
      title: i18n.t("message.menus.user"),
      icon: require("@/assets/menus/account-manage.svg"),
    },
  },
  {
    path: "/tokenManage",
    name: "TokenManage",
    module: "token",
    component: _import("token-manage/index"),
    meta: {
      showMenu: true,
      title: i18n.t("message.menus.token"),
      icon: require("@/assets/menus/token-manage.svg"),
    },
  },
  {
    path: "/tokenManage/detail/:id",
    name: "tokenDetail",
    module: "token",
    component: _import("token-manage/detail"),
    meta: {
      parentMenu: "TokenManage",
    },
  },

  {
    path: "/strategyManage/newStrategy",
    name: "NewStrategy",
    module: "strategy",
    component: _import("strategy-manage/newStrategy"),
    meta: {
      showMenu: true,
      title: i18n.t("message.menus.subStragegy.newStrategy"),
      isSubMenu: true,
      parentMenu: "StrategyManage",
      parentTitle: i18n.t("message.menus.stragegy"),
      parentIcon: require("@/assets/menus/strategy-manage.svg"),
      subIcon: require("@/assets/menus/subMenus/new.svg"),
      subIconSelected: require("@/assets/menus/subMenus/new-selected.svg"),
      needWrite: true, // 需要写权限
    },
  },
  {
    path: "/strategyManage/strategyList",
    name: "StrategyList",
    module: "strategy",
    component: _import("strategy-manage/strategyList"),
    meta: {
      showMenu: true,
      title: i18n.t("message.menus.subStragegy.strategyList"),
      isSubMenu: true,
      parentMenu: "StrategyManage",
      parentTitle: i18n.t("message.menus.stragegy"),
      parentIcon: require("@/assets/menus/strategy-manage.svg"),
      subIcon: require("@/assets/menus/subMenus/list.svg"),
      subIconSelected: require("@/assets/menus/subMenus/list-selected.svg"),
    },
  },
  {
    path: "/strategyManage/detail/:id",
    name: "strategyDetail",
    module: "strategy",
    component: _import("strategy-manage/detail"),
    meta: {
      belongMenu: "StrategyList",
      parentMenu: "StrategyManage",
    },
  },
  {
    path: "/projectManage/newProject",
    name: "NewProject",
    module: "project",
    component: _import("project-manage/newProject"),
    meta: {
      showMenu: true,
      title: i18n.t("message.menus.subProject.newProject"),
      isSubMenu: true,
      parentMenu: "ProjectManage",
      parentTitle: i18n.t("message.menus.project"),
      parentIcon: require("@/assets/menus/project-manage.svg"),
      subIcon: require("@/assets/menus/subMenus/new.svg"),
      subIconSelected: require("@/assets/menus/subMenus/new-selected.svg"),
      needWrite: true, // 需要写权限
    },
  },
  {
    path: "/projectManage/projectList",
    name: "ProjectList",
    module: "project",
    component: _import("project-manage/projectList"),
    meta: {
      showMenu: true,
      title: i18n.t("message.menus.subProject.projectList"),
      isSubMenu: true,
      parentMenu: "ProjectManage",
      parentTitle: i18n.t("message.menus.project"),
      parentIcon: require("@/assets/menus/project-manage.svg"),
      subIcon: require("@/assets/menus/subMenus/list.svg"),
      subIconSelected: require("@/assets/menus/subMenus/list-selected.svg"),
    },
  },
  {
    path: "/projectManage/detail/:id",
    name: "projectDetail",
    module: "project",
    component: _import("project-manage/detail"),
    meta: {
      belongMenu: "ProjectList",
      parentMenu: "ProjectManage",
    },
  },

  {
    path: "/chainManage",
    name: "chainManage",
    module: "chain",
    component: _import("chain-manage/index"),
    meta: {
      showMenu: true,
      title: i18n.t("message.menus.chain"),
      icon: require("@/assets/menus/chain-manage.svg"),
    },
  },
  {
    path: "/exchangeManage",
    name: "exchangeManage",
    module: "exchange",
    component: _import("exchange-manage/index"),
    meta: {
      showMenu: true,
      title: i18n.t("message.menus.exchange"),
      icon: require("@/assets/menus/exchange-manage.svg"),
    },
  },
  {
    path: "/exchangeManage/detail/:id",
    name: "exchangeDetail",
    module: "exchange",
    component: _import("exchange-manage/detail"),
    meta: {
      belongMenu: "exchangeManage",
      parentMenu: null,
    },
  },
];

export default routers;
