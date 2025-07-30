<template>
  <div class="cancel-order" id="cancel-order">
    <el-form ref="form" :model="form" label-width="148px">
      <el-form-item
        :label="$t('message.projectTask.platform') + ':'"
        prop="platform"
      >
        <el-select
          style="width: 100%"
          v-model="form.platform"
          :placeholder="$t('message.createOrder.pleaseChoosePlatform')"
        >
          <el-option
            v-for="item in allExchanges"
            :key="item._id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('message.projectTask.account') + ':'"
        prop="account"
      >
        <el-input
          v-model="form.account"
          :placeholder="$t('message.createOrder.pleaseEnterAccount')"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="$t('message.projectTask.orderId') + ':'"
        prop="orderId"
      >
        <el-input
          v-model="form.orderId"
          :placeholder="$t('message.cancelOrder.enterOrderId')"
        ></el-input>
      </el-form-item>
    </el-form>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 30px 0 0;
      "
    >
      <el-button class="btn close-btn" @click="close()">{{
        $t("message.cancel")
      }}</el-button>
      <el-button
        type="primary"
        :disabled="!isConfirm"
        style="margin-left: 60px"
        class="btn comfirm-btn"
        @click="confirm(Object.assign({}, form))"
        >{{ $t("message.confirm") }}</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "cancelOrder",
  data() {
    return {
      form: {
        type: "cancelOrder",
        platform: "",
        account: "",
        orderId: "",
      },
    };
  },
  props: {
    close: {
      type: Function,
      default: () => {},
    },
    confirm: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(["allExchanges"]),
    isConfirm() {
      return this.form.platform && this.form.account && this.form.orderId;
    },
  },
};
</script>

<style lang="scss" scoped>
.cancel-order {
  padding: 30px 70px 35px;
  .btn {
    width: 100px;
    height: 36px;
    border-radius: 20px;
    font-size: 14px;
  }
  .close-btn {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(232, 233, 234, 1);
    color: rgba(81, 86, 95, 1);
    &:hover {
      color: rgba(127, 127, 227, 1);
      border: 1px solid rgba(132, 132, 221, 1);
    }
  }
  .comfirm-btn {
    color: rgba(255, 255, 255, 1);
  }
}
</style>
