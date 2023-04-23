<template>
  <div
    class="ValidCode disabled-select"
    :style="`width:${width}; height:${height}; padding:0px 0px; font-size: ${fontSize}`"
    @click="refreshCode(), emitCode()"
  >
    <span
      v-for="(item, index) in codeList"
      :key="index"
      :style="getStyle(item)"
      >{{ item.code }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface CodeStyle {
  code: string;
  color: string;
  fontSize: string;
  padding: string;
  transform: string;
}

export default defineComponent({
  name: "VerificationCode",
  props: {
    width: {
      type: String,
      default: "60px",
    },
    height: {
      type: String,
      default: "34px",
    },
    length: {
      type: Number,
      default: 4,
    },
    fontSize: {
      type: String,
      default: "15px",
    },
  },
  data() {
    return {
      codeList: [] as CodeStyle[],
    };
  },
  mounted() {
    this.createCode();
  },
  methods: {
    createCode() {
      const len = this.length;
      const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789";
      const charsLen = chars.length;
      const codeList = [];
      // 生成
      for (let i = 0; i < len; i++) {
        const rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200),
        ];
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${
            Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)
          }deg)`,
        });
      }
      this.codeList = codeList;
    },
    refreshCode() {
      this.createCode();
    },
    getStyle(data: CodeStyle) {
      return `color : ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; tranform: ${data.transform}`;
    },
    emitCode() {
      this.$emit(
        "getVerificationCode",
        this.codeList.map((item) => item.code).join("")
      );
    },
  },
});
</script>

<style scoped lang="scss">
.ValidCode {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.ValidCode span {
  display: inline-block;
}
</style>
