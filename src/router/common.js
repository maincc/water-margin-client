import _import from "./import-component";
import { i18n } from "@/js/render";

const routers = [
  {
    path: "/main",
    name: "main",
    redirect: "/welcome",
    component: _import("mainView"),
    meta: { isMenu: true },
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: _import("welcome"),
        meta: {
          showMenu: false,
        },
      },
    ],
  },
];

export default routers;
