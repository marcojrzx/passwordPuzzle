/*--- Day 2: Password Philosophy ---

Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.

The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.

Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.

To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.

For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc

Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

How many passwords are valid according to their policies?*/

let validos = [];

function showValidos() {
    console.log(">>>> The next passwords are valids: ");
    for (let index = 0; index < validos.length; index++) {
        const element = validos[index];
        console.log(element);
    }
    console.log("total valid password: "+validos.length);
}

function countPasswordChar(pass, character) {
    let repeat = 0;
    for (let index = 0; index < pass.length; index++) {
        const element = pass[index];
        if (character === element) {
            repeat = repeat + 1;
        }
    }
    return repeat;
}

function calculateValid(file) {
    let lines = file.split('\n');
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        let splitLine = line.split(': ');
        let policy = splitLine[0];
        let password = splitLine[1];
        if (password !== undefined) {
            let auxP = policy.split(' ')[0];
            let charFind = policy.split(' ')[1];
            let minusNumber = auxP.split('-')[0];
            let majorNumber = auxP.split('-')[1];
            let result = countPasswordChar(password, charFind);
            if (result >= minusNumber && result <= majorNumber) {
                validos.push(line);
            }
        }
    }
    showValidos();
}

function readFile() {
    if (process.argv.length < 3) {
        console.log('Usage: node ' + process.argv[1] + ' FILENAME');
        process.exit(1);
      }
      var fs = require('fs')
        , filename = process.argv[2];
      fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        calculateValid(data)
      });
}

readFile();