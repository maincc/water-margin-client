<template>
  <div class="project-detail" id="project-detail" ref="projectDetail">
    <div class="view-top">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/projectManage/projectList' }">
          <span class="breadcrumb-font">{{
            $t("message.menus.subProject.projectList")
          }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="breadcrumb-font" style="color: rgba(255, 255, 255, 1)">{{
            $t("message.detail")
          }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="project-info">
      <div class="info-top">
        <div style="display: flex; align-items: center; height: 30px">
          {{ $t("message.projectInfo.name") }}: {{ info.name }}
        </div>
        <div v-if="info.status == 'failed'">
          <el-button @click="updateStatus()" class="handled-btn">{{
            $t("message.projectInfo.handled")
          }}</el-button>
        </div>
      </div>
      <div class="info-content">
        <div class="info-content-left">
          <div class="info-content-item">
            <div class="label">{{ $t("message.projectInfo.type") }}:</div>
            <div class="value">{{ zhType(info.type) }}</div>
          </div>
          <div style="margin-top: 16px" class="info-content-item">
            <div class="label">{{ $t("message.projectInfo.time") }}:</div>
            <div class="value">{{ zhType(info.createDate) }}</div>
          </div>
          <div style="margin-top: 16px" class="info-content-item">
            <div class="label">{{ $t("message.projectInfo.strategyId") }}:</div>
            <div class="value">{{ info.strategyId }}</div>
          </div>
        </div>
        <div class="info-content-right">
          <div class="info-content-item">
            <div class="label">{{ $t("message.projectInfo.profit") }}:</div>
            <div class="value">{{ info.profit }} {{ $t("message.USDT") }}</div>
          </div>
          <div style="margin-top: 16px" class="info-content-item">
            <div class="label">{{ $t("message.projectInfo.status") }}:</div>
            <div class="value">{{ zhStatus(info.status) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="task-list">
      <div>{{ $t("message.projectInfo.taskList") }}</div>
      <el-table :data="tableTasks" style="width: 100%; margin-top: 20px" stripe>
        <el-table-column
          prop="sortOrder"
          :label="$t('message.projectTask.sortOrder')"
          width="80px"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="type"
          :label="$t('message.projectTask.type')"
          align="center"
          width="80px"
        >
          <template slot-scope="scope">
            {{ zhTaskType(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="side"
          :label="$t('message.projectTask.side')"
          align="center"
          width="80px"
        >
          <template slot-scope="scope">
            {{ zhSideType(scope.row.side) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          :label="$t('message.projectTask.price')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.price || "- -" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          :label="$t('message.projectTask.total')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{
              scope.row.total
                ? `${scope.row.total} ${scope.row.counter}`
                : "- -"
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="platform"
          :label="$t('message.projectTask.platform')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="account"
          :label="$t('message.projectTask.account')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="orderId"
          :label="$t('message.projectTask.orderId')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.orderId || "- -" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          :label="$t('message.projectTask.status')"
          :width="100"
        >
          <template slot-scope="scope">
            <div style="display: flex">
              <span>{{ zhStatus(scope.row.status) }}</span>
              <el-tooltip
                style="margin-left: 10px; cursor: pointer"
                v-if="scope.row.status == 'failed' && scope.row.msg"
                class="item"
                effect="dark"
                offset="20"
                :content="scope.row.msg"
                placement="top"
              >
                <img src="@/assets/fail-explain.svg" alt="" srcset="" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand-content">
              <div class="expand-left">
                <div class="expand-item">
                  <!-- 计费Token -->
                  <div class="label">
                    {{ $t("message.projectTask.counter") }}
                  </div>
                  <div class="value">{{ scope.row.counter || "- -" }}</div>
                </div>
                <div class="expand-item" style="margin-top: 14px">
                  <!-- 待交易基础Token -->
                  <div class="label">{{ $t("message.projectTask.base") }}</div>
                  <div class="value">{{ scope.row.base || "- -" }}</div>
                </div>
                <div class="expand-item" style="margin-top: 14px">
                  <!-- 交易base token数量 -->
                  <div class="label">
                    {{ $t("message.projectTask.amount") }}
                  </div>
                  <div class="value">{{ scope.row.amount || "- -" }}</div>
                </div>
                <div class="expand-item" style="margin-top: 14px">
                  <!-- 实际成交金额 -->
                  <div class="label">
                    {{ $t("message.projectTask.filledTotal") }}
                  </div>
                  <div class="value">
                    {{
                      scope.row.filledTotal
                        ? `${scope.row.filledTotal} ${scope.row.counter}`
                        : "- -"
                    }}
                  </div>
                </div>
                <div class="expand-item" style="margin-top: 14px">
                  <!-- 任务后续检查类型 -->
                  <div class="label">
                    {{ $t("message.projectTask.followUpType") }}
                  </div>
                  <div class="value">
                    {{ zhFollowUpType(scope.row.followUpType) || "- -" }}
                  </div>
                </div>
                <div class="expand-item" style="margin-top: 14px">
                  <!-- 交易订单哈希 -->
                  <div class="label">
                    {{ $t("message.projectTask.orderHash") }}
                  </div>
                  <div class="value">{{ scope.row.hash || "- -" }}</div>
                </div>
              </div>
              <div class="expand-right">
                <div class="expand-item">
                  <!-- Token ID -->
                  <div class="label">
                    {{ $t("message.projectTask.tokenId") }}
                  </div>
                  <div class="value">{{ scope.row.tokenId || "- -" }}</div>
                </div>
                <div class="expand-item" style="margin-top: 14px">
                  <!-- 待交易基础Token ID -->
                  <div class="label">
                    {{ $t("message.projectTask.baseId") }}
                  </div>
                  <div class="value">{{ scope.row.baseId || "- -" }}</div>
                </div>
                <div class="expand-item" style="margin-top: 14px">
                  <!-- 计费Token ID -->
                  <div class="label">
                    {{ $t("message.projectTask.counterId") }}
                  </div>
                  <div class="value">{{ scope.row.counterId || "- -" }}</div>
                </div>
                <div class="expand-item" style="margin-top: 14px">
                  <!-- 订单状态 -->
                  <div class="label">
                    {{ $t("message.projectTask.orderStatus") }}
                  </div>
                  <div class="value">
                    {{ zhOrderStatus(scope.row.orderStatus) || "- -" }}
                  </div>
                </div>
                <div class="expand-item" style="margin-top: 14px">
                  <!-- 订单执行状态 -->
                  <div class="label">
                    {{ $t("message.projectTask.dealStatus") }}
                  </div>
                  <div class="value">
                    {{ zhDealStatus(scope.row.dealStatus) || "- -" }}
                  </div>
                </div>
              </div>
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
import { fetchProjectById, updateProject } from "@/js/api/v1/project";
import { PAGE, SIZE } from "@/js/constant";
import { mapGetters } from "vuex";
import EmptyTableContent from "@/components/empty-table-content";
import { Loading } from "element-ui";
import updateProjectStatus from "@/components/update-project-status";

export default {
  name: "projectDetail",
  beforeRouteEnter(to, from, next) {
    const { id } = to.params;
    next(async (vm) => {
      const inst = Loading.service({
        fullscreen: false,
        target: vm.$refs.projectDetail,
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        vm.id = id;
        const res = await fetchProjectById(vm.userInfo.address, id);
        if (res.isSuccess()) {
          vm.info = res.data;
        } else {
          vm.$router.push("/projectManage/projectList");
        }
      } catch (error) {
        vm.$message.error(error.message || error);
        vm.$router.push("/projectManage/projectList");
      } finally {
        inst.close();
      }
    });
  },
  data() {
    return {
      info: {},
      page: PAGE,
      size: SIZE,
      id: null,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    count() {
      return this.info.tasks?.length || 0;
    },
    tableTasks() {
      if (this.info.tasks?.length) {
        return this.info.tasks.slice(
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
    updateStatus() {
      updateProjectStatus().show(async () => {
        const inst = Loading.service({
          fullscreen: false,
          target: this.$refs.projectDetail,
          background: "rgba(0, 0, 0, 0.7)",
        });
        try {
          const res = updateProject(this.userInfo.address, this.id, {
            status: "handled",
          });
          if (res.isSuccess() || res.code == 0) {
            this.$message.success(this.$t("message.modifyChain.modifySuccess"));
            const infoRes = await fetchProjectById(
              this.userInfo.address,
              this.id
            );
            this.info = infoRes.data;
          } else {
            this.$message.error(res.message || res);
          }
        } catch (error) {
          this.$message.error(error.message || error);
        } finally {
          inst.close();
        }
      });
    },
    async pageChange(page) {
      this.page = page;
    },
    zhDealStatus(dealStatus) {
      switch (dealStatus) {
        case "pending":
          return this.$t("message.projectTask.orderDealPending");
        case "partially":
          return this.$t("message.projectTask.orderDealPartially");
        case "completed":
          return this.$t("message.projectTask.orderDealCompleted");
        case "failed":
          return this.$t("message.projectTask.orderDealFailed");
        case "cancelled":
          return this.$t("message.projectTask.orderDealCancelled");
        default:
          return dealStatus;
      }
    },
    zhOrderStatus(orderStatus) {
      switch (orderStatus) {
        case "open":
          return this.$t("message.projectTask.orderOpen");
        case "closed":
          return this.$t("message.projectTask.orderClosed");
        case "cancelled":
          return this.$t("message.projectTask.orderCancelled");
        default:
          return orderStatus;
      }
    },
    zhFollowUpType(followUpType) {
      switch (followUpType) {
        case "executeOnly":
          return this.$t("message.projectTask.executeOnly");
        case "ensureCompleted":
          return this.$t("message.projectTask.ensureCompleted");
        default:
          return followUpType;
      }
    },
    zhSideType(side) {
      switch (side) {
        case "buy":
          return this.$t("message.projectTask.buy");
        case "sell":
          return this.$t("message.projectTask.sell");
        default:
          return side;
      }
    },
    zhTaskType(type) {
      switch (type) {
        case "transfer":
          return this.$t("message.projectTask.transfer");
        case "createOrder":
          return this.$t("message.projectTask.createOrder");
        case "cancelOrder":
          return this.$t("message.projectTask.cancelOrder");
        default:
          return type;
      }
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
.project-detail {
  margin: 46px 20px 0px;
  height: calc(100% - 92px);
  display: flex;
  flex-direction: column;
  .view-top {
    margin-bottom: 20px;
    .breadcrumb-font {
      font-size: 14px;
      color: rgba(179, 182, 187, 1);
      line-height: 20px;
    }
  }
  .project-info {
    width: 100%;
    background: rgba(24, 31, 35, 1);
    .info-top {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      border-bottom: 1px solid rgba(66, 70, 90, 1);
      font-size: 14px;
      font-weight: 400;
      letter-spacing: -0.04px;
      color: rgba(255, 255, 255, 1);
      .handled-btn {
        width: 100px;
        height: 30px;
        border-radius: 20px;
        border: 1px solid rgba(32, 166, 150, 1);
        color: rgba(0, 208, 183, 1);
        font-size: 14px;
      }
    }
    .info-content {
      padding: 20px;
      display: flex;
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      font-weight: 400;
      letter-spacing: -0.04px;
      line-height: 19.6px;
      .info-content-item {
        display: flex;
        .label {
          min-width: 100px;
          color: rgba(179, 182, 187, 1);
          display: flex;
        }
        .value {
          flex: 1;
          color: rgba(255, 255, 255, 1);
          display: flex;
          text-align: left;
          word-break: break-word; // 允许单词内换行
          overflow-wrap: break-word; // 兼容性更好的写法
        }
      }
      .info-content-left {
        width: 50%;
      }
      .info-content-right {
        width: 50%;
      }
    }
  }
  .task-list {
    margin-top: 30px;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    font-weight: 400;
    .expand-content {
      color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      .expand-item {
        display: flex;
        font-size: 14px;
        font-weight: 400;
        .label {
          min-width: 160px;
          color: rgba(149, 153, 161, 1);
        }
        .value {
          word-break: break-word; // 允许单词内换行
          overflow-wrap: break-word; // 兼容性更好的写法
        }
      }
      .expand-left {
        width: calc(50% - 5px);
      }
      .expand-right {
        width: calc(50% - 5px);
      }
    }
    .pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
}
</style>
