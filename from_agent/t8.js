// Practice 8 (stretch): deep merge (harder version of t5 merge)
//
// In t5, merging was SHALLOW: if both objects had a key b that was an object,
// the second one simply replaced the first.
//
// Write a function deepMerge(a, b) that returns a NEW object:
//   - keys only in a or only in b are copied over
//   - if a key is in both and BOTH values are plain objects (not arrays, not null),
//     merge those two objects the same way (deep)
//   - in every other case (numbers, strings, arrays, null, ...) the value from b wins
//
// a and b must not be changed.
// Hint: a function can call itself.
// Hint: typeof [] is "object" and typeof null is "object" too. Array.isArray helps.

function deepMerge(a, b) {
    const result = {...a};
    const keys = Object.keys(b);
    for (const key of keys) {
        if (isPlainObject(a[key]) && isPlainObject(b[key])){
            result[key] = deepMerge(a[key], b[key]);
        }else {
            result[key] = b[key];
        }
    }
    return result;

}

function isPlainObject(x) {
    return typeof x === "object" && x !== null && !Array.isArray(x);
}

const a = {id: 1, b: {b: 94, deep: {x: 1}}, v: [4, 3], y: 48}
const b = {id: 1, b: {c: 84, deep: {z: 2}}, v: [1, 3], n: null}

console.log(JSON.stringify(deepMerge(a, b)))
// expected: {"id":1,"b":{"b":94,"deep":{"x":1,"z":2},"c":84},"v":[1,3],"y":48,"n":null}
console.log(JSON.stringify(a))
// expected: {"id":1,"b":{"b":94,"deep":{"x":1}},"v":[4,3],"y":48}   (a is unchanged)
