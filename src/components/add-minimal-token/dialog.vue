<template>
  <div id="add-minimal-token">
    <el-dialog :visible.sync="visible" width="600px" @close="resetForm">
      <div slot="title" class="title">
        {{ $t("message.addMinimalToken.title") }}
      </div>
      <div class="content">
        <el-form :model="token" ref="form">
          <el-form-item
            :label="$t('message.exchangeInfo.token') + ':'"
            prop="name"
            style="display: flex"
          >
            <el-select
              v-model="token.name"
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
          </el-form-item>
          <el-form-item
            :label="
              $t('message.exchangeInfo.minimalToken', { token: '' }) + ':'
            "
            prop="node"
            style="display: flex"
          >
            <el-input
              type="number"
              v-model="token.value"
              :placeholder="$t('message.addMinimalToken.pleaseEnterPrice')"
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="btn-group" style="margin-top: 80px">
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
      token: {
        name: "",
        value: "",
      },
    };
  },
  computed: {
    ...mapGetters(["allTokens"]),
    isConfirm() {
      return this.token.name && this.token.value;
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
      const { name, value } = this.token;
      await this.fun(name, Number(value));
      this.loading = false;
      this.close();
    },
    close() {
      this.visible = false;
      this.resetForm();
    },
    resetForm() {
      this.token = {
        name: "",
        value: "",
      };
    },
  },
};
</script>

<style lang="scss">
#add-minimal-token {
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
.content {
  .add-minimal-token {
    width: 100%;
    height: 36px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(232, 233, 234, 1);
    font-size: 14px;
    font-weight: 400;
    color: rgba(127, 127, 227, 1);
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
    &:hover {
      color: rgba(127, 127, 227, 1);
      border: 1px solid rgba(132, 132, 221, 1);
    }
  }
  .confirm {
    background: rgba(132, 132, 221, 1);
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
