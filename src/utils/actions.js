/*
 * @Author: lichunfeng
 * @Date: 2020-07-02 22:01:30
 * @LastEditors: lichunfeng duuuuufu@gmail.com
 * @LastEditTime: 2025-03-27 14:47:47
 * @Description:
 */
import { getButtons, upDownLoad, eventTrancking } from "../api/api";
import { appId, landPageId } from "../config";
export default {
  data() {
    return {
      hasDown: false,
    };
  },
  computed: {
    isIframe() {
      return window.top !== window.self;
    },
  },
  methods: {
    jump(href) {
      if (this.isIframe) {
        window.top.location = href;
      } else {
        window.location = href;
      }
    },
    downLoads(type, sys) {
      if (type == 3) {
        this.$router.push({ path: "/tutorial" });
        return;
      } else if (type == 0) {
        this.jump(
          "https://itunes.apple.com/cn/app/testflight/id899247664?mt=8"
        );
        return;
      } else if (type == 4) {
        this.$router.push({ path: "/clipDown" });
        return;
      } else if (type == 5 && sys == "ios") {
        let params = localStorage.getItem("paramStr");
        if (params) {
          this.jump(`/web/land/version/WebClip/download${params}`);
        } else {
          this.jump(`/web/land/version/WebClip/download`);
        }
        // setTimeout(() => {
        //   const match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
        //   if (match) {
        //     const major = parseInt(match[1], 10);
        //     if (major && major < 18) {
        //       this.jump("/jump.mobileprovision");
        //     } else {
        //       this.$layer.alert(
        //         "当前设备系统版本过高，请手动打开系统配置->通用->VPN与设备管理，手动安装描述文件"
        //       );
        //     }
        //   }
        // }, 3000);
        return;
      }
      let layer = this.$layer.loading({ content: "请等待" });
      getButtons()
        .then((res) => {
          if (res.code == 200) {
            this.upClick(type, sys);
            if (type == 1 && sys == "ios") {
              this.jump(res.data.testFlightAddress);
            } else if (type == 2 && sys == "ios") {
              // this.showJiaoCheng()
              this.jump(res.data.enterpriseAddress);
            } else {
              // this.showTutorialAn = true
              this.jump(res.data.androidAddress);
            }
          } else {
            this.$layer.msg("请求失败");
          }
        })
        .finally(() => {
          this.$layer.close(layer);
        });
    },
    upClick(type, sys) {
      if (!this.hasDown) {
        this.hasDown = true;
        let params = JSON.parse(localStorage.getItem("copyStr"));
        params.terminal = sys;
        params.landPageId = landPageId;
        params.packageType = type;
        upDownLoad(params).then((res) => {
          if (res.code == 200) {
            // eslint-disable-next-line no-console
            console.log("点击上报成功");
          }
        });
      }
    },
    // 数据中心埋点上报：页面曝光 / 按钮点击
    reportEvent(sys, e) {
      let copyStr = {};
      try {
        copyStr = JSON.parse(localStorage.getItem("copyStr")) || {};
      } catch (err) {
        copyStr = {};
      }

      // 基础公共参数
      let baseReq = {
        event: "landing_page_view",
        landing_page_id: landPageId,
        channel: copyStr.ch || "",
        event_id:
          (window.crypto && window.crypto.randomUUID
            ? window.crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`)?.replace(/-/g, "") || "",
        app_id: appId,
        uid: "",
        sid:
          sessionStorage.getItem("sid") ||
          (() => {
            const id =
              (window.crypto && window.crypto.randomUUID
                ? window.crypto.randomUUID()
                : `${Date.now()}-${Math.random()}`)?.replace(/-/g, "") || "";
            sessionStorage.setItem("sid", id);
            return id;
          })(),
        client_ts: Math.floor(Date.now() / 1000),
        device: sys, // ios / android
        device_id:
          localStorage.getItem("deviceId") ||
          (() => {
            const id =
              (window.crypto && window.crypto.randomUUID
                ? window.crypto.randomUUID()
                : `${Date.now()}-${Math.random()}`)?.replace(/-/g, "") || "";
            localStorage.setItem("deviceId", id);
            return id;
          })(),
        user_agent: navigator.userAgent,
        device_brand: "",
        device_model: "",
        trace_id: localStorage.getItem("deviceId") || "",
      };

      // 点击事件补充参数
      let params = {};
      if (e) {
        baseReq.event = "landing_page_click";
        const x_percent = Math.floor((e.clientX / window.screen.width) * 100);
        const y_percent = Math.floor((e.clientY / window.screen.height) * 100);
        params = {
          tab_key: "download",
          tab_name: "下载按钮",
          click_coordinates_x: e.clientX,
          click_coordinates_y: e.clientY,
          click_x_percent: x_percent,
          click_y_percent: y_percent,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
        };
      }

      const payload = { ...baseReq, ...params };
      // eslint-disable-next-line no-console
      console.log("埋点上报参数:", payload);
      eventTrancking(payload);
    },
  },
};
