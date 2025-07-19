<template>
  <div class="exchange-manage">
    <div class="view-top">
      <span>{{ $t("message.menus.exchange") }}</span>
      <el-button v-if="isAuthWrite" @click="addExchange">
        <div class="add-account-bt">
          <img src="@/assets/add.svg" alt="" />
          <span style="margin-left: 6px">{{
            $t("message.exchangeManage.addExchange")
          }}</span>
        </div>
      </el-button>
    </div>
    <div class="view-content" style="margin-top: 20px">
      <el-table
        v-loading="tableLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableExchanges"
        style="width: 100%"
        stripe
      >
        <el-table-column prop="name" :label="$t('message.exchangeInfo.name')">
        </el-table-column>
        <el-table-column
          prop="node"
          :label="$t('message.exchangeInfo.node')"
          :formatter="(row) => row.node || '- -'"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="browser"
          :label="$t('message.exchangeInfo.browser')"
          :formatter="(row) => row.node || '- -'"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column
          align="center"
          :label="$t('message.operation')"
          :width="140"
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
                @click="toDetail(scope.row)"
                type="text"
                style="color: rgba(177, 177, 255, 1)"
                >{{ $t("message.detail") }}</el-button
              >
              <div style="width: 28px" v-if="!isAuthWrite">- -</div>
              <el-button
                v-else
                @click="ModifyExchange(scope.row)"
                type="text"
                style="color: rgba(177, 177, 255, 1)"
                >{{ $t("message.modify") }}</el-button
              >
              <div style="width: 28px" v-if="!isAuthWrite">- -</div>
              <el-button
                v-else
                @click="deleteExchange(scope.row)"
                type="text"
                style="color: rgba(248, 119, 70, 1)"
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
import EmptyTableContent from "@/components/empty-table-content";
import {
  fetchExchangeList,
  createExchange,
  deleteExchange,
  modifyExchange,
} from "@/js/api/v1/exchange";
import addExchangeDialog from "@/components/add-exchange";
import deleteExchangeDialog from "@/components/delete-exchange";
import modifyExchangeDialog from "@/components/modify-exchange";
import { fetchExchanges } from "@/js/api/v1/public";

export default {
  name: "ExchangeManage",
  data() {
    return {
      currentModule: "exchange",
      isAuthWrite: true,
      exchanges: [],
      page: PAGE,
      size: SIZE,
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
    await this.fetchExchangeList();
  },
  computed: {
    ...mapGetters(["userInfo"]),
    count() {
      return this.exchanges.length;
    },
    tableExchanges() {
      if (this.exchanges.length) {
        const TotalPage = Math.ceil(this.count / this.size);
        if (this.page > TotalPage) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.page = TotalPage;
        }
        return this.exchanges.slice(
          (this.page - 1) * this.size,
          this.page * this.size
        );
      }
      return [];
    },
  },
  components: {
    EmptyTableContent,
  },
  methods: {
    async ModifyExchange(info) {
      modifyExchangeDialog().show(info, async (data) => {
        try {
          const res = await modifyExchange(
            this.userInfo.address,
            info._id,
            Object.assign({}, data, { _id: undefined })
          );
          if (res.isSuccess()) {
            this.$message.success(
              this.$t("message.modifyExchange.modifySuccess")
            );
            await this.fetchExchangeList();
            const exchanges = await fetchExchanges();
            this.$store.dispatch("setAllExchanges", exchanges);
          } else {
            this.$message.error(res.message);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    async deleteExchange(info) {
      deleteExchangeDialog().show(info, async () => {
        try {
          const res = await deleteExchange(this.userInfo.address, info._id);
          if (res.isSuccess()) {
            this.$message.success(
              this.$t("message.deleteExchange.deleteSuccess")
            );
            await this.fetchExchangeList();
            const exchanges = await fetchExchanges();
            this.$store.dispatch("setAllExchanges", exchanges);
          } else {
            this.$message.error(res.message);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    async addExchange() {
      addExchangeDialog().show(async (data) => {
        try {
          const createExchangeRes = await createExchange(
            this.userInfo.address,
            data
          );
          if (createExchangeRes.isSuccess()) {
            this.$message.success(this.$t("message.addExchange.addSuccess"));
            await this.fetchExchangeList();
            const exchanges = await fetchExchanges();
            this.$store.dispatch("setAllExchanges", exchanges);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    toDetail(info) {
      this.$router.push("/exchangeManage/detail/" + info._id);
    },
    async fetchExchangeList() {
      this.tableLoading = true;
      try {
        const { address, role } = this.userInfo;
        const res = await fetchExchangeList(address);
        if (res.isSuccess()) {
          this.exchanges = res.data;
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.tableLoading = false;
      }
    },
    async pageChange(page) {
      this.page = page;
    },
  },
};
</script>

<style lang="scss" scoped>
.exchange-manage {
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
      width: 100px;
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
