<template>
  <div class="new-strategy">
    <div class="view-top">
      <span>{{ $t("message.strategyInfo.handicap") }}</span>
    </div>
    <div class="view-content">
      <div class="title">
        <span style="margin-left: 20px">{{
          $t("message.newStrategy.newHandicap")
        }}</span>
      </div>
      <div style="padding-top: 30px; width: 570px">
        <new-handicap></new-handicap>
      </div>
    </div>
  </div>
</template>

<script>
import newHandicap from "@/components/new-handicap.vue";

export default {
  name: "newStrategy",
  data() {
    return {};
  },
  components: {
    newHandicap,
  },
};
</script>

<style lang="scss" scoped>
.new-strategy {
  margin: 30px 20px 0;
  .view-top {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-bottom: 20px;
  }
  .view-content {
    background: red;
    flex: 1;
    background: rgba(24, 31, 35, 1);
    .title {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(66, 70, 90, 1);
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
