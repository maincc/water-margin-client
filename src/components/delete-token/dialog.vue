<template>
  <div id="delete-token">
    <el-dialog :visible.sync="visible" width="600px">
      <div slot="title" class="title">
        {{ $t("message.deleteToken.title") }}
      </div>
      <div class="content">
        <div style="display: flex; justify-content: center; margin-top: 33px">
          {{
            $t("message.deleteToken.confirmDelete", {
              name: info ? info.name : "- -",
            })
          }}
        </div>
        <div class="btn-group" style="margin-top: 66px">
          <el-button @click="close" class="btn cancle">{{
            $t("message.cancel")
          }}</el-button>
          <el-button
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
      info: null,
      loading: false,
      fun: null,
    };
  },
  computed: {
    ...mapGetters(["allModules"]),
  },
  methods: {
    show(info, fun) {
      this.info = info;
      this.fun = fun;
      this.visible = true;
    },
    async confirm() {
      this.loading = true;
      await this.fun();
      this.loading = false;
      this.close();
    },
    close() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
#delete-token {
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
