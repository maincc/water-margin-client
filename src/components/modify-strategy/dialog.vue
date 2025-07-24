<template>
  <div id="add-chain">
    <el-dialog :visible.sync="visible" width="1000px" @close="resetForm">
      <div slot="title" class="title">
        {{ $t("message.modifyStrategy.title") }}
      </div>
      <div class="content">
        <el-form ref="info" :model="info" :rules="rules" label-width="158px">
          <div class="form-div">
            <div class="form-left">
              <el-form-item
                :label="$t('message.strategyInfo.name') + ':'"
                prop="name"
              >
                <el-input
                  v-model="info.name"
                  :placeholder="$t('message.newStrategy.pleaseEnterName')"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('message.strategyDetail.letDexAccount') + ':'"
                prop="params.letsdexAccount"
              >
                <el-input
                  v-model="info.params.letsdexAccount"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterLetsdexAccount')
                  "
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('message.strategyDetail.rivalExchange') + ':'"
                prop="params.exchange"
              >
                <el-select
                  style="width: 100%"
                  v-model="info.params.exchange"
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
              >
                <el-input
                  v-model="info.params.exchangeAccount"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterExchangeAccount')
                  "
                ></el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.burrThreshold') + ':'"
                prop="params.burrThreshold"
              >
                <el-input
                  type="number"
                  v-model="info.params.burrThreshold"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterBurrThreshold')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 62px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      {{ $t("message.USDT") }}
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.hedgeThreshold') + ':'"
                prop="params.hedgeThreshold"
              >
                <el-input
                  type="number"
                  v-model="info.params.hedgeThreshold"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterHedgeThreshold')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      %
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.microOffset') + ':'"
                prop="params.microOffset"
              >
                <el-input
                  type="number"
                  v-model="info.params.microOffset"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterMicroOffset')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      %
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                :label="$t('message.newStrategy.tradingPairs') + ':'"
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
                <div v-if="info.params.pairs.length > 0" class="show-pairs-div">
                  <div
                    v-for="(item, index) in info.params.pairs.slice(0, 3)"
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
                  <div
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 42px;
                      cursor: pointer;
                    "
                    class="pair-item"
                    v-if="info.params.pairs.length > 3"
                    @click="showAllPairs(info.params.pairs)"
                  >
                    ...
                  </div>
                </div>
              </el-form-item>
            </div>

            <div class="form-right" style="margin-left: 64px">
              <el-form-item
                :label="
                  $t('message.strategyDetail.stragegyExecFrequency') + ':'
                "
                prop="params.cron"
              >
                <el-input
                  v-model="info.params.cron"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterStragegyExecFrequency')
                  "
                >
                </el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.pairExecInterval') + ':'"
                prop="params.pairExecInterval"
              >
                <el-input
                  type="number"
                  v-model.number="info.params.pairExecInterval"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterPairExecInterval')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      {{ $t("message.second") }}
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.gapThreshold') + ':'"
                prop="params.gapThreshold"
              >
                <el-input
                  type="number"
                  v-model="info.params.gapThreshold"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterGapThreshold')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      %
                    </div>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.createRetryTimes') + ':'"
                prop="params.createRetryTimes"
              >
                <el-input
                  type="number"
                  v-model.number="info.params.createRetryTimes"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterCreateRetryTimes')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      {{ $t("message.times") }}
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.createRetryInterval') + ':'"
                prop="params.createRetryInterval"
              >
                <el-input
                  type="number"
                  v-model.number="info.params.createRetryInterval"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterCreateRetryInterval')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      {{ $t("message.second") }}
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.queryRetryTimes') + ':'"
                prop="params.queryRetryTimes"
              >
                <el-input
                  type="number"
                  v-model.number="info.params.queryRetryTimes"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterQueryRetryTimes')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      {{ $t("message.times") }}
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.queryRetryInterval') + ':'"
                prop="params.queryRetryInterval"
              >
                <el-input
                  type="number"
                  v-model.number="info.params.queryRetryInterval"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterQueryRetryInterval')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      {{ $t("message.second") }}
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.cancelRetryTimes') + ':'"
                prop="params.cancelRetryTimes"
              >
                <el-input
                  type="number"
                  v-model.number="info.params.cancelRetryTimes"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterCancelRetryTimes')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      {{ $t("message.times") }}
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item
                id="input-append-white"
                :label="$t('message.strategyDetail.cancelRetryInterval') + ':'"
                prop="params.cancelRetryInterval"
              >
                <el-input
                  type="number"
                  v-model.number="info.params.cancelRetryInterval"
                  :placeholder="
                    $t('message.newStrategy.pleaseEnterCancelRetryInterval')
                  "
                >
                  <template #append>
                    <div
                      style="
                        width: 38px;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      {{ $t("message.second") }}
                    </div>
                  </template>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>

        <div class="btn-group">
          <el-button @click="close" class="btn cancle">{{
            $t("message.cancel")
          }}</el-button>
          <el-button
            type="primary"
            :disabled="!isConfirm"
            :loading="loading"
            @click="confirm"
            style="margin-left: 60px"
            class="btn confirm"
            >{{ $t("message.confirm") }}</el-button
          >
        </div>
        <div style="margin-top: 10px; display: flex; justify-content: center">
          <el-checkbox v-model="info.isActive">
            {{ $t("message.newStrategy.stragegyActiving") }}
          </el-checkbox>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AccountRole } from "@/js/constant/account";
