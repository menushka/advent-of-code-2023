const file = Bun.file('data.txt')
const data = await file.text()

let total_part_1 = 0

for (const line of data.split('\n')) {
  const digits = line.replace(/\D/g, '')
  const firstDigit = digits.at(0)
  const lastDigit = digits.at(-1)
  if (!firstDigit || !lastDigit) throw new Error(`Input missing number in line: ${line}`)
  const value = Number(firstDigit + lastDigit)
  total_part_1 += value
}

console.log(`Part 1: ${total_part_1}`)

let total_part_2 = 0

const getDigit = (text: string) => text
  .replace(/one/g, '1')
  .replace(/two/g, '2')
  .replace(/three/g, '3')
  .replace(/four/g, '4')
  .replace(/five/g, '5')
  .replace(/six/g, '6')
  .replace(/seven/g, '7')
  .replace(/eight/g, '8')
  .replace(/nine/g, '9')
  .replace(/\D/g, '')

for (const line of data.split('\n')) {
  let firstDigit, lastDigit;
  for (let i = 1; i < line.length + 1; i++) {
    if (!firstDigit) {
      firstDigit = getDigit(line.substring(0, i))
    }
    if (!lastDigit) {
      lastDigit = getDigit(line.slice(-i))
    }
    if (firstDigit && lastDigit) break
  }
  if (!firstDigit || !lastDigit) throw new Error(`Input missing number in line: ${line}`)
  const value = Number(firstDigit + lastDigit)
  total_part_2 += value
}

console.log(`Part 2: ${total_part_2}`)
