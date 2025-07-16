<template>
  <div>
    <div class="left-top">
      <img src="@/assets/client-logo.svg" alt="" />
      <span style="margin-left: 10px">{{ $t("message.waterMargin") }}</span>
    </div>
    <div class="left-menu">
      <div
        v-for="(menu, index) in menus"
        :key="index"
        :style="{ marginTop: index ? '10px' : '0px' }"
      >
        <div v-if="menu.name" @click="selectMenu(index)">
          <div
            class="menu-item"
            style="height: 46px"
            @click="toPath(menu.path)"
            :style="{
              background:
                menu.name == currentMenu
                  ? 'rgba(34, 38, 55, 1)'
                  : 'rgba(34, 38, 55, 0)',
            }"
          >
            <div
              class="menu-item-icon"
              :style="{
                background:
                  menu.name == currentMenu
                    ? 'rgba(132, 132, 221, 1)'
                    : 'rgba(132, 132, 221, 0)',
                marginLeft: '4px',
              }"
            >
              <img :src="menu.meta.icon" alt="" />
            </div>
            <span style="margin-left: 10px">{{ menu.meta.title }}</span>
          </div>
        </div>
        <div v-if="menu.parentMenu" @click="selectMenu(index)">
          <div
            class="menu-item"
            :style="{
              background:
                menu.parentMenu == currentParentMenu || index == selectMenuIndex
                  ? 'rgba(34, 38, 55, 1)'
                  : 'rgba(34, 38, 55, 0)',
              flexDirection: 'column',
            }"
          >
            <div
              style="
                width: 100%;
                height: 46px;
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <div style="display: flex; align-items: center">
                <div
                  class="menu-item-icon"
                  :style="{
                    background:
                      menu.parentMenu == currentParentMenu
                        ? 'rgba(132, 132, 221, 1)'
                        : 'rgba(132, 132, 221, 0)',
                    marginLeft: '4px',
                  }"
                >
                  <img :src="menu.meta.icon" alt="" />
                </div>
                <span style="margin-left: 10px">{{ menu.meta.title }}</span>
              </div>
              <img
                :style="{
                  marginRight: '20px',
                  transform:
                    menu.parentMenu == currentParentMenu ||
                    index == selectMenuIndex
                      ? 'rotate(90deg)'
                      : 'rotate(0deg)',
                }"
                src="@/assets/right-arrow.svg"
                alt=""
              />
            </div>
            <div
              v-if="
                (menu.subMenus && menu.parentMenu == currentParentMenu) ||
                index == selectMenuIndex
              "
              style="width: 100%"
            >
              <div
                v-for="(subMenu, index) in menu.subMenus"
                :key="index"
                class="sub-menu-item"
                @click="toPath(subMenu.path)"
                :style="{
                  marginTop: index == 0 ? '0' : '4px',
                  background:
                    subMenu.name == currentMenu
                      ? 'rgba(43, 46, 63, 1)'
                      : 'rgba(43, 46, 63, 0)',
                }"
              >
                <div
                  style="margin-left: 4px; justify-content: start"
                  class="menu-item-icon"
                >
                  <div
                    v-if="subMenu.name == currentMenu"
                    style="margin-left: 10px"
                    class="color-block"
                  ></div>
                </div>
                <img
                  style="width: 12px; height: 14px; margin-left: 13px"
                  :src="
                    subMenu.name == currentMenu
                      ? subMenu.meta.subIconSelected
                      : subMenu.meta.subIcon
                  "
                  alt=""
                />
                <span
                  :style="{
                    color:
                      subMenu.name == currentMenu
                        ? 'rgba(177, 177, 255, 1)'
                        : 'rgba(255, 255, 255, 1)',
                  }"
                  style="font-size: 14px; margin-left: 10px"
                  >{{ subMenu.meta.title }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dynamicRouter from "@/router/dynamic-router";
import { mapGetters } from "vuex";

export default {
  name: "mainView-left",
  data() {
    return {
      selectMenuIndex: null,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    menus() {
      if (!this.userInfo) return [];
      const routers = dynamicRouter(this.userInfo);
      const router = routers.find((r) => r.meta.isMenu);
      const menus = router.children.filter((child) => child.meta.showMenu);
      const newMenus = [];
      for (const menu of menus) {
        if (menu.meta && menu.meta.isSubMenu) {
          const m = newMenus.find(
            (me) => me.parentMenu === menu.meta.parentMenu
          );
          if (m) {
            m.subMenus.push(menu);
          } else {
            newMenus.push({
              parentMenu: menu.meta.parentMenu,
              meta: {
                subMenu: true,
                title: menu.meta.parentTitle,
                icon: menu.meta.parentIcon,
              },
              subMenus: [menu],
            });
          }
        } else {
          newMenus.push(menu);
        }
      }
      return newMenus;
    },
    currentMenu() {
      if (this.$route.meta.belongMenu) {
        return this.$route.meta.belongMenu;
      }
      return this.$route.name;
    },
    currentParentMenu() {
      if (this.$route.meta.parentMenu) {
        return this.$route.meta.parentMenu;
      }
      const menus = this.menus;
      const menu = menus.find((m) => {
        return (
          m.name == this.currentMenu ||
          m.subMenus?.find((sub) => sub.name == this.currentMenu)
        );
      });
      return menu ? menu.name || menu.parentMenu : null;
    },
  },
  methods: {
    isCurrentMenu(menu) {
      if (menu.name) {
        return this.currentMenu == menu.name;
      }
      if (menu.parentMenu && menu.subMenus) {
        const item = menu.subMenus.filter(
          (sub) => sub.name == this.currentMenu
        );
        return item.length > 0;
      }
      return false;
    },
    toPath(path) {
      if (path != this.currentPath) {
        this.$router.push(path);
      }
    },
    selectMenu(index) {
      this.selectMenuIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.left-top {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 75px;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0px;
  line-height: 31.86px;
  color: rgba(255, 255, 255, 1);
}
.left-menu {
  color: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu-item {
    display: flex;
    align-items: center;
    width: 200px;
    border-radius: 25px;
    cursor: pointer;
    .menu-item-icon {
      border-radius: 25px;
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    .sub-menu-item {
      margin: 0px 4px;
      height: 40px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      .color-block {
        width: 4px;
        height: 10px;
        border-radius: 2px;
        background: rgba(132, 132, 221, 1);
      }
      &:hover {
        background: rgba(43, 46, 63, 1) !important;
      }
    }
    &:hover {
      background: rgba(34, 38, 55, 1) !important;
    }
  }
}
</style>
