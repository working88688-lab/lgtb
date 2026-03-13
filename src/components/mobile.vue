<template>
	<div class="mobile copy" :data-clipboard-text="copyStr" @click="downApp($event)">
		<div v-if="initData.isWeixin" class="weixinbg">
			<img :src="weixinbg" alt="" />
		</div>
		<header>
			<img src="../assets/mobile/logo.png" alt="" class="logo" />
			<div class="groups">
				<img
					src="../assets/mobile/tg.png"
					alt=""
					class="group"
					@click.stop="addGroup(1)"
				/>
				<img
					src="../assets/mobile/hz.png"
					alt=""
					class="group"
					@click.stop="addGroup(2)"
				/>
			</div>
		</header>
		<swiper ref="mySwiper" class="h5Swiper" :options="swiperOptions">
			<swiper-slide>
				<div class="page">
					<img src="../assets/mobile/p1.png" alt="" class="pic pic1" />
					<!-- <img src="../assets/mobile/ll.png" alt="" class="text" /> -->
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="page">
					<img src="../assets/mobile/p2.png" alt="" class="pic pic2" />
					<!-- <img src="../assets/mobile/ll.png" alt="" class="text" /> -->
				</div>
			</swiper-slide>
		</swiper>
		<!-- <img
      v-if="initData.sys == 'ios'"
      src="../assets/mobile/tips2.png"
      alt=""
      class="tips"
      @click.stop="toTutorial"
    />
    <img
      v-else
      src="../assets/mobile/tips1.png"
      alt=""
      class="tips"
      @click.stop="toTutorial"
    /> -->
		<footer>
			<img src="../assets/mobile/text.png" alt="" class="text" />
			<img src="../assets/mobile/pic.png" alt="" class="pic" />
			<div class="btns">
				<img src="../assets/mobile/ios.png" alt="" class="btn" />
				<img src="../assets/mobile/an1.png" alt="" class="btn" />
				<img src="../assets/mobile/an2.png" alt="" class="btn" />
			</div>
			<img src="../assets/mobile/tips.png" alt="" class="tips" />
		</footer>
	</div>
</template>

<script>
import Clipboard from "clipboard";
import actions from "../utils/actions";
// import { loadFrames } from "../utils/gif";
import { getChApk } from "../api/api";
import weixinbg from "../assets/weixinbg.png";

// const context = require.context("../assets/gif", false, /1_00\d+.png/);
// const frames = loadFrames(context);

export default {
	name: "Mobile",
	mixins: [actions],
	props: {
		initData: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		let self = this;
		return {
			weixinbg,
			copyStr: "",
			codeValue: "",
			initPage: false,
			timer: null,
			showDownload: false,
			maskShow: false,
			vid: undefined,
			gifIndex: 0,
			frames: [],
			headerIndex: 0,
			footerIndex: 0,
			bounceFlag: 0,
			swiperOptions: {
				speed: 1000,
				notNextTick: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				loop: true,
				loopAdditionalSlides: 3,
				direction: "horizontal",
				setWrapperSize: true,
				// autoHeight: true,horizontal
				slidesPerView: 1,
				mousewheel: true,
				mousewheelControl: true,
				resistanceRatio: 0,
				observeParents: true,
				on: {
					init: function () {
						self.pageIndex = this.activeIndex;
					},
					slideChangeTransitionStart: function () {
						self.pageIndex = this.activeIndex;
					},
				},
			},
		};
	},
	created() {
		this.codeValue = window.location.href;
		this.copyStr = localStorage.getItem("copyStr");
		const copyData = JSON.parse(this.copyStr);
		this.vid = Number(copyData.vid);
		if (this.initData.sys == "android") {
			this.getChApkData();
		}
	},
	mounted() {
		this.initPage = true;
		const clipboard = new Clipboard(".copy");
		clipboard.on("success", () => {
			console.log("复制成功");
		});
		// if (this.initData.sys == "android") {
		//   this.showDownload = true
		// }
		this.showGif();
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.$swiper;
		},
	},
	methods: {
		getChApkData() {
			let params = JSON.parse(localStorage.getItem("copyStr"));
			if (params.ch) {
				let layer = this.$layer.loading({ content: "请等待" });
				getChApk(params)
					.then((res) => {
						if (res.code == 200 && res.data?.chApkAddress) {
							this.upClick(2, "android");
							this.jump(res.data.chApkAddress);
						}
					})
					.finally(() => {
						this.$layer.close(layer);
					});
			}
		},
		downApp(e) {
			if (this.initData.sys == "ios") {
				this.downLoads(5, "ios");
			} else {
				this.downLoads(2, "android");
			}
			// 统一点击埋点上报
			this.reportEvent(this.initData.sys, e);
			// this.$router.push({ path: "/tutorial" })
			// setTimeout(() => {
			// }, 500)
		},
		showGif() {
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				if (this.gifIndex < this.frames.length - 1) {
					this.gifIndex++;
				} else {
					this.gifIndex = 0;
					// clearInterval(this.timer)
				}
			}, 33.33);
		},
		setHeader(i) {
			this.headerIndex = i;
			this.bounce();
		},
		setFooter(i) {
			this.footerIndex = i;
			this.bounce();
		},
		bounce() {
			if ("vibrate" in navigator) {
				navigator.vibrate(300);
			}
			this.bounceFlag = 1;
			setTimeout(() => {
				this.bounceFlag = 0;
			}, 600);
		},
		addGroup(type) {
			// type == 1
			//   ? this.jump("https://t.me/mmbushinese")
			//   : this.jump("https://t.me/kwai1tv");
			type == 1
				? this.jump(this.initData.customerData.link2)
				: this.jump(this.initData.customerData.link);
		},
		toTutorial() {
			this.$router.push({ path: "/tutorial" });
		},
	},
};
</script>

<style lang="scss" scoped>
.weixinbg {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 99999;
	img {
		width: 100%;
	}
}
.mobile {
	width: 100vw;
	height: 100vh;
	position: relative;
	background: url("../assets/mobile/bg.jpg");
	background-size: 100% 100%;
	header {
		width: 100%;
		padding: calc(14vw / 7.5) calc(16vw / 7.5);
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		top: 0;
		z-index: 100;
		.logo {
			width: calc(358vw / 7.5);
		}
		.groups {
			display: flex;
			align-items: center;
			.group {
				width: calc(65vw / 7.5);
				margin-left: calc(62vw / 7.5);
			}
		}
	}
	footer {
		width: 100vw;
		position: fixed;
		top: unset;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 100;
		.text {
			width: calc(579vw / 7.5);
		}
		.pic {
			width: calc(706vw / 7.5);
			margin-bottom: calc(32vw / 7.5);
		}
		.btns {
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-bottom: calc(32vw / 7.5);
			.btn {
				width: calc(215vw / 7.5);
			}
		}
		.tips {
			width: calc(469vw / 7.5);
			margin-bottom: calc(28vw / 7.5);
		}
	}
	.h5Swiper {
		width: 100vw;
		height: 100vh;
		.page {
			width: 100vw;
			height: 100vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			.pic {
				width: 100%;
			}
		}
	}
}
</style>
