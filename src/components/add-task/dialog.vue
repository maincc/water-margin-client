<template>
  <div id="add-task">
    <el-dialog
      :visible.sync="visible"
      width="600px"
      destroy-on-close
      @close="resetForm"
    >
      <div slot="title" class="title">
        {{ $t("message.addTask.title") }}
      </div>
      <div class="content">
        <div class="switch-group">
          <div
            :class="
              current == 'CreateOrder' ? 'switch-item-select' : 'switch-item'
            "
            @click="setCurrent('CreateOrder')"
          >
            <span>{{ $t("message.projectTask.createOrder") }}</span>
          </div>
          <div
            :class="
              current == 'CancelOrder' ? 'switch-item-select' : 'switch-item'
            "
            @click="setCurrent('CancelOrder')"
          >
            <span>{{ $t("message.projectTask.cancelOrder") }}</span>
          </div>
          <div
            :class="
              current == 'Transfer' ? 'switch-item-select' : 'switch-item'
            "
            @click="setCurrent('Transfer')"
          >
            <span>{{ $t("message.projectTask.transfer") }}</span>
          </div>
        </div>
        <component :is="current" :close="close" :confirm="confirm"></component>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateOrder from "@/components/add-task/create-order";
import CancelOrder from "@/components/add-task/cancel-order";
import Transfer from "@/components/add-task/transfer";

export default {
  name: "Dialog",
  data() {
    return {
      visible: false,
      current: "CreateOrder",
      fun: null,
      form: {
        sortOrder: null,
        type: null,
        status: "init",
        tokenId: null,
        baseId: null,
        counterId: null,
        base: null,
        counter: null,
        price: null,
        amount: null,
        total: null,
        side: null,
        platform: null,
        followUpType: null,
        account: null,
        orderStatus: null,
        dealStatus: null,
        orderId: null,
        filledTotal: null,
        hash: null,
        msg: null,
      },
    };
  },
  components: {
    CreateOrder,
    CancelOrder,
    Transfer,
  },
  computed: {
    ...mapGetters(["allModules"]),
  },
  methods: {
    setCurrent(str) {
      if (this.current == str) return;
      this.current = str;
    },
    show(fun) {
      this.visible = true;
      this.fun = fun;
    },
    async confirm(data) {
      const task = Object.assign({}, this.form, data);
      this.fun(task);
      this.close();
    },
    close() {
      this.visible = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        sortOrder: null,
        type: null,
        status: "init",
        tokenId: null,
        baseId: null,
        counterId: null,
        base: null,
        counter: null,
        price: null,
        amount: null,
        total: null,
        side: null,
        platform: null,
        followUpType: null,
        account: null,
        orderStatus: null,
        dealStatus: null,
        orderId: null,
        filledTotal: null,
        hash: null,
        msg: null,
      };
    },
  },
};
</script>

<style lang="scss">
#add-task {
  .el-dialog {
    border-radius: 30px;
    .el-dialog__header {
      padding: 16px 20px 15px;
      border-bottom: 1px solid rgba(232, 233, 234, 1);
    }
    .el-dialog__body {
      padding: 0px;
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
.switch-group {
  display: flex;
  font-size: 14px;
  font-weight: 400;
  .switch-item {
    width: 200px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(247, 248, 250, 1);
    color: rgba(116, 127, 138, 1);
    cursor: pointer;
  }
  .switch-item-select {
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    background: rgba(242, 243, 249, 1);
    color: rgba(127, 127, 227, 1);
    border-top: 4px solid rgba(132, 132, 221, 1);
    span {
      margin-top: 8px;
    }
  }
}
</style>
