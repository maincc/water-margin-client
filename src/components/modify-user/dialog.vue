<template>
  <div id="modify-user">
    <el-dialog :visible.sync="visible" width="600px">
      <div slot="title" class="title">
        {{ $t("message.modifyUser.title") }}
      </div>
      <div class="content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label-width="136"
            :label="$t('message.userInfo.role') + ':'"
            prop="role"
            style="display: flex"
          >
            <div class="disable-div">
              {{
                form.role == AccountRole.admin
                  ? $t("message.userInfo.admin")
                  : $t("message.userInfo.user")
              }}
            </div>
          </el-form-item>

          <el-form-item
            label-width="136"
            :label="$t('message.userInfo.name') + ':'"
            prop="name"
            style="display: flex"
          >
            <el-input
              v-model="form.name"
              :placeholder="$t('message.addUser.pleaseEnterName')"
            ></el-input>
          </el-form-item>

          <el-form-item
            label-width="136"
            :label="$t('message.userInfo.account') + ':'"
            prop="address"
            style="display: flex"
          >
            <div class="disable-div">
              {{ form.address }}
            </div>
          </el-form-item>

          <el-form-item
            label-width="136"
            :label="$t('message.addUser.setPermissions') + ':'"
            prop="modules"
            style="display: flex"
            v-if="form.role === AccountRole.user"
          >
            <div class="checkbox">
              <div
                v-for="(item, index) in allModules"
                :key="item.order"
                :style="{
                  borderTop: index
                    ? '1px solid rgba(232, 233, 234, 1)'
                    : 'none',
                }"
                class="checkbox-item"
              >
                <div class="left">
                  <div
                    style="
                      width: 100%;
                      justify-content: start;
                      padding-left: 20px;
                    "
                    @click="handleModule(item)"
                  >
                    <img
                      v-if="selectModules[item.name].h"
                      src="@/assets/checkbox/selected.svg"
                      alt=""
                    />
                    <img v-else src="@/assets/checkbox/select.svg" alt="" />
                    <span style="margin-left: 10px">{{ item.desc }}</span>
                  </div>
                </div>
                <div class="right">
                  <div style="width: 50%" @click="handleRead(item)">
                    <img
                      v-if="selectModules[item.name].r"
                      src="@/assets/checkbox/selected.svg"
                      alt=""
                    />
                    <img v-else src="@/assets/checkbox/select.svg" alt="" />
                    <span style="margin-left: 10px">{{
                      $t("message.read")
                    }}</span>
                  </div>
                  <div style="width: 50%" @click="handleWrite(item)">
                    <img
                      v-if="selectModules[item.name].w"
                      src="@/assets/checkbox/selected.svg"
                      alt=""
                    />
                    <img v-else src="@/assets/checkbox/select.svg" alt="" />
                    <span style="margin-left: 10px">{{
                      $t("message.write")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>

        <div class="btn-group">
          <el-button @click="close" class="btn cancle">{{
            $t("message.cancel")
          }}</el-button>
          <el-button
            type="primary"
            :loading="loading"
            :disabled="!isConfirm"
            @click="confirm"
            style="margin-left: 60px"
            class="btn confirm"
            >{{ $t("message.confirm") }}</el-button
          >
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
      info: null,
      fun: null,
      form: {
        role: "",
        address: "",
        name: "",
        modules: [],
      },
      AccountRole: AccountRole,
      selectModules: {},
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["allModules"]),
    isConfirm() {
      const { role, address, name } = this.uploadInfo;
      if (role == AccountRole.admin) {
        if (name == this.info.name) {
          return false;
        } else {
          return true;
        }
      } else {
        const modules = this.uploadInfo.modules;
        if (this.info) {
          if (name != this.info.name) {
            return true;
          }
          const infoModules = this.info.modules;
          if (modules.length != infoModules.length) {
            return true;
          } else {
            let bool = false;
            for (const m of modules) {
              const infoModule = infoModules.find(
                (im) => m.module == im.module
              );
              if (infoModule) {
                if (m.auth != infoModule.auth) {
                  bool = true;
                  break;
                }
              } else {
                bool = true;
                break;
              }
            }
            return bool;
          }
        } else {
          return false;
        }
      }
    },
    uploadInfo() {
      const { role, address, name } = this.form;
      if (role == AccountRole.admin) {
        return {
          role,
          address,
          name,
          modules: null,
        };
      } else {
        const modules = [];
        this.allModules.forEach((item) => {
          const { name } = item;
          if (this.selectModules[name]) {
            const { r, w } = this.selectModules[name];
            if (r || w) {
              modules.push({
                module: name,
                auth: w ? "rw" : "r",
              });
            }
          }
        });
        return {
          role,
          address,
          name,
          modules,
        };
      }
    },
  },
  methods: {
    show(info, fun) {
      console.log(this.AccountRole, AccountRole);
      this.info = info;
      this.fun = fun;
      this.visible = true;
      this.form.role = info.role;
      this.form.address = info.address;
      this.form.name = info.name;
      this.initModules();
    },
    initModules() {
      const modules = this.info.modules;
      if (modules) {
        this.allModules.forEach((item) => {
          const module = modules.find((m) => m.module == item.name);
          const auth = module ? module.auth : "";
          this.selectModules[item.name] = {
            r: auth.indexOf("r") > -1,
            w: auth.indexOf("w") > -1,
            h: auth.indexOf("r") > -1 || auth.indexOf("w") > -1,
          };
        });
      }
    },
    resetForm() {
      this.form = {
        role: "",
        address: "",
        name: "",
        modules: [],
      };
    },
    close() {
      this.visible = false;
      this.resetForm();
    },
    handleModule(module) {
      let { name } = module;
      let { r, w, h } = this.selectModules[name];
      if (h) {
        this.selectModules = {
          ...this.selectModules,
          [name]: {
            r: false,
            w: false,
            h: false,
          },
        };
      } else {
        this.selectModules = {
          ...this.selectModules,
          [name]: {
            r: true,
            w: true,
            h: true,
          },
        };
      }
    },
    handleRead(module) {
      let { name } = module;
      let { r, w, h } = this.selectModules[name];
      if (r) {
        h = false;
        r = false;
        if (w) {
          w = false;
        }
      } else {
        r = true;
        h = true;
      }
      this.selectModules = {
        ...this.selectModules,
        [name]: {
          r,
          w,
          h,
        },
      };
    },
    handleWrite(module) {
      let { name } = module;
      let { r, w, h } = this.selectModules[name];
      if (w) {
        w = false;
      } else {
        h = true;
        r = true;
        w = true;
      }
      this.selectModules = {
        ...this.selectModules,
        [name]: {
          r,
          w,
          h,
        },
      };
    },
    async confirm() {
      this.loading = true;
      await this.fun(this.uploadInfo);
      this.loading = false;
      this.close();
    },
  },
};
</script>

