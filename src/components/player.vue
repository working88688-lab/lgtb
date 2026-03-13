<template>
  <div class="player_box">
    <video
      id="myVideo"
      class="video-js vjs-default-skin vjs-big-play-centered"
      webkit-playsinline="true"
      playsinline="true"
    ></video>
    <slot />
  </div>
</template>
<script>
import videojs from "video.js"
import "video.js/dist/video-js.css"
import bg from "../assets/img/share/bg.jpg"
export default {
  name: "Player",
  props: {
    vid: {
      type: Number,
      default() {
        return undefined
      },
    },
    playing: {
      type: Boolean,
      default() {
        return false
      },
    },
    showControls: {
      type: Boolean,
      default() {
        return true
      },
    },
    autoplay: {
      type: Boolean,
      default() {
        return true
      },
    },
    loop: {
      type: Boolean,
      default() {
        return true
      },
    },
    fluid: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      player: null,
    }
  },
  computed: {
    vUri() {
      return this.vid
        ? `web/land/share/decode?vid=${this.vid}`
        : `web/land/share/decode`
    },
    option() {
      return {
        autoplay: this.autoplay,
        preload: "auto",
        controls: this.showControls,
        loop: this.loop,
        fluid: this.fluid,
        muted: "muted",
        poster: bg,
        sources: [
          {
            src: this.vUri,
            type: "application/x-mpegURL",
          },
        ],
        controlBar: {
          children: [
            "playToggle",
            "remainingTimeDisplay",
            "progressControl",
            "volumePanel",
          ],
        },
      }
    },
  },
  created() {},
  mounted() {
    this.initVideo()
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  watch: {
    playing(val) {
      if (val) {
        this.player.play()
      } else {
        this.player.pause()
      }
    },
  },
  methods: {
    initVideo() {
      this.player = videojs(`myVideo`, this.option)
      this.player.on("pause", () => {
        this.$emit("pause")
      })
      this.player.on("play", () => {
        this.$emit("play")
      })
      this.player.on("useractive", () => {
        if (this.player.poused) {
          this.player.play()
        } else {
          this.player.pause()
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.player_box {
  width: 100%;
  height: 100%;
  position: relative;
  .vMask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 99;
  }
}
</style>
<style lang="scss">
.video-js {
  width: 100%;
  height: 100%;
}
.video-js.vjs-playing .vjs-tech {
  pointer-events: auto !important;
}
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block;
}
.vjs-has-started .vjs-control-bar,
.vjs-audio-only-mode .vjs-control-bar {
  bottom: 0.95rem;
  background: rgba(255, 255, 255, 0.1);
}
</style>
