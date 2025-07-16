<template>
  <div id="modify-exchange">
    <el-dialog :visible.sync="visible" width="600px" @close="resetForm">
      <div slot="title" class="title">
        {{ $t("message.modifyExchange.title") }}
      </div>
      <div class="content">
        <el-form :model="form" ref="form">
          <el-form-item
            :label="$t('message.exchangeInfo.name') + ':'"
            prop="name"
            style="display: flex"
          >
            <el-input
              v-model="form.name"
              :placeholder="$t('message.addExchange.pleaseEnterName')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('message.exchangeInfo.node') + ':'"
            prop="node"
            style="display: flex"
          >
            <el-input
              v-model="form.node"
              :placeholder="$t('message.addExchange.pleaseEnterNode')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('message.exchangeInfo.browser') + ':'"
            prop="browser"
            style="display: flex"
          >
            <el-input
              v-model="form.browser"
              :placeholder="$t('message.addExchange.pleaseEnterBrowser')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('message.exchangeInfo.tranServer') + ':'"
            prop="tran_server"
            style="display: flex"
          >
            <el-input
              v-model="form.tran_server"
              :placeholder="$t('message.addExchange.pleaseEnterTranServer')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('message.exchangeInfo.minimalToken', { name: '' }) + ':'"
            prop="minimal_value"
            style="display: flex"
          >
            <el-button @click="addMinimalToken" class="add-minimal-token">{{
              $t("message.addExchange.addMinimalToken")
            }}</el-button>
            <div v-if="minimalTokens.length" class="showMinimalToken">
              <div
                class="showMinimalToken-item"
                v-for="(item, index) in minimalTokens"
                :key="index"
              >
                <span>{{ item.name }}: {{ item.value }}</span>
                <img
                  @click="removeMinimalToken(item.name)"
                  style="width: 6px; margin-left: 10px; cursor: pointer"
                  src="@/assets/fork.svg"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item
            :label="$t('message.exchangeInfo.description') + ':'"
            prop="description"
            style="display: flex"
          >
            <el-input
              type="textarea"
              :rows="2"
              v-model="form.description"
              :placeholder="$t('message.addExchange.pleaseEnterDescription')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('message.exchangeInfo.native') + ':'"
            prop="native"
            style="display: flex"
          >
            <div style="height: 100%; display: flex; align-items: center">
              <el-radio
                style="width: 50%"
                v-model="form.native"
                :label="true"
                >{{ $t("message.yes") }}</el-radio
              >
              <el-radio
                style="width: 50%"
                v-model="form.native"
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
import { urlWithIpRegex } from "@/js/constant/index";
import addMinimalTokenDialog from "@/components/add-minimal-token";
import _ from "lodash";

export default {
  name: "Dialog",
  data() {
    return {
      visible: false,
      loading: false,
      fun: null,
      form: {
        name: "",
        node: "",
        browser: "",
        tran_server: "",
        minimal_value: {},
        description: "",
        native: false,
      },
      info: {},
    };
  },
  computed: {
    ...mapGetters(["allModules"]),
    isConfirm() {
      const { name, node, browser, tran_server, minimal_value, description } =
        this.form;
      const isUrl =
        urlWithIpRegex.test(node) &&
        urlWithIpRegex.test(browser) &&
        urlWithIpRegex.test(tran_server);
      return (
        name &&
        node &&
        browser &&
        tran_server &&
        Object.keys(minimal_value).length &&
        description &&
        isUrl &&
        !_.isEqual(this.form, this.info)
      );
    },
    minimalTokens() {
      const keys = Object.keys(this.form.minimal_value);
      return keys.map((key) => {
        return {
          name: key,
          value: this.form.minimal_value[key],
        };
      });
    },
  },
  methods: {
    addMinimalToken() {
      addMinimalTokenDialog().show((name, value) => {
        const obj = {};
        obj[name] = value;
        this.form.minimal_value = Object.assign(
          {},
          this.form.minimal_value,
          obj
        );
      });
    },
    removeMinimalToken(name) {
      this.form.minimal_value = _.omit(this.form.minimal_value, name);
    },
    show(info, fun) {
      this.info = info;
      this.form = _.cloneDeep(info);
      this.fun = fun;
      this.visible = true;
    },
    async confirm() {
      this.loading = true;
      await this.fun(Object.assign({}, this.form));
      this.loading = false;
      this.close();
    },
    close() {
      this.visible = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: "",
        node: "",
        browser: "",
        tran_server: "",
        minimal_value: {},
        description: "",
      };
    },
  },
};
</script>

<style lang="scss">
#modify-exchange {
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
  }
  .confirm {
    background: rgba(132, 132, 221, 1);
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
  }
}
.showMinimalToken {
  width: calc(100% - 10px);
  padding: 5px;
  border-radius: 6px;
  background: rgba(250, 250, 250, 1);
  display: flex;
  flex-wrap: wrap;
  .showMinimalToken-item {
    border-radius: 6px;
    background: rgba(240, 240, 240, 1);
    height: 26px;
    font-size: 12px;
    font-weight: 400;
    width: max-content;
    display: flex;
    line-height: 16.8px;
    align-items: center;
    padding: 0 5px;
    margin: 5px;
  }
}
</style>
