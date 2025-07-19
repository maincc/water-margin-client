<template>
  <div class="new-project" id="new-project">
    <div class="view-top">
      <span>{{ $t("message.menus.subProject.newProject") }}</span>
    </div>
    <div class="view-content" style="margin-top: 20px">
      <div class="content-top">
        <span style="margin-right: 100px"
          >{{ $t("message.projectInfo.name") }}:</span
        >
        <el-input
          v-model="data.name"
          :placeholder="$t('message.newProject.pleaseEnterName')"
          style="width: 400px"
        ></el-input>
      </div>
      <div class="tasks-list">
        <div class="tasks-list-top">
          <span>{{ $t("message.newProject.taskList") }}</span>
          <div class="add-task" @click="addTask">
            <img src="@/assets/add-task.svg" alt="" />
            <span style="margin-left: 10px">{{
              $t("message.newProject.addTask")
            }}</span>
          </div>
        </div>
        <el-table
          :data="tableTasks"
          style="width: 100%; margin-top: 20px"
          stripe
        >
          <el-table-column
            prop="sortOrder"
            :label="$t('message.projectTask.sortOrder')"
            width="100px"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="type"
            :label="$t('message.projectTask.type')"
            align="center"
            width="120px"
          >
            <template slot-scope="scope">
              {{ zhTaskType(scope.row.type) }}
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
                  @click="deleteTask(scope.row, scope.$index)"
                  type="text"
                  style="color: rgba(177, 177, 255, 1)"
                  >{{ $t("message.delete") }}</el-button
                >
              </div>
            </template>
          </el-table-column>

          <EmptyTableContent slot="empty"></EmptyTableContent>
        </el-table>
        <div v-if="tasks.length" class="pagination">
          <el-pagination
            :page-size="size"
            :current-page="page"
            background
            layout="total, prev, pager, next"
            @current-change="pageChange"
            :total="tasks.length"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="sumbit-div" style="margin-top: 30px">
      <el-button
        :loading="loading"
        @click="sumbit"
        :disabled="!isConfirm"
        class="sumbit-btn"
        type="primary"
        >{{ $t("message.sumbit") }}</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import addTaskDialog from "@/components/add-task";
import deleteTaskDialog from "@/components/delete-task";
import EmptyTableContent from "@/components/empty-table-content";
import { PAGE, SIZE } from "@/js/constant";
import { createProject } from "@/js/api/v1/project";

export default {
  name: "newProject",
  data() {
    return {
      data: {
        name: "",
        type: "manual",
      },
      tasks: [],
      page: PAGE,
      size: SIZE,
      loading: false,
    };
  },
  components: {
    EmptyTableContent,
  },
  computed: {
    ...mapGetters(["userInfo"]),
    tableTasks() {
      if (this.tasks.length) {
        const TotalPage = Math.ceil(this.tasks.length / this.size);
        if (this.page > TotalPage) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.page = TotalPage;
        }
        return this.tasks.slice(
          (this.page - 1) * this.size,
          this.page * this.size
        );
      }
      return [];
    },
    isConfirm() {
      return this.data.name && this.tasks.length;
    },
  },
  methods: {
    async sumbit() {
      this.loading = true;
      try {
        const data = Object.assign({}, this.data, { tasks: this.tasks });
        const createRes = await createProject(this.userInfo.address, data);
        if (createRes.isSuccess()) {
          this.$message.success(this.$t("message.newProject.createSuccess"));
          this.$router.push("/projectManage/detail/" + createRes.data._id);
        }
      } catch (error) {
        this.$message.error(error.message);
      } finally {
        this.loading = false;
      }
    },
    deleteTask(info, index) {
      deleteTaskDialog().show(info, () => {
        const removedItem = this.tasks.splice(index, 1)[0];
        for (let i = index; i < this.tasks.length; i++) {
          this.tasks[i].sortOrder = i + 1;
        }
        return removedItem;
      });
    },
    async pageChange(page) {
      this.page = page;
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
    addTask() {
      addTaskDialog().show((data) => {
        this.tasks.push(
          Object.assign({}, data, { sortOrder: this.tasks.length + 1 })
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.new-project {
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
    .content-top {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(26, 32, 36, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      font-weight: 400;
    }
    .tasks-list {
      padding: 20px;
      background: rgba(13, 26, 33, 1);
      .tasks-list-top {
        display: flex;
        justify-content: space-between;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        font-weight: 400;
        .add-task {
          display: flex;
          color: rgba(177, 177, 255, 1);
          cursor: pointer;
        }
      }
      .pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }
  }
  .sumbit-div {
    display: flex;
    justify-content: center;
    align-items: center;
    .sumbit-btn {
      width: 120px;
      height: 40px;
      border-radius: 20px;
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
    }
  }
}
</style>
