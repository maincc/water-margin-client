<template>
  <div id="cron-explain">
    <el-dialog :visible.sync="visible" width="600px">
      <div slot="title" class="title">
        {{ $t("message.cronExplain.title") }}
      </div>
      <div class="content">
        <div
          v-for="(item, index) in contentArray"
          :key="index"
          :style="{
            marginBottom: index === contentArray.length - 1 ? '30px' : '0px',
          }"
        >
          <span>{{ item }}</span>
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
      contentArray: this.$t("message.cronExplain.contentArray"),
    };
  },
  computed: {
    ...mapGetters(["allModules"]),
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
#cron-explain {
  .el-dialog {
    border-radius: 30px;
    .el-dialog__header {
      padding: 16px 20px 15px;
      border-bottom: 1px solid rgba(232, 233, 234, 1);
    }
    .el-dialog__body {
      padding: 30px 40px 0px;
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
  height: 570px;
  overflow: auto;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;
  color: rgba(81, 86, 95, 1);
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
