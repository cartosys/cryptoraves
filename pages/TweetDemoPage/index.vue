<template>
  <transition 
    name="fade" 
    mode="out-in">
    <div>
      <div id="drop">
        <DropToken/>
      </div>
      <div id="tag">
        <TagToken/>
      </div>
      <div id="reply">
        <ReplyToken/>
      </div>
     
    </div>
  </transition>
</template>

<script>
import DropToken from '../TweetDemoPage/DropToken'
import TagToken from '../TweetDemoPage/TagToken'
import ReplyToken from '../TweetDemoPage/ReplyToken'

export default {
  name: 'TweetDemoPage',
  components: {
    DropToken,
    TagToken,
    ReplyToken
  },
  mounted: function() {
    this.$nextTick(function() {
      if (this.$route.query.target == 'drop') {
        window.scrollTo(0, this.getOffsetLeft(document.getElementById('drop')))
      } else if (this.$route.query.target == 'tag') {
        window.scrollTo(
          0,
          this.getOffsetLeft(document.getElementById('tag')) + 200
        )
      } else if (this.$route.query.target == 'reply') {
        window.scrollTo(0, this.getOffsetLeft(document.getElementById('reply')))
      } else if (this.$route.query.target == 'recipro') {
        window.scrollTo(
          0,
          this.getOffsetLeft(document.getElementById('recipro')) + 200
        )
      } else window.scrollTo(0, 0)
    })
  },
  methods: {
    goHome() {
      window.open('/')
    },
    getOffsetLeft(elem) {
      var offsetLeft = 0
      do {
        if (!isNaN(elem.offsetTop)) {
          offsetLeft += elem.offsetTop
        }
      } while ((elem = elem.offsetParent))
      return offsetLeft
    }
  }
}
</script>
<style scoped>
#tag {
  background-color: rgb(246, 250, 251);
}
#recipro {
  background-color: rgb(246, 250, 251);
}
</style>
