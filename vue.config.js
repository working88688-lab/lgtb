/*
 * @Author: lichunfeng
 * @Date: 2020-06-10 22:41:14
 * @LastEditors: wdz
 * @LastEditTime: 2025-12-19 14:52:33
 * @Description:
 */
const path = require("path");
function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	/**
	 * You will need to set publicPath if you plan to deploy your site under a sub path,
	 * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
	 * then publicPath should be set to "/bar/".
	 * In most cases please use '/' !!!
	 * Detail: https://cli.vuejs.org/config/#publicpath
	 */
	publicPath: "/",
	outputDir: "dist",
	assetsDir: "static",
	lintOnSave: process.env.NODE_ENV === "development",
	productionSourceMap: false,
	devServer: {
		port: 8089,
		open: true,
		overlay: {
			warnings: false,
			errors: true,
		},
		proxy: {
			"/web": {
				// target: `http://192.168.1.77:8130`, // 内网_测试服
				target: `https://tat_12_ES2MINIS.nxpryblagx.shop`, // 外网_测试服
				// target: `http://192.168.1.152:8909`, // 荆州
				changeOrigin: true,
				ws: false,
				pathRewrite: {
					"^/web": "/web",
				},
			},
		},
	},
	configureWebpack: {
		resolve: {
			alias: {
				"@": resolve("src"),
			},
		},
	},
};
