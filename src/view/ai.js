// 将棋盘数据转换为可用于计算的数据
export const helper = (player, chessboard) => {
  let res = {}
  let matrix = []
  let position = []
  for (let [r, row] of chessboard.entries()) {
    matrix[r] = []
    for (let [c, type] of row.entries()) {
      switch (type) {
        case 'o':
          matrix[r][c] = 1
          break
        case 'x':
          matrix[r][c] = -1
          break
        default:
          matrix[r][c] = player === 'o' ? 1 : -1
          position.push(r + '|' + c)
          break
      }
    }
  }
  res = { matrix, position }
  return res
}

// 计算获胜方法
export const ai = (player, chessboard) => {
  echo({player, chessboard})
  let feature = helper(player, chessboard)
  let { matrix, position } = feature
  let compute = curry(matrix, position, player)
  let methods = []
  if (compute(broadwise) && compute(vertical)) {
    methods = format(compute(diagonal))
  }
  echo({player, methods})
  return methods
}
// 计算过程调用
export const curry = (matrix, position, player) => {
  let res = []
  return (fn) => {
    let methods = fn(matrix, position, player)
    if (methods) {
      res = res.concat(methods)
      return res
    }
    return false
  }
}

// 打印json
export const echo = (log) => {
  if (typeof log === 'object') {
    console.log(JSON.stringify(log))
  } else {
    console.log(log)
  }
}

// 计算横向获胜
export const broadwise = (matrix, position, player) => {
  let res = []
  for (let [r, row] of matrix.entries()) {
    let count = 0
    let coordinate = []
    for (let [c, val] of row.entries()) {
      count += val
      if (position.includes(r + '|' + c)) {
        coordinate.push(r + '|' + c)
      }
    }
    if (referee(count, player)) {
      return false
    } else if (toWin(count, player)) {
      res = res.concat(coordinate)
    }
  }
  return res
}

// 计算竖向获胜
export const vertical = (matrix, position, player) => {
  let res = []
  for (let c = 0; c < matrix[0].length; c++) {
    let count = 0
    let coordinate = []
    for (let r = 0; r < matrix.length; r++) {
      count += matrix[r][c]
      if (position.includes(r + '|' + c)) {
        coordinate.push(r + '|' + c)
      }
    }
    if (referee(count, player)) {
      return false
    } else if (toWin(count, player)) {
      res = res.concat(coordinate)
    }
  }
  return res
}
// 计算对角线获胜
export const diagonal = (matrix, position, player) => {
  let res = []
  let count = 0
  let coordinate = []
  for (let c = 0; c < matrix[0].length; c++) {
    count += matrix[c][c]
    if (position.includes(c + '|' + c)) {
      coordinate.push(c + '|' + c)
    }
  }
  if (referee(count, player)) {
    return false
  } else if (toWin(count, player)) {
    res = res.concat(coordinate)
  }
  let r = matrix.length - 1
  count = 0
  for (let c = 0; c < matrix[0].length; c++) {
    count += matrix[c][r]
    if (position.includes(r + '|' + c)) {
      coordinate.push(r + '|' + c)
    }
    r--
  }
  if (referee(count, player)) {
    return false
  } else if (toWin(count, player)) {
    res = res.concat(coordinate)
  }
  return res
}

export const format = (win) => {
  if (!win || win.length < 1) {
    return []
  }
  let duplicate = new Set()
  let res = []
  for (let i in win) {
    duplicate.add(win[i])
  }
  for (let coordinate of duplicate) {
    res.push(coordinate.split('|'))
  }
  return res
}
// 生成获胜方式显示的棋谱
export const manual = (suggestions, player) => {
  let chessboard = [
    ['e', 'e', 'e'],
    ['e', 'e', 'e'],
    ['e', 'e', 'e']
  ]
  for (let i in suggestions) {
    let suggest = suggestions[i]
    chessboard[suggest[0]][suggest[1]] = player
  }
  return chessboard
}

// 判断另一位玩家是否已获胜
export const referee = (count, player) => {
  return count === -3 && player === 'o' || count === 3 && player === 'x'
}

// 判断某玩家是否可以获胜
export const toWin = (count, player) => {
  return count === 3 && player === 'o' || count === -3 && player === 'x'
}

// 获取另外一位玩家
export const otherPlayer = (player) => {
  return player === 'o' ? 'x' : 'o'
}
