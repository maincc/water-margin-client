<template>
  <div id="modify-token">
    <el-dialog :visible.sync="visible" width="600px" @close="resetForm">
      <div slot="title" class="title">
        {{ $t("message.modifyToken.title") }}
      </div>
      <div class="content">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item
            label-width="136"
            :label="$t('message.tokenInfo.chain') + ':'"
            prop="bip44"
            style="display: flex"
          >
            <el-select
              v-model="form.bip44"
              :placeholder="$t('message.addToken.pleaseChooseChain')"
              style="width: 100%"
              @change="changeChain"
            >
              <el-option
                v-for="item in chainOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label-width="136"
            :label="$t('message.tokenInfo.name') + ':'"
            prop="name"
            style="display: flex"
          >
            <el-input
              v-model="form.name"
              :placeholder="$t('message.addToken.pleaseEnterName')"
            ></el-input>
          </el-form-item>

          <el-form-item
            label-width="136"
            :label="$t('message.tokenInfo.symbol') + ':'"
            prop="symbol"
            style="display: flex"
          >
            <el-input
              v-model="form.symbol"
              :placeholder="$t('message.addToken.pleaseEnterSymbol')"
            ></el-input>
          </el-form-item>

          <el-form-item
            label-width="136"
            :label="$t('message.tokenInfo.decimals') + ':'"
            prop="decimals"
            style="display: flex"
          >
            <el-input
              type="number"
              v-model="form.decimals"
              :placeholder="$t('message.addToken.pleaseEnterDecimals')"
            ></el-input>
          </el-form-item>

          <div v-if="form.bip44 && form.bip44 == swtcBip44">
            <el-form-item
              label-width="136"
              :label="$t('message.tokenInfo.issuer') + ':'"
              prop="issuer"
              style="display: flex"
            >
              <el-input
                v-model="form.issuer"
                :placeholder="$t('message.addToken.pleaseEnterIssuer')"
              ></el-input>
            </el-form-item>
          </div>

          <div v-else-if="form.bip44">
            <el-form-item
              label-width="136"
              :label="$t('message.tokenInfo.contract') + ':'"
              prop="contract"
              style="display: flex"
            >
              <el-input
                v-model="form.contract"
                :placeholder="$t('message.addToken.pleaseEnterContract')"
              ></el-input>
            </el-form-item>

            <el-form-item
              label-width="136"
              :label="$t('message.tokenInfo.mirrorName') + ':'"
              prop="mirrorName"
              style="display: flex"
            >
              <el-input
                v-model="form.mirrorName"
                :placeholder="$t('message.addToken.pleaseEnterMirrorName')"
              ></el-input>
            </el-form-item>

            <el-form-item
              label-width="136"
              :label="$t('message.tokenInfo.mirrorIssuer') + ':'"
              prop="mirrorIssuer"
              style="display: flex"
            >
              <el-input
                v-model="form.mirrorIssuer"
                :placeholder="$t('message.addToken.pleaseEnterMirrorIssuer')"
              ></el-input>
            </el-form-item>
          </div>

          <el-form-item
            label-width="136"
            :label="$t('message.tokenInfo.isNative') + ':'"
            prop="isNative"
            style="display: flex"
          >
            <div style="height: 100%; display: flex; align-items: center">
              <el-radio
                style="width: 50%"
                v-model="form.isNative"
                :label="true"
                >{{ $t("message.yes") }}</el-radio
              >
              <el-radio
                style="width: 50%"
                v-model="form.isNative"
                :label="false"
                >{{ $t("message.no") }}</el-radio
              >
            </div>
          </el-form-item>
        </el-form>

        <div class="btn-group" style="margin-top: 30px">
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
import { SWTC_BIP44 } from "@/js/constant";
import { Wallet } from "@swtc/wallet";
import Web3 from "web3";
const web3 = new Web3();

