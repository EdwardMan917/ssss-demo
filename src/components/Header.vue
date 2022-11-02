<template>
  <div class="header">
    <img
      class="arrow"
      :class="hideArrow ? 'hidden' : ''"
      :src="headerArrow"
      @click="goBack()"
    />
    <div class="title">{{ title }}</div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import arrow from "../assets/arrow.svg";
import { store } from "../store";

const hideArrow = ref(true);
const headerArrow = ref(arrow);
const title = ref(store.pageTitle);

const route = useRoute();
watch(route, (newRoute, prevRoute) => {
  hideArrow.value = newRoute.path == "/ssss-demo/";
});
watch(() =>store.pageTitle, (newTitle, prevTitle) => {
  title.value = store.pageTitle;
});

const router = useRouter();
const goBack = () => {
  if (hideArrow.value) return;
  router.go(-1);
};
</script>

<style lang="less" scoped>
@import "../style.less";
.header {
  position: sticky;
  height: @headerHeight;
  width: 100vw;
  top: 0;
  background-color: #000;
  border-bottom: 1px solid #fff;
  text-align: center;
  font-size: 20px;
  font-weight: bold;

  .title {
    line-height: @headerHeight;
    user-select: none;
  }

  .arrow {
    position: absolute;
    left: 0;
    height: 30px;
    width: 30px;
    margin: calc((@headerHeight - 30px) / 2);
    object-fit: contain;
    transform: rotate(90deg);
    cursor: pointer;
  }

  .hidden {
    display: none;
  }
}
</style>
