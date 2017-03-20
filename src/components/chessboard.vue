<template>
  <div class="chess-wrap">
    <div class="title">
      <img class="chess" v-if="player==='x'" src="../assets/x.png">
      <img class="chess" v-if="player==='o'" src="../assets/o.png">
      {{hint}}
    </div>
    <div class="chessboard">
      <div class="row" v-for="(line ,row) in chessboard">
        <div class="item" v-for="(item, column) in line">
          <img class="chess" v-if="item==='x'" src="../assets/x.png">
          <img class="chess" v-if="item==='o'" src="../assets/o.png">
          <div class="empty" v-if="item!=='x'&&item!=='o'" @click="play(row, column)" ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chessboard',
  props: ['chessData', 'player', 'hint'],
  data () {
    return {
    }
  },
  computed: {
    chessboard: function () {
      return this.chessData
    }
  },
  created () {
  },
  methods: {
    play (row, column) {
      this.$emit('onPlay', row, column)
    }
  }
}
</script>

<style lang="less" scoped>
.chess-wrap{
  padding: 10px 20px 20px;
  width: 185px;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  border-radius: 4px;
}

.title{
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  margin: 0 0 14px 0;
  .chess{
    width: 16px;
    height: 16px;
    vertical-align: text-top;
  }
}
.chessboard{
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
.row{
  width: 145px;
  height: 49px;
  .item{
    display:  inline-block;
    width: 48px;
    line-height: 48px;
    height: 48px;
    border-left:1px solid #ddd;
    border-bottom:1px solid #ddd;
  }
  .chess{
    display: block;
    margin: 13px;
    width: 20px;
    height: 20px;
  }
  .empty{
    cursor: pointer;
    width: 46px;
    height: 46px;
  }
}
</style>
