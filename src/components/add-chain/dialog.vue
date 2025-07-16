<template>
  <div id="add-chain">
    <el-dialog :visible.sync="visible" width="600px" @close="resetForm">
      <div slot="title" class="title">
        {{ $t("message.addChain.title") }}
      </div>
      <div class="content">
        <el-form
          :model="form"
          ref="form"
          label-width="148px"
          class="demo-ruleForm"
        >
          <el-form-item
            :label="$t('message.chainInfo.chain') + ':'"
            prop="name"
          >
            <el-input
              v-model="form.name"
              :placeholder="$t('message.addChain.pleaseEnterName')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('message.chainInfo.bip44') + ':'"
            prop="bip44"
          >
            <el-input
              type="number"
              v-model="form.bip44"
              :placeholder="$t('message.addChain.pleaseEnterBip44')"
            ></el-input>
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

export default {
  name: "Dialog",
  data() {
    return {
      visible: false,
      loading: false,
      fun: null,
      form: {
        name: "",
        bip44: "",
      },
    };
  },
  computed: {
    ...mapGetters(["allModules"]),
    isConfirm() {
      const { name, bip44 } = this.form;
      return name && bip44;
    },
  },
  methods: {
    show(fun) {
      this.fun = fun;
      this.visible = true;
    },
    async confirm() {
      this.loading = true;
      await this.fun(
        Object.assign({}, this.form, {
          logo: `${this.form.name}.png`,
          bip44: Number(this.form.bip44),
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
        name: "",
        bip44: "",
      };
    },
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
