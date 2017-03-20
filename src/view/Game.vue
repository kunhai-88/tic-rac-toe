<template>
  <div class="game">
    <chessboard v-on:onPlay="resetChessboard" v-bind:chessData="chessboard" :player="player" hint="正在下棋" />
    <chessboard class="manual" v-if="winMethod.length" v-bind:chessData="winMethod" :player="player" hint="可获胜方法"/>
  </div>
</template>

<script>
import Chessboard from '@/components/chessboard'
import { ai, manual, otherPlayer } from '@/view/ai'
export default {
  name: 'game',
  data () {
    return {
      player: 'o',
      chessboard: [
        ['e', 'e', 'e'],
        ['e', 'e', 'e'],
        ['e', 'e', 'e']
      ],
      winMethod: []
    }
  },
  components: {
    Chessboard
  },
  created () {
  },
  methods: {
    resetChessboard (row, column) {
      let { player, chessboard } = this
      chessboard[row][column] = player
      this.player = otherPlayer(player)
      this.chessboard = chessboard
      let suggestions = ai(this.player, this.chessboard)
      this.winMethod = manual(suggestions, this.player)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 .game{
  width: 185px;
  margin: 40px auto;
 }
.manual{
  margin-top: 40px;
}
</style>
