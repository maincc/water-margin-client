<template>
  <div class="new-handicap" id="new-handicap">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item
        :label="$t('message.strategyInfo.name') + ':'"
        prop="name"
        style="display: flex"
      >
        <el-input
          v-model="form.name"
          :placeholder="$t('message.newStrategy.pleaseEnterName')"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('message.strategyDetail.letDexAccount') + ':'"
        prop="params.letsdexAccount"
        style="display: flex"
      >
        <el-input
          v-model="form.params.letsdexAccount"
          :placeholder="$t('message.newStrategy.pleaseEnterLetsdexAccount')"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('message.strategyDetail.rivalExchange') + ':'"
        prop="params.exchange"
        style="display: flex"
      >
        <el-select
          style="width: 100%"
          v-model="form.params.exchange"
          :placeholder="$t('message.newStrategy.pleaseSelectExchange')"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in exchangeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('message.strategyDetail.rivalExchangeAccount') + ':'"
        prop="params.exchangeAccount"
        style="display: flex"
      >
        <el-input
          v-model="form.params.exchangeAccount"
          :placeholder="$t('message.newStrategy.pleaseEnterExchangeAccount')"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('message.newStrategy.tradingPairs') + ':'"
        style="display: flex"
      >
        <el-button class="add-pair" @click="addTradingPair">
          <div class="add-pair-div">
            <img
              style="width: 14px; margin-right: 10px"
              src="@/assets/add.svg"
              alt=""
            />
            <div>{{ $t("message.newStrategy.addTradingPair") }}</div>
          </div>
        </el-button>
        <div
          v-if="form.params.pairs.length > 0"
          style="margin-top: 4px"
          class="show-pairs-div"
        >
          <div
            v-for="(item, index) in form.params.pairs"
            :key="index"
            class="pair-item"
          >
            <span style="margin-left: 5px">{{ item[0] }}</span>
            <img
              style="width: 12px; margin-left: 5px"
              src="@/assets/pairDirection.svg"
              alt=""
            />
            <span style="margin-left: 5px">{{ item[1] }}</span>
            <img
              @click="removePair(item)"
              style="
                width: 6px;
                margin-left: 8px;
                margin-right: 5px;
                cursor: pointer;
              "
              src="@/assets/fork.svg"
              alt=""
              srcset=""
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item
        :label="$t('message.strategyDetail.stragegyExecFrequency') + ':'"
        prop="params.cron"
        style="display: flex"
      >
        <el-input
          v-model="form.params.cron"
          :placeholder="
            $t('message.newStrategy.pleaseEnterStragegyExecFrequency')
          "
        >
        </el-input>
        <div
          class="cron-explain"
          @mouseover="isCronHover = true"
          @mouseleave="isCronHover = false"
          @click="cronExplain"
        >
          <img :src="cronExplainImg" alt="" />
          <span
            style="margin-left: 4px"
            :style="{ color: cronExplainFontColor }"
            >{{ $t("message.newStrategy.check") }}</span
          >
        </div>
      </el-form-item>

      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.pairExecInterval') + ':'"
        prop="params.pairExecInterval"
        style="display: flex"
      >
        <el-input
          type="number"
          v-model.number="form.params.pairExecInterval"
          :placeholder="$t('message.newStrategy.pleaseEnterPairExecInterval')"
        >
          <template #append>
            <div style="width: 38px">
              {{ $t("message.second") }}
            </div>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.gapThreshold') + ':'"
        prop="params.gapThreshold"
        style="display: flex"
      >
        <template #label>
          <div style="display: flex; align-items: center; position: relative">
            <div class="explain-css">
              <ExplainButton
                :text="$t('message.strategyDetail.gapThresholdExplain')"
              ></ExplainButton>
            </div>
            <span>{{ $t("message.strategyDetail.gapThreshold") }}:</span>
          </div>
        </template>
        <el-input
          type="number"
          v-model="form.params.gapThreshold"
          :placeholder="$t('message.newStrategy.pleaseEnterGapThreshold')"
        >
          <template #append>
            <div style="width: 38px">%</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.burrThreshold') + ':'"
        prop="params.burrThreshold"
        style="display: flex"
      >
        <template #label>
          <div style="display: flex; align-items: center; position: relative">
            <div class="explain-css">
              <ExplainButton
                :text="$t('message.strategyDetail.burrThresholdExplain')"
              ></ExplainButton>
            </div>
            <span>{{ $t("message.strategyDetail.burrThreshold") }}:</span>
          </div>
        </template>
        <el-input
          type="number"
          v-model="form.params.burrThreshold"
          :placeholder="$t('message.newStrategy.pleaseEnterBurrThreshold')"
        >
          <template #append>
            <div style="width: 62px">
              {{ $t("message.USDT") }}
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.hedgeThreshold') + ':'"
        prop="params.hedgeThreshold"
        style="display: flex"
      >
        <template #label>
          <div style="display: flex; align-items: center; position: relative">
            <div class="explain-css">
              <ExplainButton
                :text="$t('message.strategyDetail.hedgeThresholdExplain')"
              ></ExplainButton>
            </div>
            <span>{{ $t("message.strategyDetail.hedgeThreshold") }}:</span>
          </div>
        </template>
        <el-input
          type="number"
          v-model="form.params.hedgeThreshold"
          :placeholder="$t('message.newStrategy.pleaseEnterHedgeThreshold')"
        >
          <template #append>
            <div style="width: 38px">%</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.microOffset') + ':'"
        prop="params.microOffset"
        style="display: flex"
      >
        <template #label>
          <div style="display: flex; align-items: center; position: relative">
            <div class="explain-css">
              <ExplainButton
                :text="$t('message.strategyDetail.microOffsetExplain')"
              ></ExplainButton>
            </div>
            <span>{{ $t("message.strategyDetail.microOffset") }}:</span>
          </div>
        </template>
        <el-input
          type="number"
          v-model="form.params.microOffset"
          :placeholder="$t('message.newStrategy.pleaseEnterMicroOffset')"
        >
          <template #append>
            <div style="width: 38px">%</div>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.createRetryTimes') + ':'"
        prop="params.createRetryTimes"
        style="display: flex"
      >
        <el-input
          type="number"
          v-model.number="form.params.createRetryTimes"
          :placeholder="$t('message.newStrategy.pleaseEnterCreateRetryTimes')"
        >
          <template #append>
            <div style="width: 38px">
              {{ $t("message.times") }}
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.createRetryInterval') + ':'"
        prop="params.createRetryInterval"
        style="display: flex"
      >
        <el-input
          type="number"
          v-model.number="form.params.createRetryInterval"
          :placeholder="
            $t('message.newStrategy.pleaseEnterCreateRetryInterval')
          "
        >
          <template #append>
            <div style="width: 38px">
              {{ $t("message.second") }}
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.queryRetryTimes') + ':'"
        prop="params.queryRetryTimes"
        style="display: flex"
      >
        <el-input
          type="number"
          v-model.number="form.params.queryRetryTimes"
          :placeholder="$t('message.newStrategy.pleaseEnterQueryRetryTimes')"
        >
          <template #append>
            <div style="width: 38px">
              {{ $t("message.times") }}
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.queryRetryInterval') + ':'"
        prop="params.queryRetryInterval"
        style="display: flex"
      >
        <el-input
          type="number"
          v-model.number="form.params.queryRetryInterval"
          :placeholder="$t('message.newStrategy.pleaseEnterQueryRetryInterval')"
        >
          <template #append>
            <div style="width: 38px">
              {{ $t("message.second") }}
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.cancelRetryTimes') + ':'"
        prop="params.cancelRetryTimes"
        style="display: flex"
      >
        <el-input
          type="number"
          v-model.number="form.params.cancelRetryTimes"
          :placeholder="$t('message.newStrategy.pleaseEnterCancelRetryTimes')"
        >
          <template #append>
            <div style="width: 38px">
              {{ $t("message.times") }}
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        id="input-append"
        :label="$t('message.strategyDetail.cancelRetryInterval') + ':'"
        prop="params.cancelRetryInterval"
        style="display: flex"
      >
        <el-input
          type="number"
          v-model.number="form.params.cancelRetryInterval"
          :placeholder="
            $t('message.newStrategy.pleaseEnterCancelRetryInterval')
          "
        >
          <template #append>
            <div style="width: 38px">
              {{ $t("message.second") }}
            </div>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="sumbit-div">
      <el-button
        @click="addStrategy"
        :loading="loading"
        :disabled="!isSumbit"
        type="primary"
        class="sumbit-btn"
      >
        {{ $t("message.sumbit") }}
      </el-button>
      <el-checkbox style="margin: 15px 0 50px" v-model="form.isActive">{{
        $t("message.newStrategy.stragegyActiving")
      }}</el-checkbox>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import addTradingPairDialog from "@/components/add-trading-pair";
