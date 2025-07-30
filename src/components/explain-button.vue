<template>
  <el-tooltip
    class="item"
    :effect="effect"
    :content="text"
    placement="top-start"
    offset="50"
    trigger="click"
    :popper-class="popperClass"
  >
    <img
      style="
        margin-left: 6px;
        cursor: pointer;
        width: 12px;
        height: 12px;
        top: 2px;
        position: relative;
      "
      :src="imgSrc"
      @mouseout="out"
      @mouseover="over"
      alt=""
    />
  </el-tooltip>
</template>

<script>
export default {
  name: "ExplainButton",
  data() {
    return {
      imgSrc: require("@/assets/explain.svg"),
    };
  },
  props: {
    text: {
      type: String,
    },
    effect: {
      type: String,
      default: "dark",
    },
    popperClass: {
      type: String,
      default: "",
    },
  },
  methods: {
    over() {
      this.imgSrc = require("@/assets/explain-select.svg");
    },
    out() {
      this.imgSrc = require("@/assets/explain.svg");
    },
  },
};
</script>

<style></style>
