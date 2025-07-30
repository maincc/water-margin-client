<template>
  <div class="strategy-list" id="strategy-list">
    <div class="view-top">
      <span>{{ $t("message.menus.subStragegy.strategyList") }}</span>
      <div style="display: flex; height: 100%">
        <el-select
          v-model="params.type"
          :popper-append-to-body="false"
          @change="handleChange"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          style="margin-left: 20px"
          v-model="params.isActive"
          :popper-append-to-body="false"
          @change="handleChange"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div
          id="search-input"
          class="search-input"
          style="margin-left: 20px; display: flex; cursor: pointer"
        >
          <el-input
            v-model="params.name"
            :placeholder="$t('message.strategyList.pleaseEnterName')"
          ></el-input>
          <div class="search-btn" @click="handleSearch">
            <img src="@/assets/search.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="view-content" style="margin-top: 20px">
      <el-table
        v-loading="tableLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="strategyList"
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
          :label="$t('message.strategyInfo.createDate')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ handleTime(scope.row.createDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="type" :label="$t('message.strategyInfo.type')">
          <template slot-scope="scope">
            {{ zhType(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('message.strategyInfo.name')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="isActive"
          :label="$t('message.status')"
          align="center"
          :width="120"
        >
          <template slot-scope="scope">
            {{
              scope.row.isActive
                ? $t("message.strategyInfo.activing")
                : $t("message.strategyInfo.notActivated")
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('message.operation')"
          :width="100"
        >
          <template slot-scope="scope">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <div style="width: 28px" v-if="!isAuthWrite">- -</div>
              <el-button
                @click="modifyStrategy(scope.row)"
                v-else
                type="text"
                style="color: rgba(177, 177, 255, 1)"
                >{{ $t("message.modify") }}</el-button
              >
              <el-button
                @click="toDetail(scope.row)"
                type="text"
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
import { fetchStrategyList, updateStrategy } from "@/js/api/v1/strategy";
import { PAGE, SIZE } from "@/js/constant";
import { mapGetters } from "vuex";
import EmptyTableContent from "@/components/empty-table-content";
import {
  strategyTypeOptions,
  strategyStatusOptions,
} from "@/js/constant/strategy";
import modifyStrategyDialog from "@/components/modify-strategy";
import dayjs from "dayjs";

export default {
  name: "strategyList",
  data() {
    return {
      currentModule: "strategy",
      isAuthWrite: true,
      page: PAGE,
      size: SIZE,
      strategyList: [],
      count: 0,
      typeOptions: strategyTypeOptions,
      statusOptions: strategyStatusOptions,
      params: {
        type: "",
        isActive: "",
      },
      tableLoading: false,
    };
  },
  async mounted() {
    if (this.userInfo.modules) {
      const auth = this.userInfo.modules.find((m) => {
        return m.module == this.currentModule;
      }).auth;
      this.isAuthWrite = auth.indexOf("w") > -1;
    }
    await this.fetchStrategyList();
  },
  components: {
    EmptyTableContent,
  },
  computed: {
    ...mapGetters(["userInfo", "allChains"]),
  },
  methods: {
    handleTime(time) {
      const date = dayjs(time);
      const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");
      return formattedDate;
    },
    modifyStrategy(info) {
      modifyStrategyDialog().show(info, async (data) => {
        try {
          const res = await updateStrategy(
            this.userInfo.address,
            info._id,
            data
          );
          if (res.isSuccess()) {
            this.$message.success(
              this.$t("message.modifyStrategy.modifySuccess")
            );
            await this.fetchStrategyList();
          } else {
            this.$message.error(res.message);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    async handleSearch() {
      await this.fetchStrategyList();
    },
    async handleChange() {
      await this.fetchStrategyList();
    },
    toDetail(info) {
      this.$router.push("/strategyManage/detail/" + info._id);
    },
    zhType(type) {
      switch (type) {
        case "handicap":
          return this.$t("message.strategyInfo.handicap");
        case "arbitrage":
          return this.$t("message.strategyInfo.arbitrage");
        case "hedge":
          return this.$t("message.strategyInfo.hedge");
        case "position":
          return this.$t("message.strategyInfo.position");
        case "fund":
          return this.$t("message.strategyInfo.fund");
        case "other":
          return this.$t("message.strategyInfo.other");
        default:
          return type;
      }
    },
    async fetchStrategyList() {
      this.tableLoading = true;
      try {
        const { address, role } = this.userInfo;
        const res = await fetchStrategyList(
          address,
          this.page,
          this.size,
          this.params
        );
        if (res.isSuccess()) {
          this.strategyList = res.data.list;
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
    async pageChange(page) {
      this.page = page;
      await this.fetchStrategyList();
    },
  },
};
</script>

<style lang="scss" scoped>
.strategy-list {
  margin: 30px 20px 0;
  .view-top {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    .search-input {
      width: 200px;
      height: calc(100% - 4px);
      background: red;
      border-radius: 6px;
      background: rgba(37, 42, 68, 1);
      border: 1px solid rgba(66, 70, 90, 1);
      .search-btn {
        height: 100%;
        width: 34px;
        background: rgba(132, 132, 221, 1);
        border-radius: 0 6px 6px 0;
        display: flex;
        align-items: center;
        justify-content: center;
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