export default {
  name: "Dialog",
  data() {
    return {
      info: {},
      form: {
        bip44: "",
        name: "",
        symbol: "",
        decimals: "",
        isNative: true,
        issuer: "",
        contract: "",
        mirrorName: "",
        mirrorIssuer: "",
      },
      rules: {
        issuer: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (Wallet.isValidAddress(value)) {
                  callback();
                } else {
                  callback(this.$t("message.errorTip.errorIssuer"));
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        contract: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (web3.utils.isAddress(value)) {
                  callback();
                } else {
                  callback(this.$t("message.errorTip.errorContract"));
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        mirrorIssuer: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (web3.utils.isAddress(value)) {
                  callback();
                } else {
                  callback(this.$t("message.errorTip.errorMirrorIssuer"));
                }
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      visible: false,
      loading: false,
      fun: null,
      chainOptions: [],
      swtcBip44: SWTC_BIP44,
    };
  },
  created() {
    if (this.allChains) {
      this.allChains.forEach((chain) => {
        this.chainOptions.push({
          value: chain.bip44,
          label: chain.name,
        });
      });
    }
  },
  computed: {
    ...mapGetters(["allChains"]),
    isConfirm() {
      const {
        bip44,
        name,
        symbol,
        decimals,
        issuer,
        contract,
        mirrorName,
        mirrorIssuer,
      } = this.form;
      if (bip44 && name && symbol && decimals) {
        if (bip44 == this.swtcBip44 && issuer) {
          if (Wallet.isValidAddress(issuer)) {
            if (this.isModified()) {
              return true;
            }
          }
          return false;
        } else if (
          bip44 != this.swtcBip44 &&
          contract &&
          mirrorName &&
          mirrorIssuer
        ) {
          if (
            web3.utils.isAddress(contract) &&
            web3.utils.isAddress(mirrorIssuer)
          ) {
            if (this.isModified()) {
              return true;
            }
          }
          return false;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  methods: {
    isModified() {
      const {
        bip44,
        name,
        symbol,
        decimals,
        issuer,
        contract,
        mirrorName,
        mirrorIssuer,
        isNative,
      } = this.form;
      const {
        bip44: oldBip44,
        name: oldName,
        symbol: oldSymbol,
        decimals: oldDecimals,
        issuer: oldIssuer,
        contract: oldContract,
        mirrorName: oldMirrorName,
        mirrorIssuer: oldMirrorIssuer,
        isNative: oldIsNative,
      } = this.info;
      if (
        bip44 != oldBip44 ||
        name != oldName ||
        symbol != oldSymbol ||
        decimals != oldDecimals ||
        issuer != oldIssuer ||
        contract != oldContract ||
        mirrorName != oldMirrorName ||
        mirrorIssuer != oldMirrorIssuer ||
        isNative != oldIsNative
      ) {
        return true;
      } else {
        return false;
      }
    },
    changeChain(value) {
      const infoBip44 = this.info.bip44;
      if (value == this.swtcBip44) {
        if (infoBip44 == this.swtcBip44) {
          this.form.issuer = this.info.issuer;
        } else {
          this.form.issuer = "";
        }
        this.form.contract = "";
        this.form.mirrorName = "";
        this.form.mirrorIssuer = "";
      } else {
        if (infoBip44 == this.swtcBip44) {
          this.form.issuer = "";
        } else {
          this.form.issuer = this.info.issuer || this.info.issuer;
        }
        this.form.contract = this.form.contract || this.info.contract;
        this.form.mirrorName = this.form.mirrorName || this.info.mirrorName;
        this.form.mirrorIssuer =
          this.form.mirrorIssuer || this.info.mirrorIssuer;
      }
      this.form.bip44 = value;
      this.$refs.form.clearValidate();
    },
    show(info, fun) {
      this.info = info;
      const {
        bip44,
        name,
        symbol,
        decimals,
        issuer,
        contract,
        mirrorName,
        mirrorIssuer,
        isNative,
      } = info;
      this.form = {
        bip44: bip44,
        name: name,
        symbol: symbol,
        decimals: decimals,
        isNative: isNative,
        issuer: issuer,
        contract: contract,
        mirrorName: mirrorName,
        mirrorIssuer: mirrorIssuer,
      };
      this.fun = fun;
      this.visible = true;
    },
    async confirm() {
      this.loading = true;
      await this.fun(
        Object.assign(this.form, {
          logo: `${this.form.symbol.toUpperCase()}.png`,
          issuer: this.form.issuer ? this.form.issuer : this.form.contract,
          decimals: Number(this.form.decimals),
        })
      );
      this.loading = false;
      this.close();
    },
    close() {
      this.visible = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        bip44: "",
        name: "",
        symbol: "",
        decimals: "",
        isNative: true,
        issuer: "",
        contract: "",
        mirrorName: "",
        mirrorIssuer: "",
      };
      this.$refs.form.clearValidate();
    },
  },
};
</script>

<style lang="scss">
#modify-token {
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
