// Practice 6: reduce that looks at neighbours (similar to sum_peaks)
//
// Write a function longestIncreasingRun(arr) that returns the length of the
// longest part of the array where each number is STRICTLY bigger than the one before it.
// The numbers must be next to each other (no skipping).
//
// Rule: solve it with a single reduce, no for / while loops.
// Hint: your accumulator doesn't have to be a number.

function longestIncreasingRun(arr) {
    return arr
        .reduce((acc, currentValue, currentIndex, array) => {
            if (currentValue > array[currentIndex - 1]){
                acc.current++;
            }else{
                acc.current = 1;
            }
            acc.longest = Math.max(acc.current, acc.longest);
            return acc;
        }, {current: 0, longest: 0}).longest
}

console.log(longestIncreasingRun([1, 2, 3, 1, 2, 3, 4, 0])) // expected: 4   (1, 2, 3, 4)
console.log(longestIncreasingRun([5, 4, 3]))                // expected: 1
console.log(longestIncreasingRun([3, 3, 3]))                // expected: 1   (equal is not bigger)
console.log(longestIncreasingRun([7]))                      // expected: 1
console.log(longestIncreasingRun([]))                       // expected: 0
