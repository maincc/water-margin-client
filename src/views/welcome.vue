<template>
  <div class="welcome">
    <img style="margin-top: 165px" src="@/assets/welcome.svg" alt="" />
    <span style="margin-top: 24px">{{ $t("message.welcome") }}</span>
  </div>
</template>

<script>
export default {
  name: "welcome",
};
</script>

<style lang="scss" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 400px;
  }
  span {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -0.04px;
    line-height: 28px;
    color: rgba(150, 154, 179, 1);
    text-align: left;
    vertical-align: top;
  }
}
</style>
