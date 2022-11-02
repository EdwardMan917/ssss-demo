<template>
  <div class="main">
    <van-button
      type="primary"
      @click="landNewWalletPage()"
    >Create New Wallet</van-button>
    <van-button
      type="primary"
      @click="landRestorePage()"
    >Restore Wallet</van-button>
  </div>
  <WalletDetails></WalletDetails>
</template>

<script setup>
import WalletDetails from  "./WalletDetails.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { store } from "../store";

const router = useRouter();

const landNewWalletPage = () => {
  router.push({ path: "/ssss-demo/create" });
}

const landRestorePage = () => {
  router.push({ path: "/ssss-demo/restore" });
}

onMounted(() => {
  store.setPageTitle("Wallet")
});

</script>

<style lang="less" scoped>
@import "../style.less";
.main {
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

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
