<template>
  <div class="user-manage">
    <div class="view-top">
      <span>{{ $t("message.menus.user") }}</span>
      <el-button v-if="isAuthWrite" @click="addUser">
        <div class="add-account-bt">
          <img src="@/assets/add.svg" alt="" />
          <span style="margin-left: 6px">{{
            $t("message.accountManage.addAccount")
          }}</span>
        </div>
      </el-button>
    </div>
    <div class="view-content" style="margin-top: 20px">
      <el-table
        v-loading="tableLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="accounts"
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="role"
          :label="$t('message.userInfo.role')"
          width="120px"
        >
          <template slot-scope="scope">
            <span>{{ showRole(scope.row.role) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('message.userInfo.name')"
          width="200px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name || "- -" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          :label="$t('message.userInfo.account')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('message.operation')"
          :width="144"
        >
          <template slot-scope="scope">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <el-button
                type="text"
                style="color: rgba(177, 177, 255, 1)"
                @click="viewPermissions(scope.row)"
                >{{ $t("message.Permissions") }}</el-button
              >
              <div
                style="width: 28px"
                v-if="scope.row.address == currentAccount || !isAuthWrite"
              >
                - -
              </div>
              <el-button
                v-else
                type="text"
                style="color: rgba(177, 177, 255, 1)"
                @click="modifyUser(scope.row)"
                >{{ $t("message.modify") }}</el-button
              >
              <div
                style="width: 28px"
                v-if="scope.row.address == currentAccount || !isAuthWrite"
              >
                - -
              </div>
              <el-button
                v-else
                type="text"
                style="color: rgba(248, 119, 70, 1)"
                @click="deleteUser(scope.row)"
                >{{ $t("message.delete") }}</el-button
              >
            </div>
          </template>
        </el-table-column>

        <EmptyTableContent slot="empty"></EmptyTableContent>
      </el-table>
      <div v-if="count" class="pagination">
        <el-pagination
          :page-size="size"
          :current-page="page"
          background
          layout="total, prev, pager, next"
          @current-change="pageChange"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { PAGE, SIZE } from "@/js/constant";
import { mapGetters } from "vuex";
import {
  fetchUserList,
  createUser,
  deleteUser,
  modifyUser,
} from "@/js/api/v1/user";
import EmptyTableContent from "@/components/empty-table-content";
import viewUserPermissionsDialog from "@/components/view-user-permissions";
import deleteUserDialog from "@/components/delete-user";
import modifyUserDialog from "@/components/modify-user";
import addUserDialog from "@/components/add-user";

export default {
  name: "user-manage",
  data() {
    return {
      currentModule: "user",
      isAuthWrite: true,
      page: PAGE,
      size: SIZE,
      accounts: [],
      count: 0,
      currentAccount: "",
      tableLoading: false,
    };
  },
  async mounted() {
    if (this.userInfo.modules) {
      const auth = this.userInfo.modules.find(
        (m) => m.module == this.currentModule
      ).auth;
      this.isAuthWrite = auth.indexOf("w") > -1;
    }
    this.currentAccount = this.userInfo.address;
    await this.fetchUserList();
  },
  components: {
    EmptyTableContent,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    addUser() {
      addUserDialog().show(async (data) => {
        try {
          const createUserRes = await createUser(this.userInfo.address, data);
          if (createUserRes.isSuccess()) {
            this.$message.success(this.$t("message.addUser.addSuccess"));
            await this.fetchUserList();
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    modifyUser(info) {
      modifyUserDialog().show(info, async (data) => {
        try {
          const modifyUserRes = await modifyUser(
            this.userInfo.address,
            info._id,
            data
          );
          if (modifyUserRes.isSuccess()) {
            this.$message.success(this.$t("message.modifyUser.modifySuccess"));
            await this.fetchUserList();
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    deleteUser(info) {
      deleteUserDialog().show(info, async () => {
        try {
          const res = await deleteUser(this.userInfo.address, info._id);
          if (res.isSuccess()) {
            this.$message.success(this.$t("message.deleteUser.deleteSuccess"));
            await this.fetchUserList();
          } else {
            this.$message.error(res.message);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    viewPermissions(info) {
      viewUserPermissionsDialog().show(info.role, info.modules);
    },
    formatIndex(index) {
      return (this.form.page - 1) * SIZE + index + 1;
    },
    async pageChange(page) {
      this.page = page;
      await this.fetchUserList();
    },
    showRole(role) {
      switch (role) {
        case "admin":
          return this.$t("message.userInfo.admin");
        case "user":
          return this.$t("message.userInfo.user");
      }
    },
    async fetchUserList() {
      this.tableLoading = true;
      try {
        const { address, role } = this.userInfo;
        const res = await fetchUserList(address, this.page, this.size);
        if (res.isSuccess()) {
          this.accounts = res.data.list;
          this.count = res.data.count;
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.tableLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-manage {
  margin: 30px 20px 0;
  .view-top {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    .add-account-bt {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 36px;
      border-radius: 6px;
      background: rgba(37, 42, 68, 1);
      border: 1px solid rgba(66, 70, 90, 1);
      font-size: 14px;
      font-weight: 400;
      color: rgba(177, 177, 255, 1);
      &:hover {
        border: 1px solid rgba(132, 132, 221, 1);
      }
    }
  }
  .view-content {
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
}
</style>
