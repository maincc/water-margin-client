import { i18n } from "@/js/render";

export const strategyTypeOptions = [
  {
    value: "",
    label: i18n.t("message.strategyInfo.allStrategy"),
  },
  {
    value: "handicap",
    label: i18n.t("message.strategyInfo.handicap"),
  },
  {
    value: "arbitrage",
    label: i18n.t("message.strategyInfo.arbitrage"),
  },
  {
    value: "hedge",
    label: i18n.t("message.strategyInfo.hedge"),
  },
  {
    value: "position",
    label: i18n.t("message.strategyInfo.position"),
  },
  {
    value: "fund",
    label: i18n.t("message.strategyInfo.fund"),
  },
  {
    value: "other",
    label: i18n.t("message.strategyInfo.other"),
  },
];

export const strategyStatusOptions = [
  {
    value: "",
    label: i18n.t("message.strategyInfo.allStatus"),
  },
  {
    value: "true",
    label: i18n.t("message.strategyInfo.activing"),
  },
  {
    value: "false",
    label: i18n.t("message.strategyInfo.notActivated"),
  },
];
