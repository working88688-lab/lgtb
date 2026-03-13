<template>
	<div class="pc">
		<header>
			<img src="../assets/pc/logo.png" alt="" class="logo" />
			<div class="groups">
				<img
					src="../assets/pc/tg.png"
					alt=""
					class="group"
					@click="addGroup(1)"
				/>
				<img src="../assets/pc/hz.png" class="group" @click="addGroup(2)" />
			</div>
		</header>
		<div class="acts">
			<img src="../assets/pc/text.png" alt="" class="text" />
			<div class="c">
				<qrcode-vue
					:key="pageIndex"
					:value="codeValue"
					class="code"
					:title="codeValue"
				/>
			</div>
		</div>
		<img src="../assets/pc/pic.png" alt="" class="pic" />
		<swiper ref="mySwiper" class="pcSwiper" :options="swiperOptions">
			<swiper-slide>
				<div class="page page1"></div>
			</swiper-slide>
			<swiper-slide>
				<div class="page page2"></div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import actions from "../utils/actions";

export default {
	name: "Mobile",
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
		let self = this;
		return {
			copyStr: "",
			codeValue: "",
			initPage: false,
			timer: null,
			showCode: false,
			vid: undefined,
			gifIndex: 0,
			frames,
			headerIndex: 0,
			footerIndex: 0,
			pageIndex: 0,
			bounceFlag: 0,
			scrollSpeed: 2,
			distance: 0,
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
				// autoHeight: true,horizontal,vertical
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
	},
	mounted() {
		this.initPage = true;
	},
	computed: {},
	methods: {
		downApp(e) {
			// PC端显示二维码，触发点击埋点
			this.reportEvent(this.initData.sys, e);
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
	},
};
</script>

<style lang="scss" scoped>
.pc {
	width: 100%;
	height: 100%;
	position: relative;
	header {
		width: 100%;
		padding: 0 calc(110vh / 10.8);
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		top: calc(46vh / 10.8);
		z-index: 99;
		.logo {
			width: calc(456vh / 10.8);
		}
		.groups {
			display: flex;
			align-items: center;
			.group {
				width: calc(65vh / 10.8);
				margin-left: calc(62vh / 10.8);
			}
		}
	}
	.acts {
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 10;
		position: absolute;
		bottom: 0;
		left: calc(78vw / 19.2);
		.text {
			width: calc(681vh / 10.8);
			margin-bottom: calc(70vh / 10.8);
		}
		.c {
			width: calc(703vh / 10.8);
			height: calc(348vh / 10.8);
			background: url("../assets/pc/cbg.png");
			background-size: 100% 100%;
			position: relative;
			.code {
				width: calc(250vh / 10.8);
				height: calc(250vh / 10.8);
				background: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				bottom: calc(28vh / 10.8);
				right: calc(61vh / 10.8);
				::v-deep canvas {
					width: calc(240vh / 10.8) !important;
					height: calc(240vh / 10.8) !important;
				}
			}
		}
	}
	.pic {
		width: calc(900vh / 10.8);
		position: absolute;
		bottom: calc(7vh / 10.8);
		right: calc(11vh / 10.8);
		z-index: 10;
	}
	.pcSwiper {
		.page {
			width: 100vw;
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			overflow: hidden;

			.container {
				margin-bottom: calc(80vh / 10.8);
				.text {
					width: calc(942vh / 10.8);
				}
				.codebox {
					display: flex;
					align-items: center;
					opacity: 0;
					.code {
						width: calc(225vh / 10.8);
						height: calc(225vh / 10.8);
						background: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
						::v-deep canvas {
							width: calc(222vh / 10.8) !important;
							height: calc(222vh / 10.8) !important;
						}
					}
					.tips {
						width: calc(504vh / 10.8);
						margin-left: calc(20vh / 10.8);
					}
				}
			}
			.pic {
				position: relative;
				width: calc(766vh / 10.8);
			}
			.pic.bottom {
				bottom: -43vh;
			}

			.pic.pic2 {
				width: calc(766vh / 15);
			}
		}
		.page1 {
			background: url("../assets/pc/bg1.jpg");
			background-size: 100% 100%;
		}
		.page2 {
			background: url("../assets/pc/bg2.jpg");
			background-size: 100% 100%;
		}
	}
}
</style>
