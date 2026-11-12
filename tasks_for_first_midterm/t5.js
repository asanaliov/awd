/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var merge = function(arr1, arr2) {
    const merged = [...arr1, ...arr2].reduce(
        (acc, o) => {
            acc[o.id] = { ...acc[o.id], ...o};
            return acc;
        }, {}
    )
    return Object.values(merged).sort((a, b) => a.id - b.id);
};

const arr1 = [
    {"id": 1, "x": 1},
    {"id": 2, "x": 9}
];
const arr2 = [
    {"id": 3, "x": 5}
];
console.log(merge(arr1, arr2));
