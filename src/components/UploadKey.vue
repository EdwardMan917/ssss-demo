<template>
  <div class="main">
    <div class="description">
      Your passphrase is stored securely in a distributed manner. Please follow
      the steps below and click done to complete
    </div>
    <div class="upload-section">
      <div class="title">Step 1</div>
      <div class="content">
        Store the first part of your passphrase secret in your preferred cloud storage.
      </div>
      <div class="content">
        No one can recover the passphrase with only this file.
      </div>
      <img :src="driveIconSrc" @click="cloudUpload(0)" />
      <div
        class="status"
        :class="driveUploaded ? 'highlight' : ''"
      >{{ driveStatus }}</div>
    </div>
    <div class="upload-section">
      <div class="title">Step 2</div>
      <div class="content">
        Encrypt second part of your passphrase secret with FaceID.
      </div>
      <div class="content">
        The file can only be opened with FaceID.
      </div>
      <img class="upload" :src="uploadIconSrc" @click="cloudUpload(1)" />
      <div
        class="status"
        :class="uploaded ? 'highlight' : ''"
      >{{ uploadStatus }}</div>
    </div>
    <van-button
      class="primary-btn"
      :class="driveUploaded && uploaded ? '' : 'btn-disabled'"
      :disabled="!driveUploaded || !uploaded"
      @click="goHome()"
    >Done</van-button>
    <WalletDetails></WalletDetails>
  </div>
</template>

<script setup>
import WalletDetails from  "./WalletDetails.vue";
import { ref, onMounted } from "vue";
import { googleSdkLoaded } from "vue3-google-login";
import { Toast } from 'vant';
import { store } from "../store";
import driveIcon from "../assets/googledrive.svg";
import uploadIcon from "../assets/upload.svg";
import { useRouter } from "vue-router";

const router = useRouter();

const driveIconSrc = ref(driveIcon);
const uploadIconSrc = ref(uploadIcon);

const driveUploaded = ref(false);
const driveStatus = ref("Incomplete");
const uploaded = ref(false);
const uploadStatus = ref("Incomplete");
const accessToken = ref("");

const cloudUpload = (partIndex) => {
  if (accessToken.value == "") {
    googleLoginUpload(store.keyParts[partIndex], partIndex)
  } else {
    upload(store.keyParts[partIndex], partIndex);
  }
}

const googleLoginUpload = (keyPart, partIndex) => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initTokenClient({
        client_id:
          "224572308047-7nhsugkrdnofunvmopjm4r2uirttu4fl.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/drive openid",
        callback: (response) => {
          accessToken.value = response.access_token;
          upload(store.keyParts[partIndex], partIndex);
        },
      })
      .requestAccessToken();
  });
};

const upload = (keyPart, partIndex) => {
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
  "name": "keypart_${partIndex + 1}.txt"
}

--bOuNdArYsTrInG
Content-Type: text/plain

${keyPart}

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
      if (response.ok) {
        Toast.success('Success');
        if (partIndex == 0) {
          driveUploaded.value = true;
          driveStatus.value = "Completed";
        } else {
          uploaded.value = true;
          uploadStatus.value = "Completed";
        }
      } else {
        Toast.fail('Fail');
      }
    })
    .catch((err) => {
      console.log('error', err);
      Toast.fail('Fail');
    });
}

const goHome = () => {
  router.push({ path: "/ssss-demo/" });
}

onMounted(() => {
  store.setPageTitle("Create Recovery Kit");
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

  .description {
    width: 300px;
    margin-top: 20px;
    font-size: 14px;
  }

  .upload-section {
    margin-top: 20px;
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
      margin-top: 5px;
      font-size: 14px;
      color: black;
      line-height: 15px;
    }

    .status {
      font-size: 16px;
      font-weight: bold;
      color: grey;
    }

    .highlight {
      color: @primaryColor;
    }

    img {
      margin-top: 10px;
      width: 36px;
      height: 36px;
      object-fit: contain;
      cursor: pointer;
    }

    .upload {
      width: 30px;
      height: 30px;
    }
  }

  .primary-btn {
    margin-top: 20px;
  }

  .btn-disabled {
    cursor: not-allowed;
  }
}
</style>
