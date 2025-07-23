<template>
  <div class="create-order-buy" id="create-order-buy">
    <el-form ref="form" :model="form" label-width="148px">
      <el-form-item
        :label="$t('message.projectTask.platform') + ':'"
        prop="platform"
      >
        <el-select
          style="width: 100%"
          v-model="form.platform"
          :placeholder="$t('message.createOrder.pleaseChoosePlatform')"
        >
          <el-option
            v-for="item in allExchanges"
            :key="item._id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('message.projectTask.account') + ':'"
        prop="account"
      >
        <el-input
          v-model="form.account"
          :placeholder="$t('message.createOrder.pleaseEnterAccount')"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="pairs"
        :label="$t('message.strategyDetail.tradingPairs') + ':'"
      >
        <div class="pair-group" id="pair-group">
          <el-select
            style="width: 135px"
            v-model="form.base"
            :placeholder="$t('message.token')"
            popper-class="minimal-token-select"
            :popper-append-to-body="false"
            @change="
              form.baseId = selectTokens.find(
                (item) => item.symbol === form.base
              )._id
            "
          >
            <el-option
              v-for="item in selectTokens"
              :key="item._id"
              :label="item.symbol"
              :value="item.symbol"
            >
            </el-option>
          </el-select>
          <img style="width: 20px" src="@/assets/pairLogo.svg" alt="" />
          <el-select
            style="width: 135px"
            v-model="form.counter"
            :placeholder="$t('message.token')"
            popper-class="minimal-token-select"
            :popper-append-to-body="false"
            @change="
              form.counterId = selectTokens.find(
                (item) => item.symbol === form.counter
              )._id
            "
          >
            <el-option
              v-for="item in selectTokens"
              :key="item._id"
              :label="item.symbol"
              :value="item.symbol"
            >
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item
        :label="$t('message.createOrder.buyPrice') + ':'"
        prop="account"
      >
        <el-input type="number" v-model="form.price" placeholder="0"></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('message.createOrder.buyAmount') + ':'"
        prop="account"
      >
        <el-input
          type="number"
          v-model="form.amount"
          placeholder="0"
        ></el-input>
      </el-form-item>
    </el-form>
    <div
      style="
        display: flex;
        border-radius: 4px;
        background: rgba(250, 250, 250, 1);
        font-size: 14px;
        color: rgba(157, 169, 181, 1);
        border: 1px solid rgba(232, 233, 234, 1);
      "
    >
      <span style="margin: 5px 14px"
        >{{ $t("message.createOrder.tradingTotal") }}:</span
      >
      <div
        style="
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        {{ tradingTotal }} {{ form.counter }}
      </div>
    </div>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 30px 0 0;
      "
    >
      <el-button class="btn close-btn" @click="close()">{{
        $t("message.cancel")
      }}</el-button>
      <el-button
        type="primary"
        :disabled="!isConfirm"
        style="margin-left: 60px"
        class="btn comfirm-btn"
        @click="
          confirm(
            Object.assign({}, form, {
              amount: Number(form.amount),
              price: Number(form.price),
            })
          )
        "
        >{{ $t("message.confirm") }}</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { BigNumber } from "bignumber.js";

export default {
  name: "CreateOrderBuy",
  data() {
    return {
      form: {
        type: "createOrder",
        side: "buy",
        platform: null,
        account: null,
        base: null,
        baseId: null,
        counter: null,
        counterId: null,
        amount: null,
        price: null,
      },
    };
  },
  props: {
    close: {
      type: Function,
      default: () => {},
    },
    confirm: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["allExchanges", "allTokens"]),
    tradingTotal() {
      if (
        this.form.amount &&
        this.form.price &&
        this.form.base &&
        this.form.counter
      ) {
        return new BigNumber(this.form.amount)
          .times(this.form.price)
          .toString();
      }
      return "- -";
    },
    isConfirm() {
      const {
        platform,
        account,
        base,
        baseId,
        counter,
        counterId,
        amount,
        price,
      } = this.form;
      return (
        platform &&
        account &&
        base &&
        baseId &&
        counter &&
        counterId &&
        amount &&
        price &&
        baseId != counterId
      );
    },
    selectTokens() {
      return this.sortBySymbol(this.allTokens);
    },
  },
  methods: {
    sortBySymbol(array) {
      const sortedArray = [...array];
      sortedArray.sort((a, b) => a.symbol.localeCompare(b.symbol));
      return sortedArray;
    },
  },
};
</script>

<style lang="scss" scoped>
.create-order-buy {
  padding-top: 20px;
  .pair-group {
    display: flex;
    justify-content: space-between;
  }
  .btn {
    width: 100px;
    height: 36px;
    border-radius: 20px;
    font-size: 14px;
  }
  .close-btn {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(232, 233, 234, 1);
    color: rgba(81, 86, 95, 1);
  }
  .comfirm-btn {
    background: rgba(216, 64, 92, 1);
    color: rgba(255, 255, 255, 1);
  }
}
</style>
