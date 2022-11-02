import { reactive } from "vue";

export const store = reactive({
  pageTitle: "Wallet",
  address: "",
  phrase: "",
  privateKey: "",
  keyParts: [],
  setPageTitle(title) {
    this.pageTitle = title;
  },
  setPhrase(newPhrase) {
    this.phrase = newPhrase;
  },
  setKeyParts(newParts) {
    this.keyParts = newParts;
  },
  setAddress(newAddress) {
    this.address = newAddress;
  },
  setPrivateKey(newPK) {
    this.privateKey = newPK;
  }
});