<style lang="scss">
#modify-user {
  .el-dialog {
    border-radius: 30px;
    .el-dialog__header {
      padding: 16px 20px 15px;
      border-bottom: 1px solid rgba(232, 233, 234, 1);
    }
    .el-dialog__body {
      padding: 30px 70px;
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
.disable-div {
  height: 36px;
  width: calc(100% - 20px);
  padding-left: 20px;
  background: rgba(240, 240, 240, 1);
  border-radius: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.checkbox {
  border: 1px solid rgba(232, 233, 234, 1);
  border-radius: 6px;
  height: 280px;
  overflow: auto;
  .checkbox-item {
    display: flex;
    div {
      width: 50%;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .left {
      background: rgba(250, 250, 250, 1);
      border-right: 1px solid rgba(232, 233, 234, 1);
    }
    .right {
      background: rgba(255, 255, 255, 1);
    }
  }
}
.btn-group {
  display: flex;
  justify-content: center;
  .btn {
    width: 100px;
    height: 36px;
    border-radius: 20px;
  }
  .cancle {
    border: 1px solid rgba(232, 233, 234, 1);
    font-size: 14px;
    color: rgba(81, 86, 95, 1);
    &:hover {
      color: rgba(127, 127, 227, 1);
      border: 1px solid rgba(132, 132, 221, 1);
    }
  }
  .confirm {
    // background: rgba(132, 132, 221, 1);
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
