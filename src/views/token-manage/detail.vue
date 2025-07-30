<template>
  <div class="token-detail" ref="tokenDetail">
    <div class="view-top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/tokenManage' }">
          <span class="breadcrumb-font">{{ $t("message.menus.token") }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="breadcrumb-font" style="color: rgba(255, 255, 255, 1)">{{
            $t("message.detail")
          }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="view-content">
      <div class="title" style="display: flex; align-content: center">
        <span style="margin-left: 20px"
          >{{ $t("message.tokenInfo.symbol") }}:
        </span>
        <img
          style="width: 20px; height: 20px; margin-left: 10px"
          :src="showTokenLogo(info.logo)"
          alt=""
          srcset=""
        />
        <span style="margin-left: 10px">{{ info.symbol || "- -" }}</span>
      </div>
      <div class="info">
        <div class="info-item">
          <div class="info-left">{{ $t("message.tokenManage.chainName") }}</div>
          <div class="info-right">
            <div style="display: flex; align-items: center">
              <img
                style="width: 20px; height: 20px"
                :src="showChainLogo(info.bip44)"
                alt=""
                srcset=""
              />
              <span style="margin-left: 10px">{{
                showChainName(info.bip44)
              }}</span>
            </div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-left">{{ $t("message.tokenInfo.name") }}</div>
          <div class="info-right">
            <div style="display: flex; align-items: center">
              <img
                style="width: 20px; height: 20px"
                :src="showTokenLogo(info.logo)"
                alt=""
                srcset=""
              />
              <span style="margin-left: 10px">{{ info.name || "- -" }}</span>
            </div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-left">{{ $t("message.tokenInfo.decimals") }}</div>
          <div class="info-right">
            {{ info.decimals || "- -" }}
          </div>
        </div>
        <div v-if="info.contract">
          <div class="info-item">
            <div class="info-left">{{ $t("message.tokenInfo.contract") }}</div>
            <div class="info-right">
              {{ info.contract || "- -" }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.tokenInfo.mirrorName") }}
            </div>
            <div class="info-right">
              {{ info.mirrorName || "- -" }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.tokenInfo.mirrorIssuer") }}
            </div>
            <div class="info-right">
              {{ info.mirrorIssuer || "- -" }}
            </div>
          </div>
        </div>
        <div v-else>
          <div class="info-item">
            <div class="info-left">{{ $t("message.tokenInfo.issuer") }}</div>
            <div class="info-right">
              {{ info.issuer || "- -" }}
            </div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-left">{{ $t("message.tokenInfo.isNative") }}</div>
          <div class="info-right">
            {{ info.isNative ? $t("message.yes") : $t("message.no") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchTokenById } from "@/js/api/v1/token";
import { Loading } from "element-ui";

export default {
  name: "tokenDetail",
  beforeRouteEnter(to, from, next) {
    const { id } = to.params;
    next(async (vm) => {
      const inst = Loading.service({
        fullscreen: false,
        target: vm.$refs.tokenDetail,
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        const res = await fetchTokenById(vm.userInfo.address, id);
        if (res.isSuccess()) {
          vm.info = res.data;
        } else {
          vm.$router.push("/tokenManage");
        }
      } catch (error) {
        vm.$message.error(error.message || error);
        vm.$router.push("/tokenManage");
      } finally {
        inst.close();
      }
    });
  },
  data() {
    return {
      info: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo", "allChains"]),
  },
  methods: {
    showChainLogo(str) {
      try {
        const chain = this.allChains.find((item) => item.bip44 == str);
        return require(`@/assets/chains/${chain?.logo}`);
      } catch (error) {
        return require(`@/assets/chains/default.png`);
      }
    },
    showChainName(str) {
      const chain = this.allChains.find((item) => item.bip44 == str);
      return chain ? chain.name : "- -";
    },
    showTokenLogo(str) {
      try {
        return require(`@/assets/tokens/${str}`);
      } catch (error) {
        return require(`@/assets/tokens/default.svg`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.token-detail {
  margin: 46px 20px 0px;
  height: calc(100% - 92px);
  display: flex;
  flex-direction: column;
  .view-top {
    margin-bottom: 20px;
    .breadcrumb-font {
      font-size: 14px;
      color: rgba(179, 182, 187, 1);
      line-height: 20px;
    }
  }
  .view-content {
    flex: 1;
    background: rgba(24, 31, 35, 1);
    .title {
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(66, 70, 90, 1);
    }
    .info {
      .info-item {
        margin-top: 20px;
        display: flex;
        font-size: 14px;
        font-weight: 400;
        .info-left {
          margin-left: 20px;
          width: 190px;
          min-width: 190px;
          display: flex;
          letter-spacing: -0.04px;
          color: rgba(179, 182, 187, 1);
        }
        .info-right {
          margin-right: 20px;
          color: rgba(255, 255, 255, 1);
          word-break: break-word;
          text-align: left;
        }
      }
    }
  }
}
</style>
