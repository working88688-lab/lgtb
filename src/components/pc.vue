<template>
	<div class="pc">
		<!-- 用 img 定位背景图（不要 background），铺满舞台 -->
		<img src="../assets/pc/pc.png" class="pc-bg-img" alt="" />

		<!-- 右上角按钮：UI 1920x1080，按钮 384x138，上边 32px，右边距 60px，间距 16px -->
		<!-- 左按钮（商务）：btn-sw -->
		<img
			src="../assets/pc/btn-sw.png"
			class="pc-btn pc-btn-sw"
			alt=""
			@click="addGroup(2)"
		/>
		<!-- 右按钮（TG群）：btn-tg -->
		<img
			src="../assets/pc/btn-tg.png"
			class="pc-btn pc-btn-tg"
			alt=""
			@click="addGroup(1)"
		/>

		<!-- 左侧二维码卡片（右半部分展示 quark/tips 两张图） -->
		<div class="qrCard" @click="downApp($event)">
			<div class="qrWrap">
				<qrcode-vue
					:key="codeValue"
					:value="codeValue"
					class="code"
					:title="codeValue"
				/>
			</div>
			<div class="qrText">
				<img src="../assets/pc/quark.png" class="quark" alt="" />
				<img src="../assets/pc/tips.png" class="tipsImg" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import actions from "../utils/actions";

export default {
	name: "Pc",
	mixins: [actions],
	components: { QrcodeVue },
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
			codeValue: "",
		};
	},
	created() {
		this.codeValue = window.location.href;
	},
	methods: {
		downApp(e) {
			// PC端二维码区块点击埋点
			this.reportEvent(this.initData.sys, e);
		},
		addGroup(type) {
			type == 1
				? this.jump(this.initData.customerData.link2)
				: this.jump(this.initData.customerData.link);
		},
	},
};
</script>

<style lang="scss" scoped>
.pc {
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;

	.qrCard {
		position: absolute;
		left: calc(208 / 1920 * 100vw);
		top: calc(780 / 1080 * 100vh);
		bottom: auto;
		z-index: 20;
		width: calc(493 / 1920 * 100vw);
		height: calc(199 / 1080 * 100vh);
		background-color: #fff;
		border-radius: calc(12 / 1920 * 100vw);
		padding: calc(12 / 1920 * 100vw);
		box-sizing: border-box;

		display: flex;
		align-items: center;
		overflow: hidden;
		cursor: pointer;
		gap: calc(16 / 1920 * 100vw);

		.qrWrap { 
			width: calc(171 / 1920 * 100vw);
			height: calc(171 / 1080 * 100vh);
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 0 0 auto;

			.code {
				width: calc(171 / 1920 * 100vw);
				height: calc(171 / 1080 * 100vh);
				display: flex;
				justify-content: center;
				align-items: center;
			}

			::v-deep canvas {
				width: 100% !important;
				height: 100% !important;
			}
		}

		.qrText {
			flex: 1;
			width: auto;
			margin-left: 0;
			height: 100%;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start; /* 右侧两张图宽度不同，左对齐不拉伸 */
			overflow: hidden;

			img {
				height: auto;
				display: block;
				width: auto;
			}

			.quark {
				width: calc(196 / 1920 * 100vw);
			}

			.tipsImg {
				width: calc(283 / 1920 * 100vw);
				margin-top: calc(20 / 1080 * 100vh);
			}
		}
	}
}

.pc-bg-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	object-fit: fill;
	pointer-events: none;
	z-index: 0;
}

.pc-btn {
	position: absolute;
	top: calc(32 / 1080 * 100vh);
	// 按钮原始尺寸 384x138：只用 width 控制，height 自动保持比例
	width: calc(128 / 1920 * 100vw);
	height: auto;
	display: block;
	cursor: pointer;
	user-select: none;
	z-index: 99;
}

/* TG（右边按钮）：右边距 60px */
.pc-btn-tg {
	right: calc(60 / 1920 * 100vw);
}

/* 商务（左边按钮）：右边距 60 + 384 + 16 = 460px */
.pc-btn-sw {
	// 右边距：60 + 384 + 16 = 460
	right: calc(220 / 1920 * 100vw);
}
</style>
