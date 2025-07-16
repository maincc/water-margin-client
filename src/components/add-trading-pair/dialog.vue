<template>
  <div id="add-trading-pair">
    <el-dialog :visible.sync="visible" width="600px" @close="resetForm">
      <div slot="title" class="title">
        {{ $t("message.addTradingPair.title") }}
      </div>
      <div class="content">
        <div>{{ $t("message.addTradingPair.selectTradingPair") }}:</div>
        <div class="select-div" style="margin-top: 20px">
          <el-select
            v-model="pair[0]"
            :placeholder="$t('message.addMinimalToken.pleaseSelectToken')"
            style="width: 100%"
            popper-class="minimal-token-select"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in selectTokens"
              :key="item.symbol"
              :label="item.symbol"
              :value="item.symbol"
            >
            </el-option>
          </el-select>
          <img style="margin: 0 10px" src="@/assets/pairLogo.svg" alt="" />
          <el-select
            v-model="pair[1]"
            :placeholder="$t('message.addMinimalToken.pleaseSelectToken')"
            style="width: 100%"
            popper-class="minimal-token-select"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in selectTokens"
              :key="item.symbol"
              :label="item.symbol"
              :value="item.symbol"
            >
            </el-option>
          </el-select>
        </div>

        <div class="btn-group" style="margin-top: 30px">
          <el-button
            type="primary"
            :disabled="!isConfirm"
            :loading="loading"
            @click="confirm"
            class="btn confirm"
            >{{ $t("message.confirm") }}</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AccountRole } from "@/js/constant/account";
import { urlWithIpRegex } from "@/js/constant/index";

export default {
  name: "Dialog",
  data() {
    return {
      visible: false,
      loading: false,
      fun: null,
      pair: ["", ""],
    };
  },
  computed: {
    ...mapGetters(["allTokens"]),
    isConfirm() {
      return this.pair[0] && this.pair[1] && this.pair[0] !== this.pair[1];
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
    show(fun) {
      this.fun = fun;
      this.visible = true;
    },
    async confirm() {
      this.loading = true;
      await this.fun(this.pair);
      this.loading = false;
      this.close();
    },
    close() {
      this.visible = false;
      this.resetForm();
    },
    resetForm() {
      this.pair = ["", ""];
    },
  },
};
</script>

<style lang="scss">
#add-trading-pair {
  .el-dialog {
    border-radius: 30px;
    .el-dialog__header {
      padding: 16px 20px 15px;
      border-bottom: 1px solid rgba(232, 233, 234, 1);
    }
    .el-dialog__body {
      padding: 30px 70px;
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
.select-div {
  display: flex;
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
