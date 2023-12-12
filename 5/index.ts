const file = Bun.file('data.txt')
const data = await file.text()

const lines = data.split('\n\n').map(data =>
  data.split(':')[1].trim().split('\n')
    .map(numbers => numbers.split(' ').map(Number))
)

const [seedRows, ...mappingsRows] = lines

const seeds = seedRows.flat()
const mappings = mappingsRows

let currentSeeds = seeds.slice()
for (const mapping of mappings) {
  const newSeeds = []
  for (const seed of currentSeeds) {
    let notHandled = true
    for (const [dest, start, length] of mapping) {
      if (start <= seed && seed < start + length) {
        newSeeds.push(seed + dest - start)
        notHandled = false
      }
    }
    if (notHandled) {
      newSeeds.push(seed)
    }
  }
  currentSeeds = newSeeds.slice()
}

const lowestLocation = Math.min(...currentSeeds)

console.log(`Part 1: ${lowestLocation}`)

const seedRanges = new Array(seeds.length / 2).fill(0).map((_, index) => [seeds[index * 2], seeds[index * 2 + 1]])

let currentSeedRanges = seedRanges.slice()
for (const mapping of mappings) {
  const newSeedRanges = []
  for (const [seedStart, seedLength] of currentSeedRanges) {
    const seedEnd = seedStart + seedLength
    let notHandled = true
    for (const [dest, start, length] of mapping) {
      const end = start + length
      const rangeStart = Math.max(start, seedStart)
      const rangeEnd = Math.min(end, seedEnd)
      if (rangeStart < rangeEnd) {
        newSeedRanges.push([rangeStart + dest - start, rangeEnd - rangeStart])
        if (rangeStart > seedStart) {
          currentSeedRanges.push([seedStart, rangeStart - seedStart])
        }
        if (rangeEnd < seedEnd) {
          currentSeedRanges.push([rangeEnd, seedEnd - rangeEnd])
        }
        notHandled = false
      }
    }
    if (notHandled) {
      newSeedRanges.push([seedStart, seedLength])
    }
  }
  currentSeedRanges = newSeedRanges.slice()
}

const lowesetRange = Math.min(...currentSeedRanges.map(range => range[0]))
console.log(`Part 2: ${lowesetRange}`)
