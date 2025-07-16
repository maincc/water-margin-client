<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="text"
    placement="top-start"
    offset="50"
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
