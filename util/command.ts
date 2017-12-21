import Triangle from './triangle';

if (process.argv.length < 3 || process.argv.length > 5) {
    throw new Error('Incorrect number of arguments. Command requires 3 arguments.');
}

let side1 = parseInt(process.argv[2], 10);
let side2 = parseInt(process.argv[3], 10);
let side3 = parseInt(process.argv[4], 10);

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
process.exit(0)