<template>
  <div class="strategy-detail" ref="strategyDetail">
    <div class="view-top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/strategyManage/strategyList' }">
          <span class="breadcrumb-font">{{
            $t("message.menus.subStragegy.strategyList")
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
          >{{ $t("message.strategyInfo.name") }}: {{ info.name }}</span
        >
        <div v-if="isAuthWrite">
          <el-button
            v-if="!info.isActive"
            @click="strategyActivate"
            class="active-btn common-btn"
            style="margin-right: 20px"
            >{{ $t("message.strategyDetail.strategyActiving") }}</el-button
          >
          <el-button
            v-else
            @click="strategyBan"
            class="ban-btn common-btn"
            style="margin-right: 20px"
            >{{ $t("message.strategyDetail.strategyBan") }}</el-button
          >
        </div>
      </div>
      <div class="info">
        <div class="info-item">
          <div class="info-left">{{ $t("message.strategyInfo.type") }}</div>
          <div class="info-right">{{ zhType(info.type) }}</div>
        </div>
        <div class="info-item">
          <div class="info-left">
            {{ $t("message.strategyInfo.createDate") }}
          </div>
          <div class="info-right">{{ info.createDate }}</div>
        </div>
        <div v-if="info.params">
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.rivalExchange") }}
            </div>
            <div class="info-right">{{ info.params.exchange }}</div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.rivalExchangeAccount") }}
            </div>
            <div class="info-right">{{ info.params.exchangeAccount }}</div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.letDexAccount") }}
            </div>
            <div class="info-right">{{ info.params.letsdexAccount }}</div>
          </div>
          <div class="info-item">
            <div class="info-left" style="margin-bottom: 6px">
              {{ $t("message.strategyDetail.tradingPairs") }}
            </div>
            <div class="info-right">
              <div
                v-for="(item, index) in tradingPairs"
                :key="index"
                class="trading-pairs"
              >
                <span>{{ item[0] }}</span>
                <img
                  style="width: 12px; margin-left: 5px"
                  src="@/assets/pairDirection.svg"
                  alt=""
                />
                <span style="margin-left: 5px">{{ item[1] }}</span>
              </div>
            </div>
          </div>
          <div class="info-item" style="margin-top: 14px">
            <div class="info-left">
              {{ $t("message.strategyDetail.stragegyExecFrequency") }}
            </div>
            <div class="info-right">
              {{ info.params.cron }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.pairExecInterval") }}
            </div>
            <div class="info-right">
              {{ info.params.pairExecInterval }}{{ $t("message.second") }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.gapThreshold") }}
              <ExplainButton
                :text="$t('message.strategyDetail.gapThresholdExplain')"
              ></ExplainButton>
            </div>
            <div class="info-right">{{ info.params.gapThreshold * 100 }}%</div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.burrThreshold") }}
              <ExplainButton
                :text="$t('message.strategyDetail.burrThresholdExplain')"
              ></ExplainButton>
            </div>
            <div class="info-right">
              {{ info.params.burrThreshold }} {{ $t("message.USDT") }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.hedgeThreshold") }}
              <ExplainButton
                :text="$t('message.strategyDetail.hedgeThresholdExplain')"
              ></ExplainButton>
            </div>
            <div class="info-right">
              {{ info.params.hedgeThreshold * 100 }}%
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.microOffset") }}
              <ExplainButton
                :text="$t('message.strategyDetail.microOffsetExplain')"
              ></ExplainButton>
            </div>
            <div class="info-right">{{ info.params.microOffset * 100 }}%</div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.createRetryTimes") }}
            </div>
            <div class="info-right">
              {{ info.params.createRetryTimes }}{{ $t("message.times") }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.createRetryInterval") }}
            </div>
            <div class="info-right">
              {{ info.params.createRetryInterval }}{{ $t("message.second") }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.queryRetryTimes") }}
            </div>
            <div class="info-right">
              {{ info.params.queryRetryTimes }}{{ $t("message.times") }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.queryRetryInterval") }}
            </div>
            <div class="info-right">
              {{ info.params.queryRetryInterval }}{{ $t("message.second") }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.cancelRetryTimes") }}
            </div>
            <div class="info-right">
              {{ info.params.cancelRetryTimes }}{{ $t("message.times") }}
            </div>
          </div>
          <div class="info-item">
            <div class="info-left">
              {{ $t("message.strategyDetail.cancelRetryInterval") }}
            </div>
            <div class="info-right">
              {{ info.params.cancelRetryInterval }}{{ $t("message.second") }}
            </div>
          </div>
          <div class="info-item" style="margin-bottom: 30px">
            <div class="info-left">{{ $t("message.status") }}</div>
            <div class="info-right">
              {{
                info.isActive
                  ? $t("message.strategyInfo.activing")
                  : $t("message.strategyInfo.notActivated")
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchStrategyById, updateStrategy } from "@/js/api/v1/strategy";
import ExplainButton from "@/components/explain-button";
import strategyActivateDialog from "@/components/strategy-activate";
import strategyBanDialog from "@/components/strategy-ban";
import { Loading } from "element-ui";

export default {
  name: "StrategyDetail",
  beforeRouteEnter(to, from, next) {
    const { id } = to.params;
    next(async (vm) => {
      const inst = Loading.service({
        fullscreen: false,
        target: vm.$refs.strategyDetail,
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        const res = await fetchStrategyById(vm.userInfo.address, id);
        if (res.isSuccess()) {
          vm.info = res.data;
        } else {
          vm.$router.push("/strategyManage/strategyList");
        }
      } catch (error) {
        vm.$message.error(error.message || error);
        vm.$router.push("/strategyManage/strategyList");
      } finally {
        inst.close();
      }
    });
  },
  data() {
    return {
      currentModule: "strategy",
      isAuthWrite: true,
      info: {},
    };
  },
  async mounted() {
    if (this.userInfo.modules) {
      const auth = this.userInfo.modules.find(
        (m) => m.module == this.currentModule
      ).auth;
      this.isAuthWrite = auth.indexOf("w") > -1;
    }
  },
  components: {
    ExplainButton,
  },
  computed: {
    ...mapGetters(["userInfo"]),
    tradingPairs() {
      if (!this.info) {
        return [];
      }
      const pairs = this.info.params.pairs.split(",");
      return pairs.map((item) => {
        return item.split("/");
      });
    },
  },
  methods: {
    strategyBan() {
      strategyBanDialog().show(async () => {
        const data = Object.assign({}, this.info, {
          isActive: false,
          _id: undefined,
        });
        try {
          const res = await updateStrategy(
            this.userInfo.address,
            this.info._id,
            data
          );
          if (res.isSuccess()) {
            this.$message.success(this.$t("message.strategyBan.banSuccess"));
            const infoRes = await fetchStrategyById(
              this.userInfo.address,
              this.info._id
            );
            if (infoRes.isSuccess()) {
              this.info = infoRes.data;
            } else {
              this.$router.push("/strategyManage/strategyList");
            }
          }
        } catch (error) {
          this.$message.error(error.message || error);
        }
      });
    },
    strategyActivate() {
      strategyActivateDialog().show(async () => {
        const data = Object.assign({}, this.info, {
          isActive: true,
          _id: undefined,
        });
        try {
          const res = await updateStrategy(
            this.userInfo.address,
            this.info._id,
            data
          );
          if (res.isSuccess()) {
            this.$message.success(
              this.$t("message.strategyActivate.activateSuccess")
            );
            const infoRes = await fetchStrategyById(
              this.userInfo.address,
              this.info._id
            );
            if (infoRes.isSuccess()) {
              this.info = infoRes.data;
            } else {
              this.$router.push("/strategyManage/strategyList");
            }
          }
        } catch (error) {
          this.$message.error(error.message || error);
        }
      });
    },
    zhType(type) {
      switch (type) {
        case "handicap":
          return this.$t("message.strategyInfo.handicap");
        case "arbitrage":
          return this.$t("message.strategyInfo.arbitrage");
        case "hedge":
          return this.$t("message.strategyInfo.hedge");
        case "position":
          return this.$t("message.strategyInfo.position");
        case "fund":
          return this.$t("message.strategyInfo.fund");
        case "other":
          return this.$t("message.strategyInfo.other");
        default:
          return type;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.strategy-detail {
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
      justify-content: space-between;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(66, 70, 90, 1);
      .active-btn {
        border: 1px solid rgba(32, 166, 150, 1);
        color: rgba(0, 208, 183, 1);
      }
      .common-btn {
        border-radius: 20px;
        width: 80px;
        height: 30px;
        font-size: 14px;
        font-weight: 400;
      }
      .ban-btn {
        border: 1px solid rgba(248, 119, 70, 1);
        color: rgba(248, 119, 70, 1);
      }
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
          align-items: baseline;
          letter-spacing: -0.04px;
          font-size: 14px;
          color: rgba(179, 182, 187, 1);
        }
        .info-right {
          margin-right: 20px;
          color: rgba(255, 255, 255, 1);
          word-break: break-word;
          text-align: left;
          display: flex;
          flex-wrap: wrap;
          .trading-pairs {
            height: 30px;
            border-radius: 6px;
            background: rgba(42, 51, 56, 1);
            padding: 0px 10px;
            display: flex;
            align-items: center;
            margin-right: 10px;
            margin-bottom: 6px;
          }
        }
      }
    }
  }
}
</style>
