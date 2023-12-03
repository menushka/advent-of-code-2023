const file = Bun.file('data.txt')
const data = await file.text()

const Colors = {
  Red: 'red',
  Green: 'green',
  Blue: 'blue'
} as const
type Color = typeof Colors[keyof typeof Colors]

let total = 0

const games = []
for (const line of data.split('\n')) {
  const [gameString, roundsString] = line.split(':')
  const gameId = Number(gameString.replace(/\D/g, ''))
  const rounds = roundsString
    .split(';')
    .map(round => round
      .split(',')
      .map(count => count.trim().split(' '))
      .reduce((acc, cur) => ({ ...acc, [cur[1]]: Number(cur[0]) }), { [Colors.Red]: 0, [Colors.Green]: 0, [Colors.Blue]: 0 })
    )
  games.push({ gameId, rounds })
}

let total_part_1 = 0
for (const { gameId, rounds } of games) {
  const possible = rounds.reduce((acc, cur) => acc &&
    (cur[Colors.Red] <= 12 && cur[Colors.Green] <= 13 && cur[Colors.Blue] <= 14)
  , true)
  total_part_1 += possible ? gameId : 0
}

console.log(`Part 1: ${total_part_1}`);

let total_part_2 = 0
for (const { gameId, rounds } of games) {
  const minCubes = rounds.reduce((acc, cur) => ({
    [Colors.Red]: Math.max(acc[Colors.Red], cur[Colors.Red]),
    [Colors.Green]: Math.max(acc[Colors.Green], cur[Colors.Green]),
    [Colors.Blue]: Math.max(acc[Colors.Blue], cur[Colors.Blue]),
  }), {
    [Colors.Red]: 0,
    [Colors.Green]: 0,
    [Colors.Blue]: 0,
  })
  const power = minCubes[Colors.Red] * minCubes[Colors.Green] * minCubes[Colors.Blue]
  total_part_2 += power
}

console.log(`Part 2: ${total_part_2}`);

