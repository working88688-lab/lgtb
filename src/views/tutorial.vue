<!--
 * @Author: lichunfeng
 * @Date: 2022-01-26 20:34:27
 * @LastEditors: lichunfeng duuuuufu@gmail.com
 * @LastEditTime: 2024-06-04 20:41:09
 * @Description: 
-->
<template>
  <div class="tipList">
    <header>
      <img src="../assets/back.png" alt="" class="back" @click="back" />
      <h6>手机报毒禁止安装解决方法</h6>
    </header>
    <template v-if="initData.sys == 'android'">
      <div class="item" v-for="(item, i) in list" :key="i">
        <div class="bar">
          <img :src="item.icon" alt="" class="icon" />
          <span>{{ item.title }}</span>
          <button @click="active = active == i ? -1 : i">查看详情</button>
        </div>
        <div class="container" v-if="active == i">
          <img :src="item.imgs" alt="" class="stepImg" />
        </div>
      </div>
    </template>
    <template v-else>
      <img src="../assets/ic_ios.jpeg" alt="" class="ios" />
    </template>
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-if="showTips" class="tipsBox" @click="showTips = false">
        <div class="main">
          <p>本APP为成人内容可能会被手机限制安装.</p>
          <p>如不能安装，请根据说明书进行相关设置，以解除限制.</p>
          <p class="blue">
            声明：本APP有广告收益且已盈利，安装不会对您手机造成任何损害，请放心使用
          </p>
          <img
            src="../assets/know.png"
            alt=""
            class="know"
            @click="showTips = false"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import initPage from "../utils/initPage";
import icon0 from "../assets/tips/set10.png";
import icon1 from "../assets/tips/set1.png";
import icon3 from "../assets/tips/set3.png";
import hw_icon from "../assets/tips/hw_icon.png";
import icon4 from "../assets/tips/set4.png";
import hw_hm_icon from "../assets/tips/hw_hm_icon.png";
import icon5 from "../assets/tips/set5.png";
import mi_icon from "../assets/tips/mi_icon.png";
import icon6 from "../assets/tips/set6.png";
import oppo_icon from "../assets/tips/oppo_icon.png";
import icon7 from "../assets/tips/set7.png";
import vivo_icon from "../assets/tips/vivo_icon.png";
import icon8 from "../assets/tips/set8.png";
import meizu_icon from "../assets/tips/meizu_icon.png";
import icon9 from "../assets/tips/set9.png";

import t1 from "../assets/tips/t1.jpeg";
import t2 from "../assets/tips/t2.jpeg";
import t3 from "../assets/tips/t3.jpeg";
import t4 from "../assets/tips/t4.jpeg";
import t5 from "../assets/tips/t5.jpeg";
import t6 from "../assets/tips/t6.jpeg";
import t7 from "../assets/tips/t7.jpeg";
import t8 from "../assets/tips/t8.jpeg";
import t9 from "../assets/tips/t9.jpeg";

export default {
  name: "Tutorial",
  mixins: [initPage],
  data() {
    return {
      active: -1,
      showTips: true,
      list: [
        {
          icon: icon0,
          title: "允许未知来源APP安装设置",
          imgs: t1,
        },
        {
          icon: icon1,
          title: "禁止安装恶意软件设置",
          imgs: t2,
        },
        {
          icon: icon9,
          title: "腾讯手机管家安全设置",
          imgs: t9,
        },
        {
          icon: icon3,
          title: "华为手机安装APP和杀毒设置",
          ph: hw_icon,
          imgs: t3,
        },
        {
          icon: icon4,
          title: "鸿蒙纯净版安装APP和杀毒设置",
          ph: hw_hm_icon,
          imgs: t4,
        },
        {
          icon: icon5,
          title: "小米手机安装APP和杀毒设置",
          ph: mi_icon,
          imgs: t5,
        },
        {
          icon: icon6,
          title: "OPPO手机安装APP和杀毒设置",
          ph: oppo_icon,
          imgs: t6,
        },
        {
          icon: icon7,
          title: "vivo手机安装APP和杀毒设置",
          ph: vivo_icon,
          imgs: t7,
        },
        {
          icon: icon8,
          title: "魅族手机安装APP和杀毒设置",
          ph: meizu_icon,
          imgs: t8,
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    closeTutorial() {
      this.showTutorial = false;
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.tipList {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding-top: 2rem;
  header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 0.5rem 0;
    color: #000;
    position: fixed;
    top: 0;
    .back {
      width: 0.48rem;
      position: absolute;
      left: 0.33rem;
    }
  }
  .title {
    width: 7.2rem;
  }
  .ios {
    width: 100%;
  }
  .item {
    // width: 9.5rem;
    width: 100%;
    margin-top: 0.4rem;
    .bar {
      width: 100%;
      height: 1.5rem;
      padding: 0 0.4rem;
      border-radius: 0.85rem;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        width: 0.675rem;
        margin-right: 0.3rem;
      }
      span {
        font-size: 0.4rem;
        color: #333;
        flex: 1;
        text-align: left;
      }
      button {
        // width: 1.9rem;
        padding: 0 0.2rem;
        height: 0.75rem;
        border-radius: 0.38rem;
        background-color: #fff;
        border: 1px solid #ff8a00;
        color: #ff8a00;
        font-size: 0.36rem;
      }
    }
    .container {
      width: 100%;
      padding: 0 0.4rem;
      .stepImg {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
  .tipsBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .main {
      width: 7.96rem;
      height: 7.21rem;
      padding: 0.71rem 0.58rem;
      border-radius: 0.3rem;
      background-color: #fff;
      overflow: hidden;
      font-size: 0.4rem;
      font-weight: 500;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        margin-bottom: 0.23rem;
      }
      .blue {
        color: #0095f4;
      }
      .know {
        width: 5.05rem;
      }
    }
  }
}
</style>
