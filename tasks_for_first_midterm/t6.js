function sum_peaks(array) {
    return array.reduce((acc, current, index, arr) => {
        const isFirst = index === 0;
        const isLast = index === arr.length - 1;

        if (isFirst && current > arr[index + 1]) {
            return acc + current;
        }

        if (isLast && current > arr[index - 1]) {
            return acc + current;
        }

        if (current > arr[index - 1] && current > arr[index + 1]) {
            return acc + current;
        }

        return acc;
    }, 0);
}

let x = [1, 2, 1, 5, 3, 1, 4, 1, 0, 1, 1, 1, 0, 0, 0, 0];
console.log(sum_peaks(x))