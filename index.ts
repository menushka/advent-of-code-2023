
const args = process.argv.slice(2);

// Check if the argument is provided and is a number
if (args.length !== 1 || isNaN(Number(args[0]))) {
    console.error('Please provide a single numeric argument.');
    process.exit(1)
}

// Spawn a child process to run the index.js file
Bun.spawn(['bun', 'index.ts'], {
  cwd: `./${args[0]}`,
  stdin: 'inherit',
  stdout: 'inherit',
  stderr: 'inherit'
})
