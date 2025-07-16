<template>
  <div id="connectWallet">
    <div v-if="currentAddress" class="connectWallet position">
      <div style="display: flex; align-items: center; justify-content: center">
        <img style="width: 20px" src="@/assets/wallet.svg" alt="" />
        <span style="margin-left: 10px">{{ hideAddress() }}</span>
      </div>
    </div>
    <el-popover v-else placement="bottom-end" width="250" trigger="click">
      <div class="showWalletList" id="showWalletList">
        <div>{{ $t("message.connectWallet") }}</div>
        <el-button
          @click="connectOrGet"
          class="ccdao-bt"
          style="margin-top: 10px"
        >
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <img style="width: 20px" src="@/assets/ccdao-logo.svg" alt="" />
            <span style="margin-left: 10px">{{
              isInstallCcdao
                ? $t("message.ccdaoConnector")
                : $t("message.getCcdaoPlugin")
            }}</span>
          </div>
        </el-button>
      </div>
      <el-button slot="reference" class="connectWallet">
        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <img style="width: 20px" src="@/assets/wallet.svg" alt="" />
          <span style="margin-left: 10px">{{
            $t("message.connectWallet")
          }}</span>
        </div>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getInfo } from "@/router";

export default {
  name: "ConnectWallet",
  data() {
    return {
      isInstallCcdao: window.ccdao ? true : false,
    };
  },
  computed: {
    ...mapGetters(["currentAddress"]),
  },
  methods: {
    async connect() {
      try {
        const info = await getInfo();
        if (info) {
          this.$router.push("/welcome");
        }
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    connectOrGet() {
      const ethereum = window.ccdao;
      if (ethereum) {
        this.connect();
      } else {
        window.open("https://ccda.ooo/#/connector", "_blank");
      }
    },
    hideAddress() {
      if (this.currentAddress) {
        return (
          this.currentAddress.slice(0, 4) +
          "..." +
          this.currentAddress.slice(-4)
        );
      } else {
        return "- -";
      }
    },
  },
};
</script>

<style lang="scss">
#connectWallet {
  .position {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .connectWallet {
    width: 148px;
    height: 40px;
    opacity: 1;
    border-radius: 20px;
    background: rgba(132, 132, 221, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    border: none;
  }
}
.showWalletList {
  border-radius: 6px;
  background: rgba(27, 38, 43, 1);
  border: 1px solid rgba(66, 70, 90, 1);
  padding: 20px 20px 30px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0px;
  line-height: 19.6px;
  color: rgba(255, 255, 255, 1);
  .ccdao-bt {
    width: 100%;
    height: 40px;
    border-radius: 6px;
    background: rgba(132, 132, 221, 1);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
