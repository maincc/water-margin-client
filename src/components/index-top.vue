<template>
  <div class="index-top">
    <div class="left-font">
      <img src="@/assets/client-logo.svg" alt="" />
      <span style="margin-left: 10px">{{ $t("message.waterMargin") }}</span>
    </div>
    <div>
      <connect-wallet></connect-wallet>
    </div>
  </div>
</template>

<script>
import connectWallet from "./connect-wallet";
export default {
  name: "index-top",
  components: {
    connectWallet,
  },
};
</script>

<style lang="scss" scoped>
.index-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 84px;
  background-color: rgba(37, 42, 68, 1);
  padding: 0 20px;
  .left-font {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: 0px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
