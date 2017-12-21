console.log(path.resolve(__dirname, '../cli/command.js'))
import Triangle from './triangle';
const fs = require('fs');
const path = require('path');

const root = fs.realpathSync(process.cwd());
if (!fs.existsSync(path.resolve(root, '../cli/command.js'))) {
    console.log('Run "npm run compile-cli" and try this command again');
}

if (process.argv.length < 3 || process.argv.length > 5) {
    throw new Error('Incorrect number of arguments. Application requires 3 arguments.');
}

let side1, side2, side3;
try {
    side1 = parseInt(process.argv[2], 10);
    side2 = parseInt(process.argv[3], 10);
    side3 = parseInt(process.argv[4], 10);
} catch (err) {
    throw new Error('Arguments must be of type "number"');
}

if (typeof side1 !== 'number' && typeof side2 !== 'number' && typeof side3 !== 'number') {
        throw new Error('Arguments must be of type "number"');
}

let triangle;
try {
    triangle = new Triangle([
        {length: side1}, {length: side2}, {length: side3}
    ]);   
} catch (err) {
    console.log('Not a triangle');
    process.exit(0);
}

const t = triangle.getShapeType();

console.log(`${t.split(':')[1]}`);