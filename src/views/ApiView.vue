<template>
  <Particles
    id="tsparticles"
    :particles-init="particlesInit"
    :particles-loaded="particlesLoaded"
    :options="particlesConf"
  />
  <div class="common-layout">
    <el-container class="container">
      <el-header v-show="isShowHeader" class="header"><HeaderVue /></el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <el-footer v-show="isShowFooter" class="footer"><FooterVue /></el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";

import particles from "@/conf/particles";
import type { Engine } from "tsparticles-engine";
import type { Container } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export default defineComponent({
  name: "HomeView",
  props: {
    isHeader: {
      type: Boolean,
      default: true,
    },
    isFooter: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    HeaderVue,
    FooterVue,
  },
  data() {
    return {
      isShowHeader: this.isHeader,
      isShowFooter: this.isFooter,
      particlesConf: particles.conf,
    };
  },
  methods: {
    async particlesInit(engine: Engine) {
      await loadFull(engine);
    },
    async particlesLoaded(container: Container) {
      console.log("Particles container loaded", container);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";

#tsparticles {
  display: flex;
  flex: auto;
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

.common-layout {
  display: flex;
  flex-direction: column;
  flex: auto;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  padding: 0;
  margin: 0;

  // 需要加overflow: auto 自定义
  @include custom-scrollbar;
  .container {
    .header {
      flex: 0 1 0;
      width: 100%;
      padding: 0;
      margin: 0;
    }
    .main {
      flex: 1 1 auto;
      @include custom-scrollbar;
    }
    .footer {
      flex: 0 1 0;
      margin-bottom: 0.5em;
    }
  }
}
</style>
