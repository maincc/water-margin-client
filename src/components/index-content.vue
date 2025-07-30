<template>
  <div class="index-content">
    <div class="content" style="margin-top: 10%; margin-left: 10%">
      <div class="title">{{ $t("message.indexContent.title") }}</div>
      <div class="introduce" style="margin-top: 20px">
        {{ $t("message.indexContent.introduce") }}
      </div>
      <div>
        <el-button @click="connect" class="connectBt" style="margin-top: 30px">
          {{ $t("message.connectWallet") }}
        </el-button>
      </div>
    </div>
    <div class="background">
      <div class="left">
        <img
          style="width: 100%; position: absolute; bottom: 0; left: 0"
          src="@/assets/index-left.svg"
          alt=""
        />
      </div>
      <div class="right">
        <img
          style="width: 100%; position: absolute; top: 10%; right: 160px"
          src="@/assets/index-right.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import toCcdaoPluginDialog from "@/components/to-ccdao-plugin-dialog";
import { getInfo } from "@/router";

export default {
  name: "index-content",
  methods: {
    async connect() {
      const ethereum = window.ccdao;
      if (ethereum) {
        try {
          const info = await getInfo();
          if (info) {
            this.$router.push("/welcome");
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      } else {
        toCcdaoPluginDialog().show();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.index-content {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(13, 26, 33, 1);
  .background {
    top: 0;
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    .left {
      position: absolute;
      width: 34%;
      height: 100%;
      left: 0;
    }
    .right {
      position: absolute;
      width: 41%;
      height: 100%;
      right: 0;
    }
  }
  .content {
    position: relative;
    z-index: 2;
    text-align: left;
    vertical-align: top;
    width: 520px;
    .title {
      font-size: 46px;
      font-weight: 600;
      line-height: 64.4px;
      color: rgba(255, 255, 255, 1);
    }
    .introduce {
      font-size: 18px;
      font-weight: 400;
      line-height: 32px;
      color: rgba(204, 216, 231, 1);
    }
    .connectBt {
      width: 160px;
      height: 50px;
      opacity: 1;
      border-radius: 40px;
      background: rgba(132, 132, 221, 1);
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      &:hover {
        background: rgba(150, 150, 235, 1);
      }
    }
  }
}
</style>
