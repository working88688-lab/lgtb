<!--
 * @Author: lichunfeng
 * @Date: 2021-09-22 19:49:18
 * @LastEditors: lichunfeng
 * @LastEditTime: 2021-09-27 11:12:01
 * @Description: 
-->
<template>
	<div v-if="visiable">
		<div v-if="loading" class="downloadBar">
			<div class="schedule" :style="{ width: schedule }">{{ schedule }}</div>
		</div>
		<transition
			enter-active-class="animate__animated animate__fadeInUp"
			leave-active-class="animate__animated animate__fadeOutDown"
		>
			<div v-if="showMsg" class="msg">
				<span>app下载已准备就绪，是否继续？</span>
				<div class="action">
					<button @click="getApp(2, 'android')">确定</button>
					<button @click="$emit('success')">取消</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { getButtons, upDownLoad } from '../api/api'
export default {
	props: {
		visiable: {
			type: Boolean,
			default() {
				return false
			},
		},
	},
	data() {
		return {
			xhr: null,
			schedule: '0%',
			status: undefined,
			showMsg: true,
			loading: false,
		}
	},
	created() {},
	mounted() {
		// this.getApp(2, 'android')
	},
	methods: {
		getApp(type, sys) {
			this.showMsg = false
			this.loading = true
			let layer = this.$layer.loading({ content: '请等待' })
			this.upClick(type, sys)
			getButtons()
				.then((res) => {
					if (res.code == 200) {
						this.downLoad(res.data.androidAddress)
					} else {
						this.$layer.msg('请求失败')
					}
				})
				.finally(() => {
					this.$layer.close(layer)
				})
		},
		upClick(type, sys) {
			let params = JSON.parse(localStorage.getItem('copyStr'))
			params.terminal = sys
			params.landPageId = '5ede0d319e8e1961b4314a05'
			params.packageType = type
			upDownLoad(params).then((res) => {
				if (res.code == 200) {
					console.log(res)
				}
			})
		},
		downLoad(url) {
			try {
				this.xhr = new XMLHttpRequest()
				this.xhr.open('get', url)
				this.xhr.responseType = 'blob'
				this.xhr.onprogress = this.onprogress2
				this.xhr.onreadystatechange = () => {
					if (this.xhr.readyState == 4 && this.xhr.status == 200) {
						let arr = url.split('/')
						let fileName = arr[arr.length - 1]
						console.log(this.xhr.response)
						this.nativeDownload(URL.createObjectURL(this.xhr.response), fileName)
					}
				}
				this.xhr.send()
			} catch (error) {
				this.$layer.msg('下载失败')
			}
		},
		onprogress2(e) {
			this.schedule = parseInt((e.loaded / e.total) * 100) + '%'
			if (parseInt((e.loaded / e.total) * 100) == 100) {
				this.status = 'success'
				this.$emit('success')
			}
		},
		nativeDownload(url, title) {
			var dom = document.createElement('a')
			dom.download = title || 'download.apk'
			dom.href = url
			dom.click()
		},
	},
}
</script>

<style lang="scss" scoped>
.downloadBar {
	position: fixed;
	top: 0;
	z-index: 99999;
	width: 100%;
	height: 7px;
	opacity: 0.8;
	.schedule {
		height: 100%;
		background: green;
		text-align: right;
		color: yellow;
		font-size: 14px;
	}
}
.msg {
	position: fixed;
	bottom: 0;
	z-index: 99999;
	width: 100%;
	padding: 0.2rem;
	background: #fff;
	span {
		font-size: 14px;
	}
	.action {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		button {
			padding: 0.1rem 0.2rem;
			border-radius: 3px;
			background: #f5f5f5;
			font-size: 14px;
		}
		button:first-child {
			color: #fff;
			background: #1e90ff;
			margin-right: 10px;
		}
	}
}
</style>
