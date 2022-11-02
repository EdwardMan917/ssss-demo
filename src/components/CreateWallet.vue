<template>
  <div class="main">
    <div class="recovery-section">
      <div class="title">
        Secure Your Wallet
      </div>
      <div class="content">
        Create a Recovery Kit to easily restore your wallet.
      </div>
      <div class="content">
        No passphrase or private key needed.
      </div>
      <button class="primary-btn" @click="loadUploadPage()">Let's Go</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { generateMnemonic } from "bip39";
import * as secrets from "secrets.js";
import { store } from "../store";
import { useRouter } from "vue-router";
import { Wallet } from "ethers";

const router = useRouter();

const getNewPhrase = () => {
  if (store.phrase != "") return;
  const newPhrase = generateMnemonic();
  store.setPhrase(newPhrase);
  
  const keyParts = generateKeyParts();
  store.setKeyParts(keyParts);
  
  const details = Wallet.fromMnemonic(newPhrase);
  store.setAddress(details.address);
  store.setPrivateKey(details.privateKey);
};

const generateKeyParts = () => {
  let phrase = store.phrase;
  let secretHex = secrets.str2hex(phrase);
  let minPad = 1024; // see https://github.com/amper5and/secrets.js#note-on-security
  let parts = secrets.share(
    secretHex,
    2, // total parts
    2, // required parts
    minPad
  );
  return parts;
};

const loadUploadPage = () => {
  router.push({ path: "/ssss-demo/upload" });
}

onMounted(() => {
  store.setPageTitle("Create New Wallet")
  getNewPhrase();
});
</script>

<style lang="less" scoped>
@import "../style.less";
.main {
  min-width: 100vw;
  display: flex;
  justify-content: space-evenly;
  --van-button-primary-background-color: #00b7c2;
  --van-button-border-width: 0px;
  --van-button-primary-color: #323233;

  .recovery-section {
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
      font-size: 14px;
      color: black;
      line-height: 15px;
    }

    .primary-btn {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
