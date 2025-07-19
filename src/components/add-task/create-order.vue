<template>
  <div class="add-task-create-order">
    <div class="create-order-header">
      <div
        :class="current == 'Buy' ? 'header-item-buy' : 'header-item'"
        @click="setCurrent('Buy')"
      >
        {{ $t("message.projectTask.buy") }}
      </div>
      <div
        :class="current == 'Sell' ? 'header-item-sell' : 'header-item'"
        @click="setCurrent('Sell')"
      >
        {{ $t("message.projectTask.sell") }}
      </div>
    </div>
    <component :is="current" :close="close" :confirm="confirm"></component>
  </div>
</template>

<script>
import Buy from "@/components/add-task/create-order-buy";
import Sell from "@/components/add-task/create-order-sell";

export default {
  name: "createOrder",
  data() {
    return {
      current: "Buy",
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
  components: {
    Buy,
    Sell,
  },
  methods: {
    setCurrent(str) {
      if (this.current == str) return;
      this.current = str;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-task-create-order {
  padding: 30px 70px 35px;
  .create-order-header {
    display: flex;
    font-size: 14px;
    font-weight: 400;
    .header-item {
      width: 50%;
      height: 40px;
      background: rgba(247, 248, 250, 1);
      color: rgba(58, 65, 76, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .header-item-buy {
      width: 50%;
      height: 40px;
      background: rgba(216, 64, 92, 1);
      color: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .header-item-sell {
      width: 50%;
      height: 40px;
      background: rgba(6, 166, 138, 1);
      color: rgba(255, 255, 255, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
