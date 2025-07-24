import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { createRoot } from "./js/render";

Vue.config.productionTip = false;

import "@/css/popover.scss";
import "@/css/button.scss";
import "@/css/table.scss";
import "@/css/pagination.scss";
import "@/css/form.scss";
import "@/css/input.scss";
import "@/css/checkbox.scss";
import "@/css/radio.scss";
import "@/css/select.scss";
import "@/css/tooltip.scss";
import "@/css/dialog.scss";

createRoot({ store, router, root: App });
