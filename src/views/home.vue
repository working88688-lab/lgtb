<!--
 * @Author: lichunfeng
 * @Date: 2020-06-30 16:18:54
 * @LastEditors: lichunfeng
 * @LastEditTime: 2021-04-08 11:51:02
 * @Description: 
-->
<template>
  <div class="main">
    <pc v-if="initData.isPc" :initData="initData"></pc>
    <mobile v-else :initData="initData"></mobile>
  </div>
</template>

<script>
import initPage from "../utils/initPage"
import Pc from "../components/pc"
import Mobile from "../components/mobile"
export default {
  name: "Home",
  mixins: [initPage],
  components: { Pc, Mobile },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
