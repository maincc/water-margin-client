<template>
  <div class="project-list">
    <div class="view-top">
      <span>{{ $t("message.menus.subProject.projectList") }}</span>
    </div>
    <div class="view-content" style="margin-top: 20px">
      <el-table
        v-loading="tableLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="projects"
        style="width: 100%"
        stripe
      >
        <el-table-column
          type="index"
          :index="formatIndex"
          :label="$t('message.index')"
          width="70px"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          :label="$t('message.projectInfo.time')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="type"
          :label="$t('message.projectInfo.type')"
          width="100px"
          align="center"
        >
          <template slot-scope="scope">
            {{ zhType(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('message.projectInfo.name')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="strategyId"
          :label="$t('message.projectInfo.strategyId')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="profit"
          :label="$t('message.projectInfo.profit')"
        >
          <template slot-scope="scope">
            {{
              scope.row.profit
                ? scope.row.profit + " " + $t("message.USDT")
                : "- -"
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          :label="$t('message.projectInfo.status')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ zhStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('message.operation')"
          :width="70"
        >
          <template slot-scope="scope">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <el-button
                type="text"
                @click="toDetail(scope.row)"
                style="color: rgba(177, 177, 255, 1)"
                >{{ $t("message.detail") }}</el-button
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
import { fetchProjectList } from "@/js/api/v1/project";

export default {
  name: "projectList",
  data() {
    return {
      currentModule: "token",
      isAuthWrite: true,
      page: PAGE,
      size: SIZE,
      projects: [],
      count: 0,
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
    await this.fetchProjectList();
  },
  components: {
    EmptyTableContent,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    toDetail(info) {
      this.$router.push("/projectManage/detail/" + info._id);
    },
    async pageChange(page) {
      this.page = page;
      await this.fetchProjectList();
    },
    async fetchProjectList() {
      this.tableLoading = true;
      try {
        const { address, role } = this.userInfo;
        const res = await fetchProjectList(address, this.page, this.size);
        if (res.isSuccess()) {
          this.projects = res.data.list;
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
    formatIndex(index) {
      return (this.page - 1) * SIZE + index + 1;
    },
    zhType(type) {
      switch (type) {
        case "handicap":
          return this.$t("message.projectInfo.handicap");
        case "arbitrage":
          return this.$t("message.projectInfo.arbitrage");
        case "hedge":
          return this.$t("message.projectInfo.hedge");
        case "manual":
          return this.$t("message.projectInfo.manual");
        default:
          return type;
      }
    },
    zhStatus(status) {
      switch (status) {
        case "init":
          return this.$t("message.projectInfo.init");
        case "processing":
          return this.$t("message.projectInfo.processing");
        case "done":
          return this.$t("message.projectInfo.done");
        case "failed":
          return this.$t("message.projectInfo.failed");
        case "handled":
          return this.$t("message.projectInfo.handled");
        default:
          return "- -";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.project-list {
  margin: 30px 20px 0;
  .view-top {
    margin-top: 16px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
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