import { BigNumber } from "bignumber.js";
import addTradingPairDialog from "@/components/add-trading-pair";
import _ from "lodash";
import { Wallet } from "@swtc/wallet";
import { isValidCron } from "cron-validator";
import showAllPairs from "@/components/show-all-pairs";

export default {
  name: "Dialog",
  data() {
    return {
      visible: false,
      loading: false,
      fun: null,
      oldInfo: null,
      info: {
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
    };
  },
  computed: {
    ...mapGetters(["userInfo", "allExchanges"]),
    isConfirm() {
      const { name, params } = this.info;
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
        cancelRetryInterval &&
        !_.isEqual(this.info, this.oldInfo)
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
    showAllPairs(pairs) {
      showAllPairs().show(pairs, (data) => {
        this.info.params.pairs = _.cloneDeep(data);
      });
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
      this.info.params.pairs = this.info.params.pairs.filter(
        (i) => i[0] != item[0] || i[1] != item[1]
      );
    },
    addTradingPair() {
      addTradingPairDialog().show((data) => {
        const pairs = this.info.params.pairs;
        const pair = pairs.find(
          (item) => item[0] == data[0] && item[1] == data[1]
        );
        if (!pair) {
          this.info.params.pairs.push(data);
        }
      });
    },
    show(info, fun) {
      let pairs = info.params.pairs.split(",");
      pairs = pairs.map((item) => {
        return item.split("/");
      });
      this.oldInfo = Object.assign({}, info, {
        _id: undefined,
        params: {
          ...info.params,
          gapThreshold: new BigNumber(info.params.gapThreshold)
            .times(100)
            .toNumber(),
          hedgeThreshold: new BigNumber(info.params.gapThreshold)
            .times(100)
            .toNumber(),
          microOffset: new BigNumber(info.params.gapThreshold)
            .times(100)
            .toNumber(),
          pairs: pairs,
        },
      });
      this.info = _.cloneDeep(this.oldInfo);
      this.fun = fun;
      this.visible = true;
    },
    async confirm() {
      this.loading = true;
      const pairs = this.info.params.pairs;
      const data = Object.assign({}, this.info, {
        params: {
          ...this.info.params,
          microOffset: BigNumber(this.info.params.microOffset)
            .div(100)
            .toNumber(),
          gapThreshold: BigNumber(this.info.params.gapThreshold)
            .div(100)
            .toNumber(),
          hedgeThreshold: BigNumber(this.info.params.hedgeThreshold)
            .div(100)
            .toNumber(),
          burrThreshold: Number(this.info.params.burrThreshold),
          pairs: pairs.map((pair) => pair.join("/")).join(","),
        },
      });
      await this.fun(data);
      this.loading = false;
      this.close();
    },
    close() {
      this.visible = false;
      this.resetForm();
    },
    resetForm() {},
  },
};
</script>

<style lang="scss">
#add-chain {
  .el-dialog {
    border-radius: 30px;
    .el-dialog__header {
      padding: 16px 20px 15px;
      border-bottom: 1px solid rgba(232, 233, 234, 1);
    }
    .el-dialog__body {
      padding: 30px 40px;
    }
  }
}
</style>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: rgba(43, 44, 47, 1);
  text-align: left;
  vertical-align: top;
}
.form-div {
  width: 100%;
  display: flex;
  .form-left {
    width: 428px;
  }
  .form-right {
    width: 428px;
  }
  .add-pair {
    width: 100%;
    height: 40px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(232, 233, 234, 1);
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
    background: rgba(250, 250, 250, 1);
    display: flex;
    flex-wrap: wrap;
    .pair-item {
      height: 26px;
      border-radius: 6px;
      background: rgba(240, 240, 240, 1);
      font-size: 12px;
      color: rgba(43, 44, 47, 1);
      margin: 4px 6px;
      display: flex;
      align-items: center;
    }
  }
}
.btn-group {
  display: flex;
  justify-content: center;
  .btn {
    width: 100px;
    height: 36px;
    border-radius: 20px;
  }
  .cancle {
    border: 1px solid rgba(232, 233, 234, 1);
    font-size: 14px;
    color: rgba(81, 86, 95, 1);
  }
  .confirm {
    background: rgba(132, 132, 221, 1);
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
