<template>
  <el-col slot="empty" style="margin-top: 120px">
    <el-col style="line-height: 1">
      <img src="@/assets/empty-content.svg" />
    </el-col>
    <el-col style="line-height: 20px; margin-top: 16px">
      <span
        >{{ $t("message.empty_content") }}
        <slot></slot>
      </span>
    </el-col>
    <slot name="emptyButton"></slot>
  </el-col>
</template>

<script>
export default {
  name: "EmptyTableContent",
};
</script>

<style></style>
