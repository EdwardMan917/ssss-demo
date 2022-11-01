<template>
  <div class="main">
    <div class="section">
      <h3>Mnemonic Phrase</h3>
      <div class="phrase">{{ phrase }}</div>
      <van-button type="primary" @click="getNewPhrase()">Get New Phrase</van-button>

      <h3>Secret Parts</h3>
      <div class="secret-parts" v-for="(part, index) in secretParts" :key="index">
        <p class="index">{{ index + 1 }}:</p>
        <div class="part">{{ part }}</div>
      </div>
      <van-button type="primary" @click="generateKeyParts()"
        >Get New Secrets</van-button
      >

      <div class="button-row">
        <van-button
          :class="accessToken ? 'green-van-button' : 'red-van-button'"
          @click="login()"
        >Google Auth</van-button>
        <van-button 
          :class="accessToken ? 'green-van-button' : ''"
          :disabled="accessToken ? false : true"
          @click="upload()"
        >Upload</van-button>
      </div>
      <div class="status" v-if="accessToken">Login Successfully!</div>
      <div class="status" v-else>Login Required</div>
    </div>

    <div class="section">
      <h3>Restore Mnemonic Phrase</h3>
      <div
        class="phrase"
        :class="phrase == restored ? 'green-border' : 'red-border'"
      >{{ restored }}</div>
      <textarea ref="keyParts" v-model="input" ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as secrets from "secrets.js";
import { generateMnemonic } from "bip39";
import { googleSdkLoaded } from "vue3-google-login";
import { Toast } from 'vant';

const phrase = ref("");
const requiredParts = ref(2);
const totalParts = ref(2);
const secretParts = ref(["-", "-"]);
const restored = ref("");
const accessToken = ref("");
const uploading = ref(false);
const input = ref("");

watch(input, (input, prevInput) => {
  restorePhrase();
})

const keyParts = ref(null);
defineExpose({ keyParts });

const getNewPhrase = () => {
  const newPhrase = generateMnemonic();
  phrase.value = newPhrase;
};

const generateKeyParts = () => {
  var secretHex = secrets.str2hex(phrase.value);
  var minPad = 1024; // see https://github.com/amper5and/secrets.js#note-on-security
  var parts = secrets.share(
    secretHex,
    totalParts.value,
    requiredParts.value,
    minPad
  );
  secretParts.value = parts;
};

const restorePhrase = () => {
  let input = keyParts._value.value;

  // Validate and sanitize the input
  var parts = input.trim().split(/\s+/);

  // Combine the parts
  try {
    let combinedHex = secrets.combine(parts);
    let phrase = secrets.hex2str(combinedHex);
    restored.value = phrase;
  } catch {
    console.log("GG Error");
  }
};

const login = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initTokenClient({
        client_id:
          "224572308047-7nhsugkrdnofunvmopjm4r2uirttu4fl.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/drive openid",
        callback: (response) => {
          accessToken.value = response.access_token;
        },
      })
      .requestAccessToken();
  });
};

const upload = () => {
  uploading.value = true;
  
  Toast.loading({
    message: 'Loading...',
    forbidClick: true,
  });
  
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${accessToken.value}`);
  myHeaders.append("Content-Type", "multipart/related; boundary=bOuNdArYsTrInG");

  let requestBody = 
`
--bOuNdArYsTrInG
Content-Type: application/json; charset=UTF-8

{
  "name": "keyPart.txt"
}

--bOuNdArYsTrInG
Content-Type: text/txt

${secretParts.value[0]}

--bOuNdArYsTrInG--
`;

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: requestBody,
    redirect: 'follow'
  };

  fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", requestOptions)
    .then((response) => {
      uploading.value = false;
      if (response.ok) {
        Toast.success('Success');
      } else {
        Toast.fail('Fail');
      }
    })
    .catch((err) => {
      console.log('error', err);
      uploading.value = false;
      Toast.fail('Fail');
    });
}

onMounted(() => {
  getNewPhrase();
});
</script>

<style lang="less" scoped>
.main {
  min-width: 100vw;
  display: flex;
  justify-content: space-evenly;
  --van-button-primary-background-color: #00B7C2;
  --van-button-border-width: 0px;
  --van-button-primary-color: #323233;

  .section {
    height: auto;
    width: 45%;
    max-width: 45%;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    --van-button-default-height: 30px;

    .phrase {
      height: 50px;
      width: calc(100% - 20px);
      padding: 20px 10px;
      margin-bottom: 20px;
      text-align: center;
      border: 1px solid white;
      overflow-wrap: break-word;
      overflow-y: hidden;
    }

    .green-border {
      border: 1px #65C18C solid;
    }

    .red-border {
      border: 1px #FF7BA9 solid;
    }

    .config {
      display: flex;
      margin-bottom: 20px;
      --van-stepper-input-height: 22px;

      p {
        margin: 0 30px 0 0;
      }
    }

    .secret-parts {
      width: 100%;
      max-width: 100%;
      margin-bottom: 20px;
      
      .index {
        text-align: left;
        margin: 0;
        font-weight: bold;
        width: 100%;
      }

      .part {
        padding: 20px 10px;
        border: 1px solid white;
        margin: 0;
        width: calc(100% - 20px);
        overflow: scroll;
      }
    }

    h3 {
      margin-top: 30px;
      width: 100%;
      text-align: left;
    }

    textarea {
      width: 100%;
      height: 300px;
    }

    .button-row {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      width: 200px;
      .green-van-button{
        background-color: #65C18C;
        border: none;
      }

      .red-van-button{
        background-color: #FF7BA9;
        border: none;
      }
    }

    .status{
      font-size: 13px;
    }
  }
}
</style>
