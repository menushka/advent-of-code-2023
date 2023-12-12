const file = Bun.file('data.txt')
const data = await file.text()

const [times, distances] = data.split('\n')
  .map(line => line.trim().split(':')[1].trim().replace(/\s+/g, ' ').split(' ')
    .map(num => Number(num.trim()))
  )

const races = times.map((value, index) => [value, distances[index]])

let ways = []
for (const [time, distance] of races) {
  let amounts = []
  for (let hold = 1; hold < time - 1; hold++) {
    amounts.push(hold * (time - hold))
  }
  ways.push(amounts.filter(amount => amount > distance).length)
}

const waysMultiplied = ways.reduce((acc, cur) => acc * cur)

console.log(`Part 1: ${waysMultiplied}`)

const newTime = Number(times.map(String).join(''))
const newDistance = Number(distances.map(String).join(''))

let amounts = []
for (let hold = 1; hold < newTime - 1; hold++) {
  amounts.push(hold * (newTime - hold))
}

const numOfWays = amounts.filter(amount => amount > newDistance).length

console.log(`Part 2: ${numOfWays}`)
