// Practice 2: function that returns a function (similar to getDoubleN)
//
// Write a function createSequence(start, step, limit) that returns a function.
// Each call of the returned function returns the next number in the sequence:
// the first call returns start, the next start + step, then start + 2*step, ...
// The returned function can produce at most `limit` numbers.
// After that, every call returns null.
//
// Two sequences created separately must not affect each other.

function createSequence(start, step, limit) {
    let count = 0;
    return function (){
        if (count >= limit) return null;
        const current = start;
        start = start + step;
        count++;
        return current;
    }
}

const seq = createSequence(10, -3, 3)
console.log(seq()) // expected: 10
console.log(seq()) // expected: 7
console.log(seq()) // expected: 4
console.log(seq()) // expected: null
console.log(seq()) // expected: null

const a = createSequence(1, 1, 5)
const b = createSequence(1, 1, 5)
a()
a()
console.log(a()) // expected: 3
console.log(b()) // expected: 1
