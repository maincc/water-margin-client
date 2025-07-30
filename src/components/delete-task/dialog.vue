<template>
  <div id="delete-chain">
    <el-dialog :visible.sync="visible" width="600px">
      <div slot="title" class="title">
        {{ $t("message.deleteTask.title") }}
      </div>
      <div class="content">
        <div>
          <span
            >{{ $t("message.projectTask.type") }}:
            {{ zhTaskType(info?.type) }}</span
          >
        </div>
        <div style="margin-top: 16px">
          <span
            >{{ $t("message.projectTask.account") }}: {{ info?.account }}</span
          >
        </div>
        <div style="margin-top: 16px">
          <span>{{ $t("message.deleteTask.confirmDelete") }}</span>
        </div>
        <div class="btn-group" style="margin-top: 30px">
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
    zhTaskType(type) {
      switch (type) {
        case "transfer":
          return this.$t("message.projectTask.transfer");
        case "createOrder":
          return this.$t("message.projectTask.createOrder");
        case "cancelOrder":
          return this.$t("message.projectTask.cancelOrder");
        default:
          return type;
      }
    },
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
#delete-chain {
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