import ExplainButton from "@/components/explain-button";
import { isValidCron } from "cron-validator";
import { Wallet } from "@swtc/wallet";
import { createStrategy } from "@/js/api/v1/strategy";
import BigNumber from "bignumber.js";
import cronExplainDialog from "@/components/cron-explain";

export default {
  name: "new-handicap",
  data() {
    return {
      loading: false,
      rules: {
        "params.letsdexAccount": [
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (Wallet.isValidAddress(value)) {
                  callback();
                } else {
                  callback(this.$t("message.errorTip.errorLetsdexAccount"));
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        "params.cron": [
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (this.isValidCron(value)) {
                  callback();
                } else {
                  callback(this.$t("message.errorTip.errorCron"));
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      form: {
        name: "",
        type: "handicap",
        isActive: false,
        code: "nothing",
        params: {
          letsdexAccount: "",
          exchange: "",
          exchangeAccount: "",
          pairs: [],
          cron: "",

          pairExecInterval: "",
          gapThreshold: "",
          burrThreshold: "",
          hedgeThreshold: "",
          microOffset: "",

          createRetryTimes: "",
          createRetryInterval: "",
          queryRetryTimes: "",
          queryRetryInterval: "",
          cancelRetryTimes: "",
          cancelRetryInterval: "",
        },
      },
      isCronHover: false,
    };
  },
  components: {
    ExplainButton,
  },
  computed: {
    ...mapGetters(["userInfo", "allExchanges"]),
    cronExplainImg() {
      return this.isCronHover
        ? require("@/assets/cron-explain-select.svg")
        : require("@/assets/cron-explain.svg");
    },
    cronExplainFontColor() {
      return this.isCronHover
        ? "rgba(132, 132, 221, 1)"
        : "rgba(240, 145, 62, 1)";
    },
    isSumbit() {
      const { name, params } = this.form;
      const {
        letsdexAccount,
        exchange,
        exchangeAccount,
        pairs,
        cron,

        pairExecInterval,
        gapThreshold,
        burrThreshold,
        hedgeThreshold,
        microOffset,

        createRetryTimes,
        createRetryInterval,
        queryRetryTimes,
        queryRetryInterval,
        cancelRetryTimes,
        cancelRetryInterval,
      } = params;

      return (
        name &&
        Wallet.isValidAddress(letsdexAccount) &&
        exchange &&
        exchangeAccount &&
        pairs.length > 0 &&
        this.isValidCron(cron) &&
        pairExecInterval &&
        gapThreshold &&
        burrThreshold &&
        hedgeThreshold &&
        microOffset &&
        createRetryTimes &&
        createRetryInterval &&
        queryRetryTimes &&
        queryRetryInterval &&
        cancelRetryTimes &&
        cancelRetryInterval
      );
    },
    exchangeOptions() {
      const obj = [];
      this.allExchanges.forEach((item) => {
        if (item.name != "letsdex") {
          obj.push({
            value: item.name,
            label: item.name,
          });
        }
      });
      return obj;
    },
  },
  methods: {
    cronExplain() {
      cronExplainDialog().show();
    },
    async addStrategy() {
      this.loading = true;
      try {
        const pairs = this.form.params.pairs;
        const data = Object.assign({}, this.form, {
          params: {
            ...this.form.params,
            microOffset: BigNumber(this.form.params.microOffset)
              .div(100)
              .toNumber(),
            gapThreshold: BigNumber(this.form.params.gapThreshold)
              .div(100)
              .toNumber(),
            hedgeThreshold: BigNumber(this.form.params.hedgeThreshold)
              .div(100)
              .toNumber(),
            burrThreshold: Number(this.form.params.burrThreshold),
            pairs: pairs.map((pair) => pair.join("/")).join(","),
          },
        });
        console.log(data);
        const createRes = await createStrategy(this.userInfo.address, data);
        if (createRes.isSuccess()) {
          this.$message.success(this.$t("message.newStrategy.createSuccess"));
          this.$router.push("/strategyManage/detail/" + createRes.data._id);
        }
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    isValidCron(cron) {
      return isValidCron(cron, {
        seconds: true,
        alias: true,
        allowBlankDay: true,
        allowSevenAsSunday: true,
        allowNthWeekdayOfMonth: true,
      });
    },
    removePair(item) {
      this.form.params.pairs = this.form.params.pairs.filter(
        (i) => i[0] != item[0] || i[1] != item[1]
      );
    },
    addTradingPair() {
      addTradingPairDialog().show((data) => {
        const pairs = this.form.params.pairs;
        const pair = pairs.find(
          (item) => item[0] == data[0] && item[1] == data[1]
        );
        if (!pair) {
          this.form.params.pairs.push(data);
        }
      });
    },
  },
};
</script>

<style lang="scss">
#new-handicap {
  .el-checkbox__label {
    color: rgba(255, 255, 255, 1);
  }
}
</style>

<style lang="scss" scoped>
.new-handicap {
  .add-pair {
    width: 100%;
    height: 40px;
    border-radius: 6px;
    background: rgba(13, 26, 33, 1);
    border: 1px solid rgba(66, 70, 90, 1);
    font-size: 14px;
    color: rgba(177, 177, 255, 1);
    .add-pair-div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .show-pairs-div {
    width: 100%;
    border-radius: 6px;
    background: rgba(22, 35, 41, 1);
    display: flex;
    flex-wrap: wrap;
    padding: 6px 9px;
    .pair-item {
      height: 26px;
      border-radius: 6px;
      background: rgba(41, 48, 52, 1);
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      margin: 4px 6px;
      display: flex;
      align-items: center;
    }
  }
  .explain-css {
    position: absolute;
    left: -25px;
  }
  .cron-explain {
    position: absolute;
    top: 0px;
    right: -52px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .sumbit-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .sumbit-btn {
      width: 120px;
      height: 40px;
      border-radius: 20px;
    }
  }
}
</style>
