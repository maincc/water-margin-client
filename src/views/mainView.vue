<template>
  <div class="home">
    <div class="left">
      <main-view-left></main-view-left>
    </div>
    <div class="right">
      <div class="right-top">
        <connect-wallet
          style="margin-top: 22px; margin-right: 20px"
        ></connect-wallet>
      </div>
      <div class="right-content">
        <div class="scroll-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import connectWallet from "@/components/connect-wallet";
import mainViewLeft from "@/components/mainView-left.vue";
import { resetRouter } from "@/router/index";

export default {
  name: "main-view",
  computed: {
    ...mapGetters(["currentAddress"]),
  },
  components: {
    connectWallet,
    mainViewLeft,
  },
  mounted() {
    const ethereum = window.ccdao;
    if (ethereum) {
      ethereum.on("swtcAccountsChanged", (accounts) => {
        const currentAddress = accounts[0];
        if (currentAddress != this.currentAddress) {
          this.$store.dispatch("setCurrentAddress", "");
          this.$store.dispatch("setUserInfo", null);
          resetRouter();
          this.$router.push("/index");
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  .left {
    width: 240px;
    background: rgba(13, 26, 33, 1);
  }
  .right {
    flex: 1;
    height: 100%;
    background: rgba(37, 42, 68, 1);
    display: flex;
    flex-direction: column;
    .right-top {
      width: 100%;
      display: flex;
      justify-content: end;
    }
    .right-content {
      flex: 1;
      position: relative;
      .scroll-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
      }
    }
  }
}
</style>
