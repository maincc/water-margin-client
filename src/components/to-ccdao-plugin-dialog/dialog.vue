<template>
  <div id="to-ccdao-plugin">
    <el-dialog :visible.sync="visible" width="440px">
      <div slot="title" class="title">
        {{ $t("message.connectWallet") }}
      </div>
      <div class="dialog-content">
        <el-button @click="toGet" class="getCcdaoPluginBt">
          <!-- {{ $t("message.get_ccdao_plugin") }} -->
          <div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <img style="width: 24px" src="@/assets/ccdao-logo.svg" alt="" />
              <span style="margin-left: 14px">{{
                $t("message.getCcdaoPlugin")
              }}</span>
            </div>
          </div>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    toGet() {
      window.open("https://ccda.ooo/#/connector", "_blank");
    },
  },
};
</script>

<style lang="scss">
#to-ccdao-plugin {
  .el-dialog {
    border-radius: 30px;
    .el-dialog__header {
      padding: 16px 20px 0px;
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
.getCcdaoPluginBt {
  width: 240px;
  height: 60px;
  border-radius: 10px;
  background: rgba(132, 132, 221, 1);
  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;
  color: rgba(255, 255, 255, 1);
  &:hover,
  &:active,
  &:focus {
    color: rgba(255, 255, 255, 1);
    background: rgba(150, 150, 235, 1);
  }
}
.dialog-content {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 30px;
}
</style>
