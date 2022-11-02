<template>
  <div class="main">
    <div class="restore-section">
      <textarea ref="partsInput" ></textarea>
      <button class="primary-btn" @click="restorePhrase()" >Restore</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as secrets from "secrets.js";
import { store } from "../store";
import { Wallet } from "ethers";
import { Toast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const partsInput = ref(null);
defineExpose({ partsInput });

const restorePhrase = () => {
  let input = partsInput._value.value;
  // Validate and sanitize the input
  var parts = input.trim().split(/\s+/);
  // Combine the parts
  try {
    let combinedHex = secrets.combine(parts);
    let phrase = secrets.hex2str(combinedHex);
    store.setPhrase(phrase);

    const details = Wallet.fromMnemonic(phrase);
    store.setAddress(details.address);
    store.setPrivateKey(details.privateKey);

    Toast.success("Success");
    router.push({ path:"/ssss-demo/" })
  } catch {
    console.log("GG Error");
    Toast.fail("Fail");
  }
};

onMounted(() => {
  store.setPageTitle("Restore Wallet");
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

  .restore-section {
    margin-top: 50px;
    padding: 20px 10px;
    height: auto;
    width: 300px;
    background-color: white;
    border-radius: @borderRadius;

    textarea {
      width: 300px;
      max-width: 300px;
      height: 400px;
      border: none;
      padding: 0;
    }

    .primary-btn {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
