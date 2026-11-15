/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
var merge = function(arr1, arr2) {
    return [...arr1, ...arr2]
        .reduce((acc, currentValue,) => {
            let index = acc.findIndex(o => o.id === currentValue.id);
            if (index === -1){
                acc.push(currentValue)
            }else{
                acc[index] = {...acc[index], ...currentValue};
            }
            return acc;
        }, []).sort((a,b) => a.id - b.id);
};
const arr1 = [
    {"id": 1, "b": {"b": 94},"v": [4, 3], "y": 48}
];
const arr2 = [
    {"id": 1, "b": {"c": 84}, "v": [1, 3]}
];

console.log(merge(arr1, arr2));