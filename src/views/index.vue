<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <index-top></index-top>
    <index-content style="flex: 1"></index-content>
  </div>
</template>

<script>
import indexTop from "@/components/index-top";
import indexContent from "@/components/index-content";

export default {
  name: "index",
  components: {
    indexTop,
    indexContent,
  },
};
</script>

<style></style>
