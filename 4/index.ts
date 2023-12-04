const file = Bun.file('data.txt')
const data = await file.text()

const games: [Set<number>, Set<number>][] = []
for (const line of data.split('\n')) {
  const [_, card] = line.split(":").map(str => str.trim())
  const [winning, numbers] = card.split('|').map(str => new Set(str.trim().replace(/\s+/g, ',').split(',').map(Number)))
  games.push([winning, numbers])
}

const totals = []
for (const [winning, numbers] of games) {
  let count = 0
  for (let num of winning) { 
    if (numbers.has(num)) { 
      count += 1
    } 
  }
  totals.push(count)
}

let total_part_1 = 0

for (const total of totals) {
  total_part_1 += total === 0 
    ? 0
    : total === 1 
      ? 1
      : Math.pow(2, total - 1)
}

console.log(`Part 1: ${total_part_1}`)

const counts = new Array(totals.length).fill(1)
for (let i = 0; i < counts.length; i++) {
  for (let j = 0; j < totals[i]; j++) {
    if (i + j + 1 >= counts.length) continue
    counts[i + j + 1] += counts[i]
  }
}

const total_part_2 = counts.reduce((acc, cur) => acc + cur, 0)

console.log(`Part 2: ${total_part_2}`)
