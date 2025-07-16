<template>
  <div class="exchange-detail">
    <div class="view-top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/exchangeManage' }">
          <span class="breadcrumb-font">{{
            $t("message.menus.exchange")
          }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="breadcrumb-font" style="color: rgba(255, 255, 255, 1)">{{
            $t("message.detail")
          }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="view-content">
      <div class="title">
        <span style="margin-left: 20px"
          >{{ $t("message.exchangeInfo.name") }}: {{ info.name }}</span
        >
      </div>
      <div class="info">
        <div class="info-item">
          <div class="info-left">{{ $t("message.exchangeInfo.node") }}</div>
          <div class="info-right">{{ info.node || "- -" }}</div>
        </div>
        <div class="info-item">
          <div class="info-left">{{ $t("message.exchangeInfo.browser") }}</div>
          <div class="info-right">{{ info.browser || "- -" }}</div>
        </div>
        <div class="info-item">
          <div class="info-left">
            {{ $t("message.exchangeInfo.tranServer") }}
          </div>
          <div class="info-right">{{ info.tran_server || "- -" }}</div>
        </div>
        <div
          class="info-item"
          v-for="(item, index) in info.minimal_value
            ? Object.keys(info.minimal_value)
            : []"
          :key="index"
        >
          <div class="info-left">
            {{ $t("message.exchangeInfo.minimalToken", { token: item }) }}
          </div>
          <div class="info-right">{{ info.minimal_value[item] || "- -" }}</div>
        </div>
        <div class="info-item">
          <div class="info-left">
            {{ $t("message.exchangeInfo.description") }}
          </div>
          <div class="info-right">{{ info.description || "- -" }}</div>
        </div>
        <div class="info-item">
          <div class="info-left">{{ $t("message.exchangeInfo.native") }}</div>
          <div class="info-right">
            {{ info.native ? $t("message.yes") : $t("message.no") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchExchangeById } from "@/js/api/v1/exchange";

export default {
  name: "ExchangeDetail",
  beforeRouteEnter(to, from, next) {
    const { id } = to.params;
    next(async (vm) => {
      try {
        const res = await fetchExchangeById(vm.userInfo.address, id);
        if (res.isSuccess()) {
          vm.info = res.data;
        } else {
          vm.$router.push("/exchangeManage");
        }
      } catch (error) {
        vm.$message.error(error.message || error);
        vm.$router.push("/exchangeManage");
      }
    });
  },
  data() {
    return {
      info: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style lang="scss" scoped>
.exchange-detail {
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
    background: red;
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
