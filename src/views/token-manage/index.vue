<template>
  <div class="token-manage">
    <div class="view-top">
      <span>{{ $t("message.menus.token") }}</span>
      <el-button v-if="isAuthWrite" @click="addToken">
        <div class="add-account-bt">
          <img src="@/assets/add.svg" alt="" />
          <span style="margin-left: 6px">{{
            $t("message.tokenManage.addToken")
          }}</span>
        </div>
      </el-button>
    </div>
    <div class="view-content" style="margin-top: 20px">
      <el-table
        v-loading="tableLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tokens"
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="symbol"
          :label="$t('message.tokenInfo.symbol')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <img
                style="width: 20px; height: 20px"
                :src="showTokenLogo(scope.row.logo)"
                alt=""
                srcset=""
              />
              <span style="margin-left: 10px">{{ scope.row.symbol }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('message.tokenInfo.name')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <img
                style="width: 20px; height: 20px"
                :src="showTokenLogo(scope.row.logo)"
                alt=""
                srcset=""
              />
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="bip44"
          :label="$t('message.tokenManage.chainName')"
          :width="150"
        >
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <img
                style="width: 20px; height: 20px"
                :src="showChainLogo(scope.row.bip44)"
                alt=""
                srcset=""
              />
              <span style="margin-left: 10px">{{
                showChainName(scope.row.bip44)
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="decimals"
          :label="$t('message.tokenInfo.decimals')"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.decimals || "- -" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isNative"
          :label="$t('message.tokenInfo.isNative')"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.isNative ? $t("message.yes") : $t("message.no")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('message.operation')"
          :width="150"
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
                @click="modifyToken(scope.row)"
                v-else
                type="text"
                style="color: rgba(177, 177, 255, 1)"
                >{{ $t("message.modify") }}</el-button
              >
              <div style="width: 28px" v-if="!isAuthWrite">- -</div>
              <el-button
                @click="deleteToken(scope.row)"
                v-else
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
  fetchTokenList,
  createToken,
  deleteToken,
  modifyToken,
} from "@/js/api/v1/token";
import addTokenDialog from "@/components/add-token";
import deleteTokenDialog from "@/components/delete-token";
import modifyTokenDialog from "@/components/modify-token";
import { fetchTokens } from "@/js/api/v1/public";

export default {
  name: "token-manage",
  data() {
    return {
      currentModule: "token",
      isAuthWrite: true,
      page: PAGE,
      size: SIZE,
      tokens: [],
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
    await this.fetchTokenList();
  },
  components: {
    EmptyTableContent,
  },
  computed: {
    ...mapGetters(["userInfo", "allChains"]),
  },
  methods: {
    toDetail(info) {
      this.$router.push("/tokenManage/detail/" + info._id);
    },
    modifyToken(info) {
      modifyTokenDialog().show(info, async (data) => {
        try {
          const res = await modifyToken(this.userInfo.address, info._id, data);
          if (res.isSuccess()) {
            this.$message.success(this.$t("message.modifyToken.modifySuccess"));
            await this.fetchTokenList();
            const tokens = await fetchTokens();
            this.$store.dispatch("setAllTokens", tokens);
          } else {
            this.$message.error(res.message);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    deleteToken(info) {
      deleteTokenDialog().show(info, async () => {
        try {
          const res = await deleteToken(this.userInfo.address, info._id);
          if (res.isSuccess()) {
            this.$message.success(this.$t("message.deleteToken.deleteSuccess"));
            await this.fetchTokenList();
            const tokens = await fetchTokens();
            this.$store.dispatch("setAllTokens", tokens);
          } else {
            this.$message.error(res.message);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    addToken() {
      addTokenDialog().show(async (data) => {
        try {
          const createTokenRes = await createToken(this.userInfo.address, data);
          if (createTokenRes.isSuccess()) {
            this.$message.success(this.$t("message.addToken.addSuccess"));
            await this.fetchTokenList();
            const tokens = await fetchTokens();
            this.$store.dispatch("setAllTokens", tokens);
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      });
    },
    async pageChange(page) {
      this.page = page;
      await this.fetchTokenList();
    },
    async fetchTokenList() {
      this.tableLoading = true;
      try {
        const { address, role } = this.userInfo;
        const res = await fetchTokenList(address, this.page, this.size);
        if (res.isSuccess()) {
          this.tokens = res.data.list;
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
    showTokenLogo(str) {
      try {
        return require(`@/assets/tokens/${str}`);
      } catch (error) {
        return require(`@/assets/tokens/default.svg`);
      }
    },
    showChainLogo(str) {
      try {
        const chain = this.allChains.find((item) => item.bip44 == str);
        return require(`@/assets/chains/${chain?.logo}`);
      } catch (error) {
        return require(`@/assets/chains/default.png`);
      }
    },
    showChainName(str) {
      const chain = this.allChains.find((item) => item.bip44 == str);
      return chain ? chain.name : "- -";
    },
  },
};
</script>

<style lang="scss" scoped>
.token-manage {
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
