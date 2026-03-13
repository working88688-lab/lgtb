/*
 * @Author: lichunfeng
 * @Date: 2020-06-30 15:39:52
 * @LastEditors: lichunfeng
 * @LastEditTime: 2023-01-07 14:37:10
 * @Description:
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import layer from "vue-layer"
import "vue-layer/lib/vue-layer.css"
import "animate.css"
import VueAwesomeSwiper from "vue-awesome-swiper"
import "swiper/css/swiper.css"

Vue.prototype.$layer = layer(Vue)
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
