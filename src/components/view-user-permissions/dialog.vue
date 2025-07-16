<template>
  <div id="view-user-permissions">
    <el-dialog :visible.sync="visible" width="440px">
      <div slot="title" class="title">
        {{ $t("message.accountPermissions") }}
      </div>
      <div class="content">
        <div class="table-top">
          <div>{{ $t("message.module") }}</div>
          <div>{{ $t("message.rwPermissions") }}</div>
        </div>
        <div
          v-for="(medule, index) in allModules"
          :key="index"
          class="table-item"
          :style="{
            borderTop: index == 0 ? 'none' : '1px solid rgba(240, 240, 240, 1)',
          }"
        >
          <div style="border-right: 1px solid rgba(240, 240, 240, 1)">
            {{ medule.desc }}
          </div>
          <div>{{ showPermissions(medule.name) }}</div>
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
      role: "",
      permissions: [],
    };
  },
  computed: {
    ...mapGetters(["allModules"]),
  },
  methods: {
    show(role, permissions) {
      this.role = role;
      this.permissions = permissions;
      this.visible = true;
    },
    showPermissions(moduleName) {
      if (this.role == AccountRole.admin) {
        return this.$t("message.readAndWrite");
      }
      const Permission = this.permissions.find(
        (item) => item.module == moduleName
      );
      if (Permission) {
        return Permission.auth == "rw"
          ? this.$t("message.readAndWrite")
          : this.$t("message.onlyRead");
      } else {
        return "- -";
      }
    },
  },
};
</script>

<style lang="scss">
#view-user-permissions {
  .el-dialog {
    border-radius: 30px;
    .el-dialog__header {
      padding: 16px 20px 0px;
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
.content {
  margin-top: 15px;
  .table-top {
    display: flex;
    div {
      width: 50%;
      height: 48px;
      background: rgba(247, 248, 250, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgba(240, 240, 240, 1);
      font-size: 14px;
      font-weight: 400;
      color: rgba(116, 127, 138, 1);
    }
  }
  .table-item {
    display: flex;
    div {
      width: 50%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
