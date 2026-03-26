<template>
	<div class="mobile copy" :data-clipboard-text="copyStr" @click="downApp($event)">
		<div v-if="initData.isWeixin" class="weixinbg">
			<img :src="weixinbg" alt="" />
		</div>

		<!-- 移动端更简单：上方仅展示一张图，下方是 footer -->
		<img src="../assets/mobile/mobile.png" alt="" class="mobile-top-img" />
		<footer>
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
		return {
			weixinbg,
			copyStr: "",
		};
	},
	created() {
		this.copyStr = localStorage.getItem("copyStr");
		if (this.initData.sys == "android") {
			this.getChApkData();
		}
	},
	mounted() {
		const clipboard = new Clipboard(".copy");
		clipboard.on("success", () => {
			console.log("复制成功");
		});
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

	/* 上方图片 + 下方 footer 两段式布局 */
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.mobile-top-img {
		width: 100%;
		flex: 1 1 auto;
		min-height: 0;
		height: 100%;
		object-fit: fill;
		/* 与背景图铺满一致，避免裁切 */
		display: block;
	}

	footer {
		width: 100vw;
		position: relative;
		bottom: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #6d61cf;
		z-index: 100;
		flex-shrink: 0;
		padding: 12px 10px 10px;

		.btns {
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-bottom: calc(6/760 * 100vh);

			.btn {
				width: calc(110 / 360 * 100vw);
			}
		}

		.tips {
			width: calc(277 / 360 * 100vw);
		}
	}
}
</style>
