const file = Bun.file('data.txt')
const data = await file.text()

const lines = data.split('\n')

const numberLocations: { [key: string]: number } = {}

let total_part_1 = 0

for (let i = 0; i < lines.length; i++) {
  const previousLine = lines[i - 1]
  const line = lines[i]
  const nextLine = lines[i + 1]

  const regex = /\d+/g
  let result
  while (result = regex.exec(line)) {
    const { index, 0: text } = result
    const length = text.length

    for (let j = 0; j < length; j++) {
      numberLocations[`${i},${index + j}`] = Number(text)
    }

    const left = index === 0 || line.at(index - 1) === '.'
    const right = index + length === line.length || line.at(index + length) === '.'
    
    const topSegment = previousLine?.substring(Math.max(index - 1, 0), Math.min(index + length + 1, line.length))
    const bottomSegment = nextLine?.substring(Math.max(index - 1, 0), Math.min(index + length + 1, line.length))

    const top = topSegment === undefined || topSegment.replace(/\./g, '') === ''
    const bottom = bottomSegment === undefined || bottomSegment.replace(/\./g, '') === ''

    const hasNoSymbol = left && right && top && bottom

    total_part_1 += hasNoSymbol ? 0 : Number(text)
  }
}

console.log(`Part 1: ${total_part_1}`);

let total_part_2 = 0

for (let i = 0; i < lines.length; i++) {
  const previousLine = lines[i - 1]
  const line = lines[i]
  const nextLine = lines[i + 1]

  const regex = /\*/g
  let result
  while (result = regex.exec(line)) {
    const { index } = result

    const left = line[index - 1] !== '.' ? numberLocations[`${i},${index - 1}`] : undefined
    const right = line[index + 1] !== '.' ? numberLocations[`${i},${index + 1}`] : undefined

    const topSegment = previousLine?.substring(Math.max(index - 1, 0), Math.min(index + 2, line.length))
    const bottomSegment = nextLine?.substring(Math.max(index - 1, 0), Math.min(index + 2, line.length))

    const vertiical = []

    if (topSegment[0] !== '.' && topSegment[1] === '.' && topSegment[2] !== '.') {
      vertiical.push(numberLocations[`${i - 1},${index - 1}`])
      vertiical.push(numberLocations[`${i - 1},${index + 1}`])
    } else {
      const topIndex = topSegment.replace(/\d/g, 'A').indexOf('A')
      if (topIndex !== -1) {
        vertiical.push(numberLocations[`${i - 1},${index - 1 + topIndex}`])
      }
    }

    if (bottomSegment[0] !== '.' && bottomSegment[1] === '.' && bottomSegment[2] !== '.') {
      vertiical.push(numberLocations[`${i + 1},${index - 1}`])
      vertiical.push(numberLocations[`${i + 1},${index + 1}`])
    } else {
      const bottomIndex = bottomSegment.replace(/\d/g, 'A').indexOf('A')
      if (bottomIndex !== -1) {
        vertiical.push(numberLocations[`${i + 1},${index - 1 + bottomIndex}`])
      }
    }

    const numbers = [left, right, ...vertiical].filter(Boolean).map(Number)
    if (numbers.length > 1) {
      total_part_2 += numbers[0] * numbers[1]
    }
  }
}

console.log(`Part 2: ${total_part_2}`);
