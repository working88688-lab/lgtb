/*
 * @Author: lichunfeng
 * @Date: 2020-06-30 14:25:50
 * @LastEditors: wdz
 * @LastEditTime: 2025-09-04 16:49:52
 * @Description:
 */
import { getButtonStatus, getContactAndCustomer } from "../api/api";
import actions from "./actions";
export default {
	data() {
		return {
			initData: {
				show: false,
				sys: "ios",
				isWeixin: false,
				isPc: true,
				tfShow: false,
				appShow: false,
				clipShow: false,
				customerData: {},
			},
			sUserAgent: navigator.userAgent.toLowerCase(),
		};
	},
	created() {
		this.witchSys();
		this.is_weixin();
		// this.getStatus()
		this.getContactData();
		// 页面曝光埋点
		actions.methods.reportEvent(this.initData.sys);
	},
	mounted() {
		this.getRem();
		window.onresize = () => {
			this.getRem();
		};
	},
	methods: {
		getRem() {
			let html = document.getElementsByTagName("html")[0];
			let oWidth =
				document.body.clientWidth || document.documentElement.clientWidth;
			if (
				/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
					this.sUserAgent
				)
			) {
				this.initData.isPc = false;
				html.style.fontSize = oWidth / 10.8 + "px";
			} else {
				this.initData.isPc = true;
				html.style.fontSize = oWidth / 19.2 + "px";
			}
			this.initData.show = true;
		},
		witchSys() {
			if (/iphone|ipad|ipod/.test(this.sUserAgent)) {
				this.initData.sys = "ios";
			} else {
				this.initData.sys = "android";
			}
		},
		is_weixin() {
			if (this.sUserAgent.match(/MicroMessenger/i) == "micromessenger") {
				//  || this.sUserAgent.match(/QQ/i) == "qq"
				this.initData.isWeixin = true;
			} else {
				this.initData.isWeixin = false;
			}
		},
		getStatus() {
			getButtonStatus({ landPageId: "5ede0d319e8e1961b4314a05" }).then(
				(res) => {
					if (res.code == 200) {
						res.data.forEach((i) => {
							if (i.buttonType == 2 && i.isEnable) {
								this.initData.tfShow = true;
							} else if (i.buttonType == 1 && i.isEnable) {
								this.initData.appShow = true;
							} else if (i.buttonType == 3 && i.isEnable) {
								this.initData.clipShow = true;
							}
						});
					} else {
						this.$layer.msg("请求失败");
					}
				}
			);
		},
		getContactData() {
			getContactAndCustomer().then((res) => {
				this.initData.customerData = res.data;
			});
		},
	},
};
