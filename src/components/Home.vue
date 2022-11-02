<template>
  <div class="main">
    <div class="address-section">
      <div class="title">Address</div>
      <div class="content">{{ store.address }}</div>
    </div>
    <van-button
      type="primary"
      @click="landNewWalletPage()"
    >Create New Wallet</van-button>
    <van-button
      type="primary"
      @click="landRestorePage()"
    >Restore Wallet</van-button>
    <van-button
      type="primary"
      @click="landWalletPage()"
    >Wallet Details</van-button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { store } from "../store";
import { Toast } from 'vant';

const router = useRouter();

const landNewWalletPage = () => {
  router.push({ path: "/ssss-demo/create" });
}

const landRestorePage = () => {
  router.push({ path: "/ssss-demo/restore" });
}

const landWalletPage = () => {
  if (store.phrase == "") {
    Toast.fail("No details");
    return;
  }
  router.push({ path: "/ssss-demo/wallet" });
}

onMounted(() => {
  store.setPageTitle("Wallet")
});

</script>

<style lang="less" scoped>
@import "../style.less";
.main {
  min-width: 100vw;
  min-height: calc(100vh - @headerHeight);
  display: flex;
  flex-direction: column;
  align-items: center;

  .address-section {
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

  .van-button{
    width: 200px;
    margin-top: 50px;
    background-color: @buttonColor;
    border: none;
    font-weight: bold;

    &:hover{
      border: none;
    }

    &:focus{
      outline: none;
    }
  }
}
</style>
