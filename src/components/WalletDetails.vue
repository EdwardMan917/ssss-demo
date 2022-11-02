<template>
  <div class="main">
    <div class="phrase-section">
      <div class="title">Address</div>
      <div class="content">{{ store.address }}</div>
    </div>
    <div class="phrase-section">
      <div class="title">Mnemonic Phrase</div>
      <div class="content">{{ store.phrase }}</div>
    </div>
    <div class="phrase-section">
      <div class="title">Private Key</div>
      <div class="content">{{ store.privateKey }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { store } from "../store";

onMounted(() => {
  store.setPageTitle("Wallet Details");
});
</script>

<style lang="less" scoped>
@import "../style.less";
.main {
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  --van-button-primary-background-color: #00b7c2;
  --van-button-border-width: 0px;
  --van-button-primary-color: #323233;

  .phrase-section {
    margin-top: 50px;
    padding: 20px 10px;
    height: auto;
    width: 300px;
    background-color: white;
    border-radius: @borderRadius;

    .title {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: bold;
      color: @primaryColor;
    }

    .content {
      margin-top: 10px;
      font-size: 16px;
      color: black;
      line-height: 15px;
      overflow-wrap: break-word;
    }
  }
}
</style>
