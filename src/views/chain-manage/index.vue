<template>
  <div class="chain-manage">
    <div class="view-top">
      <span>{{ $t("message.menus.chain") }}</span>
      <el-button v-if="isAuthWrite" @click="addChain">
        <div class="add-account-bt">
          <img src="@/assets/add.svg" alt="" />
          <span style="margin-left: 6px">{{
            $t("message.chainManage.addChain")
          }}</span>
        </div>
      </el-button>
    </div>
    <div class="view-content" style="margin-top: 20px">
      <el-table :data="tableChains" style="width: 100%" stripe>
        <el-table-column prop="name" :label="$t('message.chainInfo.name')">
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <img
                style="width: 20px; height: 20px"
                :src="showChainLogo(scope.row.logo)"
                alt=""
                srcset=""
              />
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="bip44" :label="$t('message.chainInfo.bip44')">
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('message.operation')"
          :width="120"
        >
          <template slot-scope="scope">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div style="width: 28px" v-if="!isAuthWrite">- -</div>
              <el-button
                v-else
                @click="modifyChain(scope.row)"
                type="text"
                style="color: rgba(177, 177, 255, 1)"
                >{{ $t("message.modify") }}</el-button
              >
              <div style="width: 28px" v-if="!isAuthWrite">- -</div>
              <el-button
                v-else
                @click="deleteChain(scope.row)"
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
  fetchChainList,
  createChain,
  modifyChain,
  deleteChain,
} from "@/js/api/v1/chain";
import addChainDialog from "@/components/add-chain";
import modifyChainDialog from "@/components/modify-chain";
import deleteChainDialog from "@/components/delete-chain";
import { fetchChains } from "@/js/api/v1/public";

export default {
  name: "chain-manage",
  data() {
    return {
      currentModule: "chain",
      isAuthWrite: true,
      page: PAGE,
      size: SIZE,
      chains: [],
    };
  },
  async mounted() {
    if (this.userInfo.modules) {
      const auth = this.userInfo.modules.find(
        (m) => m.module == this.currentModule
      ).auth;
      this.isAuthWrite = auth.indexOf("w") > -1;
    }
    await this.fetchChainList();
  },
  components: {
    EmptyTableContent,
  },
  computed: {
    ...mapGetters(["userInfo"]),
    count() {
      return this.chains.length;
    },
    tableChains() {
      if (this.chains.length) {
        const TotalPage = Math.ceil(this.count / this.size);
        if (this.page > TotalPage) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.page = TotalPage;
        }
        return this.chains.slice(
          (this.page - 1) * this.size,
          this.page * this.size
        );
      }
      return [];
    },
  },
  methods: {
    addChain() {
      addChainDialog().show(async (data) => {
        try {
          const createChainRes = await createChain(this.userInfo.address, data);
          if (createChainRes.isSuccess()) {
            this.$message.success(this.$t("message.addChain.addSuccess"));
            await this.fetchChainList();
            const chains = await fetchChains();
            this.$store.dispatch("setAllChains", chains);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    modifyChain(info) {
      modifyChainDialog().show(info, async (data) => {
        try {
          const res = await modifyChain(this.userInfo.address, info._id, data);
          if (res.isSuccess()) {
            this.$message.success(this.$t("message.modifyChain.modifySuccess"));
            await this.fetchChainList();
            const chains = await fetchChains();
            this.$store.dispatch("setAllChains", chains);
          } else {
            this.$message.error(res.message);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    deleteChain(info) {
      deleteChainDialog().show(info, async () => {
        try {
          const res = await deleteChain(this.userInfo.address, info._id);
          if (res.isSuccess()) {
            this.$message.success(this.$t("message.deleteChain.deleteSuccess"));
            await this.fetchChainList();
            const chains = await fetchChains();
            this.$store.dispatch("setAllChains", chains);
          } else {
            this.$message.error(res.message);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    async fetchChainList() {
      try {
        const { address, role } = this.userInfo;
        const res = await fetchChainList(address);
        if (res.isSuccess()) {
          this.chains = res.data;
        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    showChainLogo(str) {
      try {
        return require(`@/assets/chains/${str}`);
      } catch (error) {
        return require(`@/assets/chains/default.png`);
      }
    },
    async pageChange(page) {
      this.page = page;
    },
  },
};
</script>

<style lang="scss" scoped>
.chain-manage {
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
