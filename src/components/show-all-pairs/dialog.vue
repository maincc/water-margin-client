<template>
  <div id="show-all-pairs">
    <el-dialog :visible.sync="visible" width="600px">
      <div slot="title" class="title">
        {{ $t("message.strategyDetail.tradingPairs") }}
      </div>
      <div class="content">
        <div class="show-pairs">
          <div
            class="show-pair-item"
            v-for="(item, index) in pairs"
            :key="index"
          >
            <span style="margin-left: 10px">{{ item[0] }}</span>
            <img
              style="width: 10px; margin-left: 6px"
              src="@/assets/pairDirection.svg"
              alt=""
            />
            <span style="margin-left: 6px">{{ item[1] }}</span>
            <img
              @click="removePair(item)"
              style="width: 10px; margin: 0px 10px; cursor: pointer"
              src="@/assets/fork.svg"
              alt=""
              srcset=""
            />
          </div>
        </div>
        <div class="btn-group" style="margin-top: 30px">
          <el-button :loading="loading" @click="confirm" class="btn confirm">{{
            $t("message.confirm")
          }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { AccountRole } from "@/js/constant/account";
import _ from "lodash";

export default {
  name: "Dialog",
  data() {
    return {
      visible: false,
      loading: false,
      pairs: [],
      fun: null,
    };
  },
  computed: {
    ...mapGetters(["allModules"]),
  },
  methods: {
    removePair(item) {
      this.pairs = this.pairs.filter((i) => i[0] != item[0] || i[1] != item[1]);
    },
    show(pairs, fun) {
      this.pairs = _.cloneDeep(pairs);
      this.fun = fun;
      this.visible = true;
    },
    async confirm() {
      this.loading = true;
      await this.fun(this.pairs);
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
#show-all-pairs {
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
.show-pairs {
  display: flex;
  width: 100%;
  background: rgba(250, 250, 250, 1);
  border-radius: 6px;
  padding: 5px;
  flex-wrap: wrap;
  .show-pair-item {
    height: 34px;
    border-radius: 6px;
    background: rgba(240, 240, 240, 1);
    margin: 5px;
    display: flex;
    align-items: center;
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
