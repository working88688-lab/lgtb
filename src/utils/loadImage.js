/*
 * @Author: yin_shi_1251
 * @FilePath: /zhiyin/src/workers/LoadImage.ts
 * @Date: 2021-12-16 12:07:43
 * @LastEditors: lichunfeng
 * @LastEditTime: 2023-01-06 10:58:41
 * @Description:
 */
import axios from "axios"

const ctx = self

const firstLength = 100
const KEY = str2bytes(`2020-zq3-888`)

function str2bytes(str) {
  const bytes = []
  const len = str.length
  for (let i = 0; i < len; i++) {
    const c = str.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0)
      bytes.push(((c >> 12) & 0x3f) | 0x80)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0)
      bytes.push((c & 0x3f) | 0x80)
    } else {
      bytes.push(c & 0xff)
    }
  }
  return bytes
}

function transformArrayBufferToBase64(bytes) {
  let binary = ""
  for (let len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return self.btoa(binary)
}

function load(linkImg) {
  return new Promise((resolve) => {
    axios.get(linkImg, { responseType: "blob" }).then((res) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(res.data)
      reader.onload = function (e) {
        const data = e.target.result
        const bytes = new Uint8Array(data)
        for (let i = 0; i < firstLength; i++) {
          bytes[i] ^= KEY[i % KEY.length]
        }
        const img = transformArrayBufferToBase64(bytes)
        resolve(`data:image/png;base64,${img}`)
      }
    })
  })
}

const onMessage = async ({ data }) => {
  const image = await load(data.src)

  postMessage(data.key, image)
}

const postMessage = (key, file) =>
  ctx.postMessage({
    key,
    file,
  })

ctx.addEventListener("message", onMessage)

export { load }
