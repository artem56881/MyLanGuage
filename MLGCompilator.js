const fs = require('fs');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function userInput() {
    return new Promise((resolve) => {
      rl.question(': ', (number) => {
        resolve(parseInt(number));
      });
    });
  }

let mem = new Array();

inText = fs.readFileSync(process.argv[2]); // при запуске в первом аргументе нужно указать путь к программе
inText = inText.toString();

mem = inText.split(/ |\r\n/);
let ip = 0;

async function main() {
    while (mem[ip] !== 'exit' && ip < mem.length) {
        switch (mem[ip]) {

            case 'input':
                    mem[mem[ip+1]] = await userInput();
                    ip += 2;
                break;

            case 'set':
                mem[mem[ip+1]] = parseInt(mem[ip+2]);
                ip += 3;
                break;

            case 'output':
                console.log(mem[mem[ip + 1]]);
                ip += 2;
                break;

            case 'add':
                mem[mem[ip+3]] = mem[mem[ip+1]] + mem[mem[ip+2]];
                ip += 4;
                break;

            case 'substract':
                mem[mem[ip+3]] = mem[mem[ip+1]] - mem[mem[ip+2]];
                ip += 4;
                break;

            case 'multiply':
                mem[mem[ip+3]] = mem[mem[ip+1]] * mem[mem[ip+2]];
                ip += 4;
                break;

            case 'jumpIfCompare':
                if(mem[mem[ip+1]] === mem[mem[ip+2]]) ip = parseInt(mem[ip + 3]);
                else ip += 4;
                break;
            
            case 'jumpIfGreater':
                if(mem[mem[ip+1]] >= mem[mem[ip+2]]) ip = parseInt(mem[ip + 3]);
                else ip += 4;
                break;

            case 'jump':
                ip = parseInt(mem[ip+1]);
                break;

            case 'exit':
                rl.close();
                return 0;
        }
    }
    
    rl.close();
    return 0;
}
main();