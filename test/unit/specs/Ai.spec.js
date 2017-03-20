import * as AI from '@/view/ai'

describe('切换玩家', function () {
  it('玩家o切换为x', function () {
    expect(AI.otherPlayer('o')).to.be.equal('x')
  })
  it('玩家x切换为o', function () {
    expect(AI.otherPlayer('x')).to.be.equal('o')
  })
})

describe('棋盘数据处理', function () {
  let chessboard = [
    ['e', 'o', 'e'],
    ['e', 'x', 'e'],
    ['e', 'e', 'e']
  ]
  let oAnswer = [
    ['1', '1', '1'],
    ['1', '-1', '1'],
    ['1', '1', '1']
  ]
  let xAnswerO = [
    ['-1', '1', '-1'],
    ['-1', '-1', '-1'],
    ['-1', '-1', '-1']
  ]
  console.log(chessboard)
  it('玩家o', function () {
    expect(AI.helper('o', chessboard)).to.be.deep.equal(oAnswer)
  })
  it('玩家x', function () {
    expect(AI.helper('x', chessboard)).to.be.deep.equal(xAnswerO)
  })
})